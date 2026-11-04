import { useEffect, useState } from 'react';

import { Box, Button, Checkbox, Flex, Grid, Heading, Input, Text, Textarea, Field, Select, Portal, createListCollection  } from '@chakra-ui/react';

import type { Inquiry } from '@/types/common';

import { useMinSubmitTime } from '@/shared/hooks/useMinSubmitTime';
import { isValidPhoneNumber, formatPhoneNumberInput } from '@/shared/utils/validation';

import { useSendInquiry } from '@/domains/support/hooks/useInquiry';

import SimplePrivacyModal from './SimplePrivacyModal';

const initialValues: Inquiry = {
  name: '',
  phone: '',
  address: '',
  content: '',
  visitRoute: '',
  robot: '',
  agreement: false,
};

const visitRoute = createListCollection({
  items: [
    { value: '광고', label: '광고' },
    { value: 'SNS', label: 'SNS' },
    { value: '블로그', label: '블로그' },
    { value: '검색엔진', label: '검색엔진' },
    { value: '지인 소개', label: '지인 소개' },
    { value: '기타', label: '기타' },
  ]
});

// const emailDomain = createListCollection({
//   items: [
//     { value: 'naver.com', label: 'naver.com' },
//     { value: 'gmail.com', label: 'gmail.com' },
//     { value: 'daum.net', label: 'daum.net' },
//     { value: 'hanmail.com', label: 'hanmail.com' },
//     { value: 'nate.com', label: 'nate.com' },
//     { value: 'self', label: '직접 입력' },
//   ]
// });

// const EMAIL_DOMAIN_PRESETS = ['naver.com', 'gmail.com', 'daum.net', 'hanmail.com', 'nate.com'];

/** 제출 허용 최소 경과 시간(초). 이 시간보다 빨리 제출하면 봇으로 간주 */
const MIN_SUBMIT_SECONDS = 5;

