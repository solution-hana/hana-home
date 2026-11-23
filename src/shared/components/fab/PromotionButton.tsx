import { LucidePlus } from 'lucide-react';

import { Flex, Image, Collapsible, Link, Box, Text } from '@chakra-ui/react';

import { COMPANY_PHONE_HREF, PROMOTION_NAV_LINKS } from '@/shared/config/constants';
import { trackNaverAdConversion } from '@/shared/utils/naverAd';

export function PromotionButton() {
  return (
    <Collapsible.Root>
      <Collapsible.Content overflow="visible">
        <Flex
          mb={2}
          gap={2}
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
        >
          <Box 
            py={2}
            mt={2}
            cursor="default"
            fontFamily="Pretendard"
            borderBottomWidth="1px"
            borderBottomColor="gray.300"
          >
            <Text
              fontSize="sm"
              color="gray.900"
              fontWeight="bold"
              textAlign="center"
            >
              견적문의
            </Text>
            <Text
              asChild
              display="block"
              fontSize="lg"
              fontWeight="bold"
              color="orange.600"
              textAlign="center"
            >
              <a href={COMPANY_PHONE_HREF} onClick={() => void trackNaverAdConversion('call')}>
                1577<br />1497
              </a>
            </Text>
          </Box>
          {PROMOTION_NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              outline="none"
              borderRadius="full"
              backgroundColor="transparent"
              transition="all 0.3s ease"
              _hover={{ transform: "scale(1.2)" }}
              onClick={() => window.open(link.url, '_blank', 'noopener,noreferrer')}
            >
              <Image src={link.image} alt={link.name} width={12} height={12} objectFit="contain" />
            </Link>
          ))}
        </Flex>
      </Collapsible.Content>
      {/* Collapse Trigger */}
      <Collapsible.Trigger 
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Collapsible.Indicator
          p={4}
          color="white"
          cursor="pointer"
          borderRadius="full"
          transition="all 0.3s ease"
          backgroundColor="orange.600"
          boxShadow="0 1px 8px -4px rgba(0,0,0,0.8)"
          _hover={{ transform: "scale(1.05)" }}
          _open={{ transform: "rotate(45deg)" }}
        >
          <LucidePlus width={20} height={20} strokeWidth={2.5} />
        </Collapsible.Indicator>
      </Collapsible.Trigger>
    </Collapsible.Root>
  );
}