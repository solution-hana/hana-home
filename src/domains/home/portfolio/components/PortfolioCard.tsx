import { Portfolio } from '@/types/common';
import { Box, Flex, Text } from '@chakra-ui/react';

import { toCssUrl } from '@/shared/utils/url';

interface PortfolioCardProps {
  item: Portfolio
}

export function PortfolioCard(props: PortfolioCardProps) {
  const { item } = props;
  return (
    <Box
      position="relative"
      overflow="hidden"
      w="100%"
      h={{ base: "260px", sm: "280px", md: "360px" }}
      borderRadius="2xl"
      my={2}
      shadow="md"
    >
      {/* Background Image */}
      <Box
        position="absolute"
        inset="0"
        bgImage={toCssUrl(item.image_url)}
        bgSize="cover"
        bgPos="center"
      />

      {/* Dark overlay gradient */}
      <Box
        position="absolute"
        inset="0"
        bg="linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.08) 100%)"
        transition="all 0.5s ease"
      />

      {/* Content */}
      <Flex
        position="absolute"
        inset="0"
        direction="column"
        justify="flex-end"
        p={{ base: '16px 18px', sm: '20px 22px', md: '32px 28px' }}
      >
        <Text
          fontSize={{ base: '18px', sm: '20px', md: '26px' }}
          fontWeight="600"
          color="white"
          lineHeight="1.2"
          mb={{ base: '6px', md: '10px' }}
          letterSpacing="-0.01em"
        >
          {item.title}
        </Text>

        <Text
          fontSize={{ base: '12px', sm: '14px', md: '16px' }}
          color="rgba(255,255,255,0.85)"
          lineHeight="1.6"
        >
          설비용량: {item.capacity}
        </Text>
      </Flex>
    </Box>
  );
}