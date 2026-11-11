import { useCallback, useRef } from 'react'

import supabase from '@/shared/config/supabase'

const BUCKET = 'hana_solution_images'

/**
 * useBucket
 *
 * Supabase Storage에 이미지를 업로드하고 images 테이블에 메타데이터를 저장합니다.
 *
 * 사용법:
 *   const { uploadImage } = useBucket({ path: 'uploads' })
 *   const url = await uploadImage(file)
 */
// 올릴 수 있는 이미지 형식과 저장할 확장자
const IMAGE_EXTENSIONS: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/avif': 'avif',
}
const MAX_IMAGE_BYTES = 20 * 1024 * 1024

export function useBucket({ path }: { path: string }) {
  // 현재 세션에서 업로드한 이미지 URL 목록 추적
  const uploadedUrls = useRef<string[]>([])

  /**
   * 이미지 파일을 업로드하고 공개 URL을 반환합니다.
   * @param {File} file
   * @returns {Promise<string>} 공개 URL
   */
  const uploadImage = useCallback(async (file: File) => {
    // 1. 고유 경로 생성: {path}/{timestamp}_{randomId}.{ext}
    // 확장자는 파일 이름이 아니라 실제 형식에서 정한다(svg·html 등 스크립트가 들어갈 수 있는 파일 차단)
    const ext = IMAGE_EXTENSIONS[file.type]
    if (!ext) throw new Error('이미지 파일(jpg · png · webp · gif · avif)만 올릴 수 있습니다.')
    if (file.size > MAX_IMAGE_BYTES) throw new Error('이미지는 20MB 이하만 올릴 수 있습니다.')
    const uniqueName = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${ext}`
    const storagePath = `${path}/${uniqueName}`

    // 2. Storage에 업로드
    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type,
      })

    if (uploadError) throw new Error(`Storage 업로드 실패: ${uploadError.message}`)

    // 3. 공개 URL 획득
    const { data: urlData } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(storagePath)

    const publicUrl = urlData.publicUrl

    // 4. images 테이블에 메타데이터 저장 (post_id는 나중에 연결)
    const { error: dbError } = await supabase.from('images').insert({
      url: publicUrl,
      path: storagePath,
      size: file.size,
      filename: uniqueName,
      mimetype: file.type,
      originalname: file.name,
    })

    if (dbError) {
      // DB 저장 실패 시 Storage에서도 제거 (정합성 유지)
      await supabase.storage.from(BUCKET).remove([storagePath])
      throw new Error(`DB 저장 실패: ${dbError.message}`)
    }

    // 5. 세션 내 업로드 목록에 추가
    uploadedUrls.current.push(publicUrl)

    return publicUrl
  }, [path])

  return {
    uploadImage,
    uploadedUrls: uploadedUrls.current,
  }
}
