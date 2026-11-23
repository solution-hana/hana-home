import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'

import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

import { CONTENT_ROUTES, SITEMAP_EXCLUDE, buildLastmod, fetchNotices } from './scripts/routes.mjs'

const HOSTNAME = 'https://www.solutionhana.co.kr'

const DISALLOWED_PATHS = ['/hana/back', '/support/notice/new', '/support/notice/edit', '/preparation']

// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  // 공지사항 상세는 DB에 있으므로 빌드 시점에만 조회한다
  const notices = command === 'build'
    ? await fetchNotices(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_PUBLISHABLE_KEY)
    : []
  const noticeRoutes = notices.map((notice) => notice.route)

  return {
    plugins: [
      sitemap({
        hostname: HOSTNAME,
        // '/'는 빌드 산출물에서 자동으로 수집된다
        dynamicRoutes: [...CONTENT_ROUTES.filter((route) => route !== '/'), ...noticeRoutes],
        // 구글 소유확인 파일이 확장자 없는 주소(404)로 들어가지 않게 뺀다
        exclude: SITEMAP_EXCLUDE,
        // 모든 주소에 빌드 시각이 찍히지 않도록 경로별 수정일을 준다
        lastmod: buildLastmod(notices),
        robots: [
          {
            userAgent: '*',
            allow: '/',
            disallow: DISALLOWED_PATHS,
          },
          // 네이버 크롤러를 명시적으로 허용한다
          {
            userAgent: 'Yeti',
            allow: '/',
            disallow: DISALLOWED_PATHS,
          },
        ],
      }),
      react(),
      ViteImageOptimizer({
        png: {
          // 품질 (0~100)
          quality: 80,
        },
        jpeg: {
          quality: 75,
        },
        jpg: {
          quality: 75,
        },
        webp: {
          lossless: true,
        },
        avif: {
          lossless: true,
        },
      }),
    ],
    base: '/',
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    preview: {
      port: 5000,
      host: true,
    },
    server: {
      port: 5000,
      host: true,
    },
  }
})
