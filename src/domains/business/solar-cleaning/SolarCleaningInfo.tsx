import { useNavigate } from 'react-router-dom';

import { Box, Button, Text } from '@chakra-ui/react';

const SOLAR_CLEANING_INFO_BG = "https://images.unsplash.com/photo-1662101525913-21d521ea4a11?q=80&w=1170&auto=format&fit=crop";

export default function SolarCleaningInfo() {
  const navigate = useNavigate();

  return (
    <Box
      as="section"
      position="relative"
      py={{ base: 16, md: 20 }}
      display="flex"
      alignItems="center"
      overflow="hidden"
      borderRadius={{ base: '0', lg: '2xl' }}
    >
      {/* background image */}
      <Box
        position="absolute"
        inset={0}
        backgroundImage={`url(${SOLAR_CLEANING_INFO_BG})`}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        borderRadius={{ base: '0', md: '2xl' }}
      />

      {/* backdrop */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={1}
        bg="linear-gradient(135deg, #0e2a0e 0%,rgba(26, 74, 26, 0.9) 60%,rgba(45, 106, 45, 0.6) 100%)"
        borderRadius={{ base: '0', md: '2xl' }}
      />

      <Box
        position="relative"
        zIndex={10}
        maxW="640px"
        margin="0 auto"
        px={{ base: 4 }}
        width="100%"
        mb={12}
      >
        <Box textAlign="center">
          <Text as="h2" mb={4} color="whiteAlpha.900" fontWeight="800" fontFamily="NanumSquareNeo" fontSize={{ base: '12px', sm: '16px' }}>
            고객님의 환경에 맞는 최적의 태양광 패널 청소 서비스를 제공합니다
          </Text>
          <Text as="h2" mb={8} color="white" fontWeight="700" fontSize={{ base: '32px', sm: '32px', md: '48px' }}>
            지금 바로 문의하세요
          </Text>

          <Button
            py={8}
            w="full"
            size="lg"
            color="white"
            fontSize="20px"
            bg="transparent"
            fontWeight="700"
            borderRadius="full"
            border="1px solid white"
            fontFamily="NanumSquareNeo"
            boxShadow="0 8px 28px rgba(42, 236, 132, 0.3)"
            letterSpacing="0.2em"
            _hover={{ transform: 'translateY(-2px)', bg: 'green.600', borderColor: 'green.500', boxShadow: '0 12px 32px rgba(42, 236, 132, 0.4)' }}
            transition="all 0.2s ease"
            onClick={() => {
              navigate('/support/inquiry');
            }}
          >
            문의하기
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
