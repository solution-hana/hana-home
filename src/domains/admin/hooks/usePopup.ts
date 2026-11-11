import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { Popup, PopupInput } from '@/types/common';
import { supabase } from '@/shared/config/supabase';
import { ACTIVE_POPUP_QUERY_KEY } from '@/shared/hooks/usePopup';

export const POPUP_QUERY_KEY = ['popups'] as const;

// 관리자 권한 확인
async function ensureAdminSession() {
  const accessToken = sessionStorage.getItem('access_token');
  const refreshToken = sessionStorage.getItem('refresh_token');

  if (!accessToken || !refreshToken) {
    throw new Error('로그인 후 이용해주세요.');
  }

  const { data, error } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  if (error || !data.session) {
    throw new Error('로그인 후 이용해주세요.');
  }

  return data.session;
}

/** 만료일 계산 (등록 시점 기준 N일 후) */
export function getExpiresAtFromDays(days: number | null): string | null {
  if (days == null) return null;
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

/** 직접 선택한 날짜(YYYY-MM-DD)를 만료일(해당일 종료)로 변환 */
export function getExpiresAtFromDate(dateStr: string | null): string | null {
  if (!dateStr) return null;
  const date = new Date(`${dateStr}T23:59:59`);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
}

// 팝업창 목록 조회 - 관리자
export const usePopups = () => {
  return useQuery({
    queryKey: POPUP_QUERY_KEY,
    queryFn: async () => {
      await ensureAdminSession();

      const { data, error } = await supabase
        .from('popups')
        .select('*')
        .order('priority', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return (data ?? []) as Popup[];
    },
  });
};

// 팝업창 등록 - 관리자
export const useCreatePopup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: PopupInput) => {
      const session = await ensureAdminSession();


      const { data, error } = await supabase
        .from('popups')
        .insert({
          title: input.title,
          content: input.content ?? null,
          link_url: input.link_url ?? null,
          image_url: input.image_url ?? null,
          is_active: input.is_active ?? true,
          expires_at: input.expires_at ?? null,
          user_id: session.user.id,
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data as Popup;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POPUP_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ACTIVE_POPUP_QUERY_KEY });
      alert('팝업이 등록되었습니다.');
    },
    onError: (error: Error) => {
      console.error(error);
      alert('팝업 등록에 실패했습니다. 다시 시도해주세요.');
    },
  });
};

// 팝업창 수정 - 관리자
export const useUpdatePopup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...input }: PopupInput & { id: string }) => {
      await ensureAdminSession();

      const { data, error } = await supabase
        .from('popups')
        .update({
          title: input.title,
          content: input.content ?? null,
          link_url: input.link_url ?? null,
          image_url: input.image_url ?? null,
          is_active: input.is_active ?? true,
          expires_at: input.expires_at ?? null,
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data as Popup;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POPUP_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ACTIVE_POPUP_QUERY_KEY });
      alert('팝업이 수정되었습니다.');
    },
    onError: () => {
      alert('팝업 수정에 실패했습니다. 다시 시도해주세요.');
    },
  });
};

// 팝업창 삭제 - 관리자
export const useDeletePopup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await ensureAdminSession();

      const { data, error } = await supabase
        .from('popups')
        .delete()
        .eq('id', id)
        .select('id');

      if (error) {
        throw error;
      }

      if (!data?.length) {
        throw new Error('삭제할 팝업을 찾을 수 없습니다.');
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POPUP_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ACTIVE_POPUP_QUERY_KEY });
      alert('팝업이 삭제되었습니다.');
    },
    onError: () => {
      alert('팝업 삭제에 실패했습니다. 다시 시도해주세요.');
    },
  });
};

// 팝업창 활성화/비활성화 - 관리자
export const useTogglePopupActive = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      await ensureAdminSession();

      const { data, error } = await supabase
        .from('popups')
        .update({ is_active })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data as Popup;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POPUP_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ACTIVE_POPUP_QUERY_KEY });
    },
    onError: () => {
      alert('활성화 상태 변경에 실패했습니다. 다시 시도해주세요.');
    },
  });
};
