import { LucideExternalLink, PencilIcon, Trash2Icon } from 'lucide-react';

import { Box, Heading, HStack, IconButton, Text } from '@chakra-ui/react';

import { openExternal, toCssUrl } from '@/shared/utils/url';
import { Portfolio } from '@/types/common';

interface PortfolioCardProps {
  portfolio: Portfolio;
  isDesktop: boolean;
  isEditable?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function PortfolioCard(props: PortfolioCardProps) {
  const { portfolio, isDesktop, isEditable = false, onEdit, onDelete } = props;

  return (
    <Box
      padding={8}
      gapY={4}
      gapX={12}
      key={portfolio.id}
      w="100%"
      display="flex"
      flexDirection={isDesktop ? 'row' : 'column'}
      justifyContent={isDesktop ? 'center' : 'flex-start'}
    >
      {/* 이미지 */}
      <Box
        my={0}
        shadow="xs"
        overflow="hidden"
        borderRadius="md"
        position="relative"
        w={{ base: '100%', md: '100%', lg: '50%', xl: '40%' }}
        h={{ base: '250px', sm: '300px' }}
      >
        <Box
          inset="0"
          bgSize="cover"
          bgPos="center"
          position="absolute"
          bgImage={toCssUrl(portfolio.image_url)}
        />
      </Box>

      {/* 스팩 정보 */}
      <Box
        mb={4}
        bg="transparent"
        display="flex"
        overflow=""
        flexDirection="column"
        justifyContent="center"
        fontFamily="pretendard"
        w={isDesktop ? '360px' : '100%'}
      >
        <Box
          divideY="1px"
          divideColor="gray.200"
          borderWidth="1px"
          borderTopColor="transparent"
          borderLeftColor="transparent"
          borderRightColor="transparent"
          borderBottomColor="gray.200"
        >
          <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="flex-start" gap={2}>
            <Heading
              ml={1}
              mb={4}
              w="100%"
              fontSize="lg"
              color="gray.900"
              fontWeight="700"
              textAlign="start"
              fontFamily="NanumSquareNeo"
            >
              {portfolio.title}
            </Heading>
            <HStack gap={1} flexShrink={0}>
              {portfolio.link_url && (
                <IconButton
                  size="sm"
                  color="blue.600"
                  bg="transparent"
                  border="none"
                  borderRadius="full"
                  aria-label="블로그 링크"
                  _hover={{
                    bg: 'gray.100',
                  }}
                  onClick={() => openExternal(portfolio.link_url)}
                >
                  <LucideExternalLink size={16} strokeWidth={2} />
                </IconButton>
              )}
              {isEditable && (
                <>
                  <IconButton
                    size="sm"
                    color="gray.600"
                    bg="transparent"
                    border="none"
                    borderRadius="full"
                    aria-label="수정"
                    _hover={{ bg: 'gray.100' }}
                    onClick={onEdit}
                  >
                    <PencilIcon size={16} strokeWidth={2} />
                  </IconButton>
                  <IconButton
                    size="sm"
                    color="red.500"
                    bg="transparent"
                    border="none"
                    borderRadius="full"
                    aria-label="삭제"
                    _hover={{ bg: 'red.50' }}
                    onClick={onDelete}
                  >
                    <Trash2Icon size={16} strokeWidth={2} />
                  </IconButton>
                </>
              )}
            </HStack>
          </Box>

          {/* 콘텐츠 */}
          <Box display="flex" flexDirection="row" gap={4}>
            <Text fontWeight="medium" fontSize="sm" color="gray.900" w="30%" py={4} bg="gray.100" textAlign="center">타입</Text>
            <Text py={4} fontSize="sm" color="gray.700">{portfolio.subtitle}</Text>
          </Box>
          <Box display="flex" flexDirection="row" gap={4}>
            <Text fontWeight="medium" fontSize="sm" color="gray.900" w="30%" py={4} bg="gray.100" textAlign="center">모듈</Text>
            <Text py={4} fontSize="sm" color="gray.700">{portfolio.module}</Text>
          </Box>
          <Box display="flex" flexDirection="row" gap={4}>
            <Text fontWeight="medium" fontSize="sm" color="gray.900" w="30%" py={4} bg="gray.100" textAlign="center">인버터</Text>
            <Text py={4} fontSize="sm" color="gray.700">{portfolio.inverter}</Text>
          </Box>
          <Box display="flex" flexDirection="row" gap={4}>
            <Text fontWeight="medium" fontSize="sm" color="gray.900" w="30%" py={4} bg="gray.100" textAlign="center">설비용량</Text>
            <Text py={4} fontSize="sm" color="gray.700">{portfolio.capacity}</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}