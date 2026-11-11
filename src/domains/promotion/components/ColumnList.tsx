import { Link as RouterLink } from 'react-router-dom';
import { LucideChevronRight } from 'lucide-react';

import { Box, Flex, Heading, Link, Stack, Text } from '@chakra-ui/react';

import { COLUMNS } from '@/shared/config/columns';
import { formatDateToKorean } from '@/shared/utils/date';

export default function ColumnList() {
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
          태양광 정보
        </Heading>
        <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.600" fontFamily="pretendard">
          태양광 설치 전에 많이 묻는 질문을 쉽게 풀어 드립니다.
        </Text>
      </Box>

      <Stack as="ul" gap={4} listStyleType="none" m={0} p={0}>
        {COLUMNS.map((column) => (
          <Box as="li" key={column.slug}>
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
              <RouterLink to={`/promotion/column/${column.slug}`}>
                <Flex alignItems="center" gap={4}>
                  <Box flex="1" minW={0}>
                    <Text fontSize="sm" fontWeight="bold" color="orange.600" fontFamily="pretendard" mb={1}>
                      {column.category}
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
                      {column.title}
                    </Heading>
                    <Text
                      fontSize={{ base: 'md', md: 'lg' }}
                      color="gray.600"
                      fontFamily="pretendard"
                      lineHeight="1.7"
                      wordBreak="keep-all"
                      mb={3}
                    >
                      {column.summary}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      {formatDateToKorean(column.publishedAt)}
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
