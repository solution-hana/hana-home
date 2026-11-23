import { Box, Button, Dialog, Table, Text } from '@chakra-ui/react';

import { PRIVACY_TABLE_ROWS } from '@/shared/config/constants';

interface SimplePrivacyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SimplePrivacyModal(props: SimplePrivacyModalProps) {
  const { open, onOpenChange } = props;

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => onOpenChange(e.open)}
      size="xl"
      placement="center"
    >
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content
          fontFamily="NanumSquareNeo"
          borderRadius="lg"
          maxH="90vh"
          overflow="hidden"
          display="flex"
          flexDirection="column"
        >
          <Dialog.Header
            py={4}
            px={6}
            display="flex"
            alignItems="center"
            borderColor="gray.200"
            justifyContent="center"
            borderBottomWidth="1px"
          >
            <Dialog.Title fontSize="xl" fontWeight="800" color="gray.800">
              개인정보 수집·이용 동의
            </Dialog.Title>
          </Dialog.Header>

          <Dialog.Body
            py={6}
            px={6}
            gap={6}
            display="flex"
            overflowY="auto"
            flexDirection="column"
          >
            <Box>
              <Text fontWeight="700" color="gray.800" mb={3} fontSize="md">
                개인정보 수집·이용 내역
              </Text>
              <Table.Root size="sm" borderWidth="1px" borderRadius="md" overflow="hidden">
                <Table.Header>
                  <Table.Row bg="gray.100">
                    <Table.ColumnHeader
                      px={4}
                      py={3}
                      width="30%"
                      fontWeight="600"
                      color="gray.800"
                      textAlign="center"
                      borderRightWidth="1px"
                      borderBottomWidth="1px"
                    >
                      항목
                    </Table.ColumnHeader>
                    <Table.ColumnHeader
                      px={4}
                      py={3}
                      width="55%"
                      fontWeight="600"
                      color="gray.800"
                      textAlign="center"
                      borderRightWidth="1px"
                      borderBottomWidth="1px"
                    >
                      수집·이용 목적
                    </Table.ColumnHeader>
                    <Table.ColumnHeader
                      px={4}
                      py={3}
                      width="15%"
                      color="gray.800"
                      fontWeight="600"
                      textAlign="center"
                      borderBottomWidth="1px"
                    >
                      보유기간
                    </Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {PRIVACY_TABLE_ROWS.map((row, i) => (
                    <Table.Row key={i}>
                      <Table.Cell px={4} py={3} fontSize="xs" color="gray.700" textAlign="center" borderRightWidth="1px">
                        {row.items}
                      </Table.Cell>
                      <Table.Cell px={4} py={3} fontSize="xs" color="gray.700" textAlign="center" borderRightWidth="1px">
                        {row.purpose}
                      </Table.Cell>
                      <Table.Cell px={4} py={3} fontSize="xs" color="gray.700" textAlign="center">
                        {row.period}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Box>

            <Box>
              <Text fontWeight="700" color="gray.800" mb={3} fontSize="md">
                개인정보 처리방침
              </Text>
              <Text fontSize="sm" color="gray.700" lineHeight="tall" whiteSpace="pre-wrap">
                ㈜하나솔루션은 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집시에 
                동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
              </Text>
            </Box>

            <Box>
              <Text fontWeight="700" color="gray.800" mb={3} fontSize="md">
                광고 성과 측정을 위한 방문 기록 수집 안내
              </Text>
              <Text fontSize="sm" color="gray.700" lineHeight="tall">
                본 홈페이지는 네이버 검색광고의 성과(광고를 통한 방문, 전화 문의 건수)를 확인하기 위해
                네이버㈜가 제공하는 전환 추적 스크립트를 사용합니다. 이 과정에서 방문 일시, 방문한 페이지 주소,
                브라우저 정보, 쿠키 등 방문 기록이 자동으로 생성되어 네이버㈜에 전송될 수 있습니다.
                ㈜하나솔루션은 이 스크립트로 이름·연락처 등 문의 내용을 전송하지 않습니다.
                수집을 원하지 않으시면 브라우저 설정에서 쿠키 저장을 거부할 수 있습니다.
              </Text>
            </Box>

            <Text fontSize="sm" color="gray.600" lineHeight="tall">
              귀하는 개인정보 수집·이용 및 처리방침에 대한 동의를 거부할 권리가 있습니다.
              단, 동의를 거부할 경우 문의 접수 및 서비스 이용이 제한될 수 있습니다.
            </Text>
          </Dialog.Body>

          <Box
            py={4}
            px={6}
            display="flex"
            alignItems="center"
            borderTopWidth="1px"
            borderColor="gray.200"
            justifyContent="center"
          >
            <Button
              px={8}
              py={4}
              colorPalette="orange"
              borderRadius="md"
              fontSize="md"
              fontWeight="600"
              letterSpacing="0.1em"
              onClick={() => onOpenChange(false)}
            >
              확인
            </Button>
          </Box>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