export default function InquiryForm() {
  const [values, setValues] = useState<Inquiry>(initialValues);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const { isAllowedToSubmit } = useMinSubmitTime(MIN_SUBMIT_SECONDS);

  // const isDirectDomain = !EMAIL_DOMAIN_PRESETS.includes(values.emailDomain);
  // const selectValue = isDirectDomain ? 'self' : values.emailDomain;

  const update = <K extends keyof Inquiry>(key: K, value: Inquiry[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const { mutate: sendInquiryMutation, isPending, isError, isSuccess } = useSendInquiry();

  useEffect(() => {
    if (isSuccess) {
      alert('견적 문의가 접수되었습니다.');
    }
    // 폼 초기화
    setValues(initialValues);
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      alert('견적 문의 접수에 실패했습니다.');
    }
    // 폼 초기화
    setValues(initialValues);
  }, [isError]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const nextErrors: Partial<Record<keyof Inquiry, string>> = {};

    if (!values.name?.trim()) {
      nextErrors.name = '이름 또는 상호명을 입력해 주세요.';
    }
    if (!values.phone?.trim()) {
      nextErrors.phone = '연락처를 입력해 주세요.';
    } else if (!isValidPhoneNumber(values.phone)) {
      nextErrors.phone = '연락처 형식이 올바르지 않습니다. (예: 010-1234-5678)';
    }
    if (!values.visitRoute?.trim()) {
      nextErrors.visitRoute = '유입경로를 선택해 주세요.';
    }
    // if (!values.email?.trim()) {
    //   nextErrors.email = '이메일을 입력해 주세요.';
    // } else if (!values.emailDomain?.trim()) {
    //   nextErrors.emailDomain = '이메일 도메인을 입력 또는 선택해 주세요.';
    // } else if (!isValidEmailWithDomain(values.email, values.emailDomain)) {
    //   nextErrors.email = '이메일 형식이 올바르지 않습니다.';
    // }
    if (!values.address?.trim()) {
      nextErrors.address = '설치 희망 주소를 입력해 주세요.';
    }
    // if (!values.content?.trim()) {
    //   nextErrors.content = '문의 내용을 입력해 주세요.';
    // }
    if (!values.agreement) {
      nextErrors.agreement = '개인정보 수집 및 이용에 동의해 주세요.';
    }

    // 해당 필드가 존재하면 제출 무시 (봇 방지)
    if (values.robot) {
      return;
    }

    // 최소 제출 시간 미만이면 제출 무시 (봇 방지)
    if (!isAllowedToSubmit()) {
      return;
    }

    const isValid = Object.keys(nextErrors).length === 0;
    if (isValid) {
      sendInquiryMutation(values);
    } else {
      const message = Object.values(nextErrors)[0];
      alert(message);
    }
  };

  return (
    <Flex
      mb={24}
      mt={12}
      gap={12}
      p={{ base: 0, md: 12 }}
      width="100%"
      height="auto"
      maxW="1280px"
      margin="0 auto"
      borderRadius="lg"
      overflow="hidden"
      direction="column"
      position="relative"
      alignItems="center"
    >
      <Box
        px={4}
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        <Heading
          mb={4}
          fontSize={{ base: '28px', sm: '32px', md: '36px', lg: '48px' }}
          color="gray.800"
          lineHeight="1.35"
          fontWeight="semibold"
        >
          견적문의
        </Heading>
        <Text 
          fontSize={{ base: 'sm', md: 'md' }}
          color="gray.600"
        >
          아래 양식을 작성해 주시면 담당자가 검토 후 신속하게 연락드리겠습니다.
        </Text>
      </Box>

      <Box
        id="inquiryForm"
        p={8}
        gap={4}
        as="form"
        width="100%"
        maxW={{ base: '100%', md: '960px' }}
        display="flex"
        boxShadow={{ base: 'none' }}
        borderRadius={{ base: 'none', md: 'xl' }}
        borderWidth="1px"
        alignItems="center"
        borderColor="gray.200"
        flexDirection="column"
        justifyContent="center"
        fontFamily="Pretendard"
        backgroundColor="gray.50"
      >
        <Grid
          width="100%"
          alignItems="flex-end"
          gap={4}
          templateColumns={{ base: '1fr', md: '1.4fr 1fr 1.5fr' }}
        >
          <Field.Root>
            <Field.Label
              ms={1}
              fontSize="md" 
              fontWeight="500" 
              color="gray.700"
            >
              이름 또는 상호명 (필수) <Field.RequiredIndicator />
            </Field.Label>
            <Input
              placeholder=""
              borderRadius="lg"
              value={values.name}
              borderColor="gray.300"
              backgroundColor="white"
              onChange={(e) => update('name', e.target.value)}
              _hover={{ borderColor: 'orange.500', outlineColor: 'none' }}
              _focus={{ borderColor: 'orange.500', outlineColor: 'orange.400' }}
            />
          </Field.Root>

          <Field.Root>
            <Field.Label
              ms={1}
              fontSize="md" 
              fontWeight="500" 
              color="gray.700"
            >
              연락처 (필수) <Field.RequiredIndicator />
            </Field.Label>
            <Input
              type="tel"
              name="phone"
              inputMode="numeric"
              borderRadius="lg"
              value={values.phone}
              borderColor="gray.300"
              backgroundColor="white"
              placeholder="예) 010-1234-5678"
              onChange={(e) => {
                const formatted = formatPhoneNumberInput(e.target.value);
                update('phone', formatted);
              }}
              _hover={{ borderColor: 'orange.500', outlineColor: 'none' }}
              _focus={{ borderColor: 'orange.500', outlineColor: 'orange.400' }}
            />
          </Field.Root>

          <Select.Root
            collection={visitRoute}
            value={[values.visitRoute]}
            onValueChange={(e) => {
              const v = Array.isArray(e.value) ? e.value[0] : e.value;
              update('visitRoute', v ?? '');
            }}
          >
            <Select.HiddenSelect />
            <Select.Label
              ms={1}
              fontSize="md" 
              fontWeight="500" 
              color="gray.700"
            >
              유입경로 (필수) 
            </Select.Label>

            <Select.Control>
              <Select.Trigger 
                borderRadius="lg"
                borderColor="gray.300"
                backgroundColor="white"
                _hover={{ borderColor: 'orange.500', outlineColor: 'none' }}
                _focus={{ borderColor: 'orange.500', outlineColor: 'orange.400' }}
              >
                <Select.ValueText placeholder="유입경로를 선택해 주세요." />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>

            <Portal>
              <Select.Positioner>
                <Select.Content 
                  fontSize="sm"
                  borderRadius="lg"
                  borderWidth="1px"
                  borderColor="gray.300"
                  fontFamily="Pretendard"
                  backgroundColor="white"
                >
                  {visitRoute.items.map((item) => (
                    <Select.Item item={item} key={item.value}>
                      {item.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>  
            </Portal>
          </Select.Root>
        </Grid>

        {/* <Grid 
          gap={4}
          width="100%"
          alignItems="flex-end"
          templateColumns={{ base: '1fr', md: '1fr auto 1fr minmax(0, 1fr)' }}
        >
          <Field.Root>
            <Field.Label
              ms={1}
              fontSize="md" 
              fontWeight="500" 
              color="gray.700"
            >
              이메일 <Field.RequiredIndicator />
            </Field.Label>
            <Input
              name="email"
              placeholder=""
              borderRadius="lg"
              value={values.email}
              borderColor="gray.300"
              backgroundColor="white"
              onChange={(e) => update('email', e.target.value)}
              _hover={{ borderColor: 'orange.500', outlineColor: 'none' }}
              _focus={{ borderColor: 'orange.500', outlineColor: 'orange.400' }}
            />
          </Field.Root>

          {isDesktop && (
            <Flex justify="center" alignItems="center" pb={3}>
              <Box asChild color="gray.500" aria-hidden>
                <LucideAtSign size={16} />
              </Box>
            </Flex>
          )}

          <Field.Root>
            <Input
              borderRadius="lg"
              name="emailDomain"
              borderColor="gray.300"
              backgroundColor="white"
              value={values.emailDomain}
              placeholder="도메인 입력 (예: solutionhana.co.kr)"
              onChange={(e) => update('emailDomain', e.target.value)}
              _hover={{ borderColor: 'orange.500', outlineColor: 'none' }}
              _focus={{ borderColor: 'orange.500', outlineColor: 'orange.400' }}
            />
          </Field.Root>

          <Select.Root
            collection={emailDomain}
            value={[selectValue]}
            onValueChange={(e) => {
              const v = Array.isArray(e.value) ? e.value[0] : e.value;
              update('emailDomain', v === 'self' ? '' : v ?? '');
            }}
          >
            <Select.HiddenSelect />

            <Select.Control>
              <Select.Trigger
                borderRadius="lg"
                borderColor="gray.300"
                backgroundColor="white"
                _hover={{ borderColor: 'orange.500', outlineColor: 'none' }}
                _focus={{ borderColor: 'orange.500', outlineColor: 'orange.400' }}
              >
                <Select.ValueText placeholder="" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>

            <Portal>
              <Select.Positioner>
                <Select.Content
                  fontSize="sm"
                  borderRadius="lg"
                  borderWidth="1px"
                  borderColor="gray.300"
                  fontFamily="Pretendard"
                  backgroundColor="white"
                >
                  {emailDomain.items.map((item) => (
                    <Select.Item item={item} key={item.value}>
                      {item.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        </Grid> */}

        <Field.Root width="100%">
          <Field.Label
            ms={1}
            fontSize="md" 
            fontWeight="500" 
            color="gray.700"
          >
            설치 희망 주소 (필수)
          </Field.Label>
          <Input
            name="address"
            placeholder=""
            borderRadius="lg"
            value={values.address}
            borderColor="gray.300"
            backgroundColor="white"
            onChange={(e) => update('address', e.target.value)}
            _hover={{ borderColor: 'orange.500', outlineColor: 'none' }}
            _focus={{ borderColor: 'orange.500', outlineColor: 'orange.400' }}
          />
        </Field.Root>

        <Field.Root width="100%">
          <Field.Label
            ms={1}
            fontSize="md" 
            fontWeight="500" 
            color="gray.700"
          >
            문의 내용 (선택)
          </Field.Label>
          <Textarea
            p={4}
            rows={10}
            resize="none"
            name="content"
            borderRadius="lg"
            value={values.content}
            borderColor="gray.300"
            backgroundColor="white"
            onChange={(e) => update('content', e.target.value)}
            _hover={{ borderColor: 'orange.500', outlineColor: 'none' }}
            _focus={{ borderColor: 'orange.500', outlineColor: 'orange.400' }}
            placeholder="예) 희망상담일, 설치 용량 등 문의하실 내용을 자유롭게 적어 주세요."
          />
        </Field.Root>

        <Field.Root width="100%">
          <Flex width="100%" alignItems="center" gap={2} flexWrap="wrap" justifyContent="center">
            <Checkbox.Root
              colorPalette="orange"
              checked={values.agreement}
              onCheckedChange={(e) => update('agreement', !!e.checked)}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control
                borderRadius="sm"
                borderColor={values.agreement ? 'orange.500' : 'gray.300'}
                _hover={{ borderColor: 'orange.500', outlineColor: 'none' }}
              />
              <Checkbox.Label fontSize="sm" fontWeight="400" color="gray.500">
                개인정보 수집 및 이용에 동의합니다. <Field.RequiredIndicator />
              </Checkbox.Label>
            </Checkbox.Root>
            <Button
              px={0}
              py={0}
              size="sm"
              type="button"
              fontWeight="00"
              color="gray.700"
              backgroundColor="transparent"
              _hover={{ textDecoration: 'none' }}
              onClick={(e) => {
                e.preventDefault();
                setPrivacyModalOpen(true);
              }}
            >
              자세히보기
            </Button>
          </Flex>
        </Field.Root>

        {/* 봇 방지 */}
        <Field.Root display="none">
          <Input 
            name="robot" 
            hidden={true} 
            value={values.robot} 
            onChange={(e) => update('robot', e.target.value)} 
          />
        </Field.Root>

        <SimplePrivacyModal
          open={privacyModalOpen}
          onOpenChange={setPrivacyModalOpen}
        />

        <Button
          px={12}
          py={6}
          size="xl"
          fontSize="xl"
          color="white"
          type="submit"
          fontWeight="600"
          borderRadius="xl"
          alignSelf="center"
          form="inquiryForm"
          letterSpacing="0.1em"
          onClick={(e) => handleSubmit(e)}
          backgroundColor="orange.500"
          _hover={{ backgroundColor: 'orange.600' }}
          loading={isPending}
          disabled={isPending}
        >
          문의하기
        </Button>
      </Box>
    </Flex>
  );
}
