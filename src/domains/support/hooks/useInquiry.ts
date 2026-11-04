import { useMutation } from '@tanstack/react-query';

import { Inquiry } from '@/types/common';

import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from '@/shared/config/constants';

const escapeHtml = (value: string) => {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const createInquiryFrom = (inquiry: Inquiry) => {
  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
            
            <!-- 헤더 -->
            <tr>
              <td style="background-color:rgb(207, 111, 0); padding: 32px 40px;">
                <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700; letter-spacing: -0.5px;">📋 견적 문의</h1>
                <p style="margin: 6px 0 0; color: #a0a0b8; font-size: 13px;">새로운 견적 문의가 접수되었습니다.</p>
              </td>
            </tr>

            <!-- 본문 -->
            <tr>
              <td style="padding: 36px 40px;">

                <!-- 정보 테이블 -->
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding-bottom: 6px;">
                      <p style="margin: 0; color: #888; font-size: 12px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;">고객 정보</p>
                    </td>
                  </tr>

                  <!-- 이름 -->
                  <tr>
                    <td style="padding: 14px 0; border-bottom: 1px solid #f0f0f0;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td width="100" style="color: #888; font-size: 13px;">이름</td>
                          <td style="color: #1a1a1a; font-size: 14px; font-weight: 600;">${escapeHtml(inquiry.name)}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- 연락처 -->
                  <tr>
                    <td style="padding: 14px 0; border-bottom: 1px solid #f0f0f0;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td width="100" style="color: #888; font-size: 13px;">연락처</td>
                          <td style="color: #1a1a1a; font-size: 14px; font-weight: 600;">${escapeHtml(inquiry.phone)}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- 주소 -->
                  <tr>
                    <td style="padding: 14px 0; border-bottom: 1px solid #f0f0f0;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td width="100" style="color: #888; font-size: 13px;">주소</td>
                          <td style="color: #1a1a1a; font-size: 14px; font-weight: 600;">${escapeHtml(inquiry.address)}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <!-- 문의 내용 -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 28px;">
                  <tr>
                    <td style="padding-bottom: 10px;">
                      <p style="margin: 0; color: #888; font-size: 12px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;">문의 내용</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="background-color: #f8f9fa; border-left: 3px solid #1a1a2e; padding: 16px 20px;">
                      <p style="margin: 0; color: #333; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${!inquiry.content ? '별도의 문의 내용 ✖️' : escapeHtml(inquiry.content)}</p>
                    </td>
                  </tr>
                </table>

              </td>
            </tr>

            <!-- 푸터 -->
            <tr>
              <td style="background-color: #f8f9fa; padding: 20px 40px; border-top: 1px solid #eee;">
                <p style="margin: 0; color: #aaa; font-size: 12px; text-align: center;">
                  본 메일은 자동 발송된 메일입니다.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  `;
}

export const sendInquiry = () => {
  return useMutation({
    mutationFn: async (inquiry: Inquiry): Promise<any> => {
      const html = createInquiryFrom(inquiry);
      const response = await fetch(`${SUPABASE_URL}/functions/v1/send-mail/resend`, {
        method: 'POST',
        body: JSON.stringify({
          // 이메일 제목
          subject: '새로운 견적 문의가 접수되었습니다.',
          // 이메일 내용
          html,
        }),
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_PUBLISHABLE_KEY,
        },
      });
      return response.json();
    }
  });
}
