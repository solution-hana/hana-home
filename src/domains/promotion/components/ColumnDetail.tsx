import { Navigate, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { Box, Button, Flex, Heading, Stack, Table, Text } from '@chakra-ui/react';

import type { ColumnBlock, ColumnInline } from '@/types/column';

import { findColumn } from '@/shared/config/columns';
import { formatDateToKorean } from '@/shared/utils/date';
import FooterSupport from '@/shared/components/footer/FooterSupport';

const BODY_FONT_SIZE = { base: '17px', md: '18px' };

interface ColumnDetailProps {
  slug: string;
}

export default function ColumnDetail(props: ColumnDetailProps) {
  const { slug } = props;
  const navigate = useNavigate();
  const column = findColumn(slug);

  if (!column) {
    return <Navigate to="/promotion/column" replace />;
  }

  return (
    <Flex
      as="article"
      width="100%"
      maxW="860px"
      direction="column"
      gap={{ base: 6, md: 8 }}
      px={{ base: 4, md: 12 }}
      py={{ base: 10, md: 16 }}
      mb={12}
      fontFamily="pretendard"
      color="gray.700"
    >
      <Box borderBottomWidth="2px" borderColor="gray.200" pb={4}>
        <Heading
          as="h1"
          fontSize={{ base: '22px', md: '30px' }}
          fontWeight="800"
          color="gray.800"
          lineHeight="1.45"
          letterSpacing="-0.02em"
          wordBreak="keep-all"
          mb={3}
        >
          {column.title}
        </Heading>
        <Text asChild fontSize="sm" color="gray.500">
          <time dateTime={column.publishedAt}>{formatDateToKorean(column.publishedAt)}</time>
        </Text>
      </Box>

      <Box
        p={{ base: 5, md: 6 }}
        bg="orange.50"
        borderLeftWidth="4px"
        borderColor="orange.500"
        borderRadius="md"
      >
        <Text fontSize={BODY_FONT_SIZE} fontWeight="bold" color="orange.600" mb={2}>
          짧은 답
        </Text>
        <Text fontSize={BODY_FONT_SIZE} lineHeight="1.8" wordBreak="keep-all">
          <InlineText parts={column.answer} />
        </Text>
      </Box>

      {column.blocks.map((block, index) => (
        <ColumnBlockView key={index} block={block} />
      ))}

      <Text
        fontSize={BODY_FONT_SIZE}
        lineHeight="1.8"
        fontWeight="medium"
        color="gray.800"
        borderTopWidth="1px"
        borderColor="gray.200"
        pt={6}
        wordBreak="keep-all"
      >
        {column.closing}
      </Text>

      <Flex gap={3} direction={{ base: 'column', sm: 'row' }} justifyContent="center">
        <Button
          size="lg"
          variant="outline"
          borderColor="gray.400"
          color="gray.700"
          fontSize="md"
          fontWeight="bold"
          gap={2}
          onClick={() => navigate('/promotion/column')}
        >
          <ArrowLeft size={18} />
          목록으로
        </Button>
        <Button
          size="lg"
          bg="#F97316"
          color="white"
          fontSize="md"
          fontWeight="bold"
          _hover={{ bg: 'orange.600' }}
          onClick={() => navigate('/support/inquiry')}
        >
          견적문의 바로가기
        </Button>
      </Flex>

      <Box width="100%" maxW="480px" mx="auto">
        <FooterSupport />
      </Box>
    </Flex>
  );
}

function InlineText(props: { parts: ColumnInline[] }) {
  const { parts } = props;

  return (
    <>
      {parts.map((part, index) =>
        typeof part === 'string'
          ? part
          : <Text as="strong" key={index} fontWeight="bold" color="gray.800">{part.strong}</Text>,
      )}
    </>
  );
}

function ColumnBlockView(props: { block: ColumnBlock }) {
  const { block } = props;

  switch (block.type) {
    case 'heading':
      return (
        <Heading
          as="h2"
          fontSize={{ base: '20px', md: '24px' }}
          fontWeight="bold"
          color="gray.800"
          lineHeight="1.5"
          wordBreak="keep-all"
          mt={2}
        >
          {block.text}
        </Heading>
      );

    case 'list':
      return (
        <Box
          as={block.ordered ? 'ol' : 'ul'}
          ps={6}
          listStyleType={block.ordered ? 'decimal' : 'disc'}
          fontSize={BODY_FONT_SIZE}
          lineHeight="1.8"
          wordBreak="keep-all"
        >
          {block.items.map((item, index) => (
            <Box as="li" key={index} mb={2}>
              <InlineText parts={item} />
            </Box>
          ))}
        </Box>
      );

    case 'table':
      return (
        <>
          {/* 넓은 화면: 표 */}
          <Table.Root hideBelow="md" size="lg" variant="outline" fontSize={BODY_FONT_SIZE}>
            <Table.Header>
              <Table.Row bg="gray.800">
                {block.headers.map((header) => (
                  <Table.ColumnHeader key={header} color="white" fontWeight="bold" fontSize={BODY_FONT_SIZE}>
                    {header}
                  </Table.ColumnHeader>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {block.rows.map((row) => (
                <Table.Row key={row[0]}>
                  {row.map((cell, index) => (
                    <Table.Cell key={index} fontWeight={index === 0 ? 'bold' : 'normal'} color="gray.700">
                      {cell}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>

          {/* 좁은 화면: 가로 스크롤 없이 항목별 카드로 쌓는다 */}
          <Stack hideFrom="md" gap={3}>
            {block.rows.map((row) => (
              <Box key={row[0]} borderWidth="1px" borderColor="gray.200" borderRadius="md" overflow="hidden">
                <Text bg="gray.800" color="white" fontWeight="bold" fontSize={BODY_FONT_SIZE} px={4} py={2}>
                  {row[0]}
                </Text>
                {row.slice(1).map((cell, index) => (
                  <Box key={index} px={4} py={3} borderTopWidth={index === 0 ? 0 : '1px'} borderColor="gray.100">
                    <Text fontSize="md" fontWeight="bold" color="orange.600">
                      {block.headers[index + 1]}
                    </Text>
                    <Text fontSize={BODY_FONT_SIZE} lineHeight="1.7" wordBreak="keep-all">
                      {cell}
                    </Text>
                  </Box>
                ))}
              </Box>
            ))}
          </Stack>
        </>
      );

    case 'note':
      return (
        <Text fontSize="md" color="gray.600" lineHeight="1.7" bg="gray.50" p={4} borderRadius="md" wordBreak="keep-all">
          ※ {block.text}
        </Text>
      );

    case 'faq':
      return (
        <Box>
          <Heading
            as="h2"
            fontSize={{ base: '20px', md: '24px' }}
            fontWeight="bold"
            color="gray.800"
            lineHeight="1.5"
            mt={2}
            mb={4}
          >
            자주 묻는 질문
          </Heading>
          <Stack gap={4}>
            {block.items.map((item) => (
              <Box key={item.question} borderWidth="1px" borderColor="gray.200" borderRadius="md" p={{ base: 4, md: 5 }}>
                <Text as="h3" fontSize={BODY_FONT_SIZE} fontWeight="bold" color="gray.800" lineHeight="1.7" wordBreak="keep-all" mb={2}>
                  Q. {item.question}
                </Text>
                <Text fontSize={BODY_FONT_SIZE} lineHeight="1.8" wordBreak="keep-all">
                  A. {item.answer}
                </Text>
              </Box>
            ))}
          </Stack>
        </Box>
      );
  }
}
