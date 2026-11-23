import { Box, Flex, Stack, Text, Image } from '@chakra-ui/react';

import { COMPANY_NAME, COMPANY_BUSINESS_NUMBER, COMPANY_REPRESENTATIVE, COMPANY_ADDRESS, COMPANY_ELECTRIC_BUSINESS_NUMBER, COMPANY_FAX_NUMBER, COMPANY_EMAIL, COMPANY_PHONE_NUMBER, COMPANY_PHONE_HREF } from '@/shared/config/constants';
import { trackNaverAdConversion } from '@/shared/utils/naverAd';

import logo from '@/assets/logo.svg';

export default function FooterCompany() {
  return (
    <Stack width='100%' gap='20px' align={{ base: 'center', md: 'stretch' }} mx='auto'>
      {/* logo */}
      <Flex align='center' justify={{ base: 'center', md: 'flex-start' }} gap={2}>
        <Image src={logo} alt='logo' width={8} height={8} objectFit='contain' />
        <Text
          fontSize='lg'
          color='gray.300'
          fontWeight='semibold'
        >
          {COMPANY_NAME}
        </Text>
      </Flex>
      {/* introduction */}
      <Box
        gap={2}
        flex={1}
        display='flex'
        flexDirection='column'
        fontFamily='Pretendard'
        textAlign={{ base: 'center', md: 'left' }}
        alignItems={{ base: 'center', md: 'flex-start' }}
      >
        <Text as='span' color='gray.400' fontSize='sm'>대표이사: {COMPANY_REPRESENTATIVE}</Text>
        <Text as='span' color='gray.400' fontSize='sm'>사업자등록번호: {COMPANY_BUSINESS_NUMBER}</Text> 
        <Text as='span' color='gray.400' fontSize='sm'>전기공사업번호: {COMPANY_ELECTRIC_BUSINESS_NUMBER}</Text> 
        <Text as='span' color='gray.400' fontSize='sm'>주소: {COMPANY_ADDRESS}</Text>
        <Text as='span' color='gray.400' fontSize='sm'>TEL: <a href={COMPANY_PHONE_HREF} onClick={() => void trackNaverAdConversion('call')}>{COMPANY_PHONE_NUMBER}</a> | FAX: {COMPANY_FAX_NUMBER}</Text>
        <Text as='span' color='gray.400' fontSize='sm'>E-MAIL: {COMPANY_EMAIL}</Text>
      </Box>
    </Stack>
  );
}