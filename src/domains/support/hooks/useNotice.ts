import { useNavigate } from 'react-router-dom';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { Post } from '@/types/common';

import { supabase } from '@/shared/config/supabase';
import {
  extractImageUrlsFromJson,
  linkImagesToPost,
} from '@/shared/components/editor/hooks/useImage';

// 공지사항 목록 조회
export const useNotice = () => {
  return useQuery({
    queryKey: ['notice'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('category', 'NOTICE')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }

      return data;
    },
  })
}

// 공지사항 상세 조회
export const useNoticeDetail = (id: string | undefined) => {
  return useQuery({
    queryKey: ['notice', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .eq('category', 'NOTICE')
        .single();

      if (error) {
        throw error;
      }

      return data;
    },
    enabled: !!id,
  });
}

// 공지사항 등록 및 수정
export const usePostNotice = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (post: Post) => {
      const accessToken = sessionStorage.getItem('access_token');
      const refreshToken = sessionStorage.getItem('refresh_token');

      if (!accessToken || !refreshToken) {
        throw new Error('로그인 후 이용해주세요.');
      }

      await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      const payload = {
        title: post.title,
        content: post.content,
        content_text: post.content_text,
        is_visible: post.is_visible,
        updated_at: new Date().toISOString(),
      };

      if (post.id) {
        // 수정
        const { data, error } = await supabase
          .from('posts')
          .update(payload)
          .eq('id', post.id)
          .select()
          .single();

        if (error) {
          console.error(error.message, error.details);
          throw error;
        }

        const imageUrls = extractImageUrlsFromJson(post.content);
        if (imageUrls.length > 0) {
          await linkImagesToPost(data.id, imageUrls);
        }
        return data;
      }

      // 신규 등록
      const { data, error } = await supabase
        .from('posts')
        .insert({
          category: 'NOTICE',
          ...payload,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        console.error(error.message, error.details);
        throw error;
      }

      const imageUrls = extractImageUrlsFromJson(post.content);
      if (imageUrls.length > 0) {
        await linkImagesToPost(data.id, imageUrls);
      }
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['notice'] });
      if (variables.id) {
        queryClient.invalidateQueries({ queryKey: ['notice', variables.id] });
      }
      alert(variables.id ? '공지사항이 수정되었습니다.' : '공지사항이 등록되었습니다.');
      navigate('/support/notice');
    },
    onError: (_, variables) => {
      alert(
        variables.id
          ? '공지사항 수정에 실패했습니다. 다시 시도해주세요.'
          : '공지사항 등록에 실패했습니다. 다시 시도해주세요.'
      );
    },
  });
};

// 공지사항 삭제
export const useDeleteNotice = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id)
        .eq('category', 'NOTICE')
        .select('id');

      if (error) {
        console.error(error.message, error.details);
        throw error;
      }

      // 조건에 맞는 행이 없으면 삭제된 것이 없음
      if (!data?.length) {
        throw new Error('삭제할 공지사항을 찾을 수 없습니다.');
      }

      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['notice'] });
      // 삭제된 상세는 refetch하지 않음 (이미 없어서 406 발생 방지)
      queryClient.removeQueries({ queryKey: ['notice', variables] });
      alert('공지사항이 삭제되었습니다.');
      navigate('/support/notice');
    },
    onError: () => {
      alert('공지사항 삭제에 실패했습니다. 다시 시도해주세요.');
    },
  });
}