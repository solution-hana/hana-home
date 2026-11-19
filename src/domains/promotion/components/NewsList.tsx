import { Link as RouterLink } from 'react-router-dom';
import { LucideChevronRight } from 'lucide-react';

import { Box, Flex, Heading, Link, Stack, Text } from '@chakra-ui/react';

import { NEWS } from '@/shared/config/news';
import { formatDateToKorean } from '@/shared/utils/date';

export default function NewsList() {
  return (
    <Flex
      width="100%"
      maxW="960px"
      direction="column"
      gap={{ base: 6, md: 8 }}
      px={{ base: 4, md: 12 }}
      py={{ base: 10, md: 16 }}
      mb={12}
    >
      <Box textAlign="center">
        <Heading
          as="h1"
          fontSize={{ base: '24px', md: '32px' }}
          fontWeight="800"
          color="gray.800"
          fontFamily="pretendard"
          letterSpacing="-0.02em"
          mb={2}
        >
          태양광 뉴스
        </Heading>
        <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.600" fontFamily="pretendard" wordBreak="keep-all">
          정부·공공기관 공식 발표를 근거로 태양광 정책과 지원사업 소식을 전합니다.
        </Text>
      </Box>

      {NEWS.length === 0 && (
        <Text textAlign="center" color="gray.500" fontFamily="pretendard" py={10}>
          등록된 기사가 없습니다.
        </Text>
      )}

      <Stack as="ul" gap={4} listStyleType="none" m={0} p={0}>
        {NEWS.map((article) => (
          <Box as="li" key={article.slug}>
            <Link
              asChild
              display="block"
              width="100%"
              p={{ base: 5, md: 8 }}
              borderWidth="1px"
              borderColor="gray.200"
              borderRadius="lg"
              bg="white"
              outline="none"
              textDecoration="none"
              transition="all 0.3s ease-in-out"
              _hover={{ borderColor: 'orange.500', shadow: 'md', textDecoration: 'none' }}
            >
              <RouterLink to={`/promotion/news/${article.slug}`}>
                <Flex alignItems="center" gap={4}>
                  <Box flex="1" minW={0}>
                    <Text fontSize="sm" fontWeight="bold" color="orange.600" fontFamily="pretendard" mb={1}>
                      {article.category}
                    </Text>
                    <Heading
                      as="h2"
                      fontSize={{ base: 'lg', md: 'xl' }}
                      fontWeight="bold"
                      color="gray.800"
                      fontFamily="pretendard"
                      lineHeight="1.5"
                      wordBreak="keep-all"
                      mb={2}
                    >
                      {article.title}
                    </Heading>
                    <Text
                      fontSize={{ base: 'md', md: 'lg' }}
                      color="gray.600"
                      fontFamily="pretendard"
                      lineHeight="1.7"
                      wordBreak="keep-all"
                      mb={3}
                    >
                      {article.summary}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      {formatDateToKorean(article.publishedAt)}
                    </Text>
                  </Box>
                  <Box color="orange.500" flexShrink={0}>
                    <LucideChevronRight size={24} />
                  </Box>
                </Flex>
              </RouterLink>
            </Link>
          </Box>
        ))}
      </Stack>
    </Flex>
  );
}
