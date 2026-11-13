import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { FileExclamationPoint, LucideChevronRight } from 'lucide-react';

import {Flex, Box, Text, Heading, Button, Link} from '@chakra-ui/react';

import { COLUMNS } from '@/shared/config/columns';

import { formatDateToKorean } from '@/shared/utils/date';
import { Impactor } from '@/shared/components/common/Impactor';

import { useNotice } from '@/domains/support/hooks/useNotice';

import type { Post } from '@/types/common';

export default function NoticeContents() {
  const { data: notices } = useNotice();
  
  const navigate = useNavigate();

  const handleWriteNotice = () => {
    navigate('/support/notice/new');
  }

  return (
    <Flex
      mb={24}
      mt={12}
      gap={8}
      p={{ base: 0, md: 12 }}
      width="100%"
      height="auto"
      maxW="1280px"
      direction="column"
      position="relative"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap={4}
        mb={4}
      >
        <Heading
          fontWeight="bold"
          color="gray.800"
          letterSpacing="0.02em"
          ms={{ base: 4, md: 0 }}
          fontSize={{ base: '28px', sm: '32px', md: '36px', lg: '48px' }}
        >
          공지사항
        </Heading>
        {sessionStorage.getItem('access_token') && (
          <Button
            px={6}
            py={2}
            size="sm"
            fontSize="sm"
            fontWeight="600"
            borderRadius="none"
            letterSpacing="0.05em"
            fontFamily="pretendard"
            backgroundColor="orange.500"
            color="white"
            _hover={{
              backgroundColor: "orange.600",
            }}
            onClick={handleWriteNotice}
          > 
            새 공지 작성
          </Button>
        )}
      </Box>

      {/* 공지에서 태양광 정보(칼럼)로 가는 안내 줄. 스크롤 효과 밖에 두어 바로 보이게 한다 */}
      <Link
        asChild
        display="block"
        mx={{ base: 4, md: 0 }}
        px={{ base: 4, md: 6 }}
        py={4}
        borderWidth="1px"
        borderColor="orange.200"
        borderRadius="lg"
        bg="orange.50"
        outline="none"
        textDecoration="none"
        fontFamily="pretendard"
        transition="all 0.3s ease-in-out"
        _hover={{ borderColor: 'orange.500', textDecoration: 'none' }}
      >
        <RouterLink to="/promotion/column">
          <Flex alignItems="center" gap={3}>
            <Box flex="1" minW={0}>
              <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight="bold" color="gray.800" wordBreak="keep-all">
                태양광 정보 {COLUMNS.length}편 보기
              </Text>
              <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.600" wordBreak="keep-all">
                태양광 설치 전에 많이 묻는 질문을 쉽게 풀어 드립니다.
              </Text>
            </Box>
            <Box color="orange.500" flexShrink={0}>
              <LucideChevronRight size={24} />
            </Box>
          </Flex>
        </RouterLink>
      </Link>

      <Impactor direction="bottom" once>
        <Box
          overflowX="auto"
          fontFamily="NanumSquareNeo"
        >
          <Box>
            {notices?.length === 0 ? (
              <Box
                gap={12}
                minH="40vh"
                display="flex"
                color="gray.500"
                alignItems="center"
                flexDirection="column"
                justifyContent="center"
              >
                <FileExclamationPoint
                  size={64}
                  strokeWidth={1.5}
                />
                <Text fontSize="xl" fontWeight="bold">등록된 공지사항이 없습니다.</Text>
              </Box>
            ) : (
              <Box
                borderTopWidth="2px"
                borderColor="gray.500"
              >
                {notices?.map((notice: Post) => (
                  <Box
                    key={notice.id}
                    px={6}
                    py={6}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    borderBottomWidth="1px"
                    borderColor="gray.200"
                    cursor="pointer"
                    _hover={{ backgroundColor: 'gray.100' }}
                    onClick={() => navigate(`/support/notice/${notice.id}`)}
                  >
                    <Text fontSize="lg" fontWeight="bold">{notice.title}</Text>
                    <Text fontSize="sm" color="gray.500">{formatDateToKorean(notice.created_at)}</Text>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Impactor>
    </Flex>
  );
}