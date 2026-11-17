import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react';

import { COMPANY_KAKAO_ADD_FRIEND_URL, COMPANY_KAKAO_CHAT_URL, COMPANY_PHONE_NUMBER } from '@/shared/config/constants';
import { LucideMessageCircle, LucideUserPlus } from 'lucide-react';

export default function FooterSupport() {
  return (
    <Stack width='100%' align={{ base: 'center', md: 'stretch' }} mx='auto'>
      <Box
        p={8}
        gap={2}
        flex={1}
        display='flex'
        borderRadius='lg'
        alignItems='center'
        flexDirection='column'
        justifyContent='center'
        fontFamily='Pretendard'
        backgroundColor='gray.800'
      >
        <Heading fontSize='lg' fontWeight='medium' letterSpacing='0.05em' color='orange.600'>고객센터</Heading>

        <Text fontSize='3xl' textAlign='center' fontWeight='semibold' color='gray.400'>{COMPANY_PHONE_NUMBER}</Text>

        <Text fontSize='xs' textAlign='center' fontWeight='medium' color='gray.400'>평일 10:00 - 17:00 <br />(공휴일, 주말 제외)</Text>

        <Button
          asChild
          size='sm'
          mt={3}
          px={5}
          borderRadius='lg'
          color='#191919'
          backgroundColor='#FEE500'
          _hover={{ backgroundColor: '#F5DC00' }}
          transition='all 0.3s ease-in-out'
        >
          <a
            href={COMPANY_KAKAO_ADD_FRIEND_URL}
            target='_blank'
            rel='noopener noreferrer'
            aria-label='하나솔루션 카카오톡 채널 추가 (새 창)'
          >
            <LucideUserPlus size={14} />
            <Text fontSize='sm' fontWeight='semibold'>카카오톡 채널 추가</Text>
          </a>
        </Button>

        <Button
          size='xs'
          variant='plain'
          color='gray.400'
          borderColor='gray.400'
          borderRadius='lg'
          mt={1}
          px={4}
          py={2}
          _hover={{
            color: 'gray.200',
            borderColor: 'gray.200',
          }}
          transition='all 0.3s ease-in-out'
          onClick={() => window.open(COMPANY_KAKAO_CHAT_URL, '_blank', 'noopener,noreferrer')}
        >
          <LucideMessageCircle size={10} />
          <Text fontSize='xs' fontWeight='medium' letterSpacing='0.1em'>채널톡</Text>
        </Button>
      </Box>
    </Stack>
  );
}