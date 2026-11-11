import { useEffect, useState } from 'react';

import {
  Box,
  Flex,
  Text,
  Button,
  Popover,
} from '@chakra-ui/react';

import { hidePopupForToday, isPopupHiddenForToday } from '@/shared/utils/storage';
import { isExternalUrl, toCssUrl, toSafeUrl } from '@/shared/utils/url';

interface PopupProps {
  title: string;
  text?: string;
  imageUrl?: string;
  link?: string;
  width?: string | number;
  size?: 'xs' | 'sm' | 'md' | 'lg';

  /** 제어 모드 열림 상태 */
  open?: boolean;
  /** 제어 모드 열림 상태 변경 핸들러 */
  onOpenChange?: (open: boolean) => void;

  /** 비제어 모드 초기 열림 상태 */
  defaultOpen?: boolean;

  /** '오늘 하루 보지 않기' localStorage 키 */
  storageKey?: string;

  /** 트리거 버튼 라벨 (미지정 시 트리거 숨김 — 앵커만 사용해 팝업창처럼 표시) */
  triggerLabel?: string;
}

function PopupPanel({
  title,
  text,
  imageUrl,
  link,
  onClose,
  onHideToday,
}: {
  title: string;
  text?: string;
  imageUrl?: string;
  link?: string;
  onClose: () => void;
  onHideToday: () => void;
}) {
  // 관리자 화면에서 넣은 주소라도 http(s)·사이트 안 경로가 아니면 버튼을 그리지 않는다
  const safeLink = toSafeUrl(link);

  return (
    <>
      <Box
        p={2}
        bg="gray.900"
        borderBottomWidth="1px"
        borderColor="gray.500"
        color="gray.200"
        maxH="100px"
      >
        <Flex align="center" justify="space-between" gap={2} px={2} py={0} >
          <Text fontSize="sm" fontWeight="700" color="gray.200">
            {title}
          </Text>
        </Flex>
      </Box>

      <Box
        p={2}
        position="relative"
        aspectRatio={imageUrl ? '4/5' : undefined}
        minH={imageUrl ? undefined : '80px'}
      >
        {imageUrl && (
          <Box
            position="absolute"
            inset={0}
            bgImage={toCssUrl(imageUrl)}
            bgSize="cover"
            bgPos="center"
            bgRepeat="no-repeat"
          />
        )}

        <Flex
          position={imageUrl ? 'absolute' : 'relative'}
          inset={imageUrl ? 0 : undefined}
          zIndex={1}
          direction="column"
          h="full"
          minH={imageUrl ? undefined : '80px'}
          p={2}
        >
          <Flex flex="1" align="center" justify="center" w="full">
            {text && (
              <Text
                fontSize="sm"
                fontWeight="600"
                color={imageUrl ? 'orange.500' : 'gray.800'}
                textAlign="center"
                lineHeight="tall"
                whiteSpace="pre-line"
              >
                {text}
              </Text>
            )}
          </Flex>

          {safeLink && (
            <Flex justify="center" w="full" pt={2}>
              <Button
                asChild
                size="xs"
                color="white"
                bg="gray.900"
                rounded="none"
                fontWeight="700"
                shadow="xl"
                _hover={{
                  bg: 'gray.800',
                }}
              >
                <a
                  href={safeLink}
                  target={isExternalUrl(safeLink) ? '_blank' : undefined}
                  rel={isExternalUrl(safeLink) ? 'noopener noreferrer' : undefined}
                >
                  이동하기
                </a>
              </Button>
            </Flex>
          )}
        </Flex>
      </Box>

      <Box
        p={2}
        borderTopWidth="1px"
        borderColor="gray.500"
        bg="gray.900"
      >
        <Flex w="full" align="center" justify="end" gap={2}>
          <Button
            size="xs"
            bg="gray.800"
            variant="ghost"
            color="gray.200"
            fontWeight="600"
            rounded="lg"
            onClick={onHideToday}
            _hover={{
              bg: 'gray.600',
            }}
          >
            오늘 하루 보지 않기
          </Button>
          <Button
            size="xs"
            bg="gray.800"
            variant="ghost"
            color="gray.200"
            fontWeight="600"
            rounded="lg"
            onClick={onClose}
            _hover={{
              bg: 'gray.700',
            }}
          >
            닫기
          </Button>
        </Flex>
      </Box>
    </>
  );
}

export default function Popup({
  title,
  text,
  imageUrl,
  link,
  width = '360px',
  size = 'md',
  open,
  onOpenChange,
  defaultOpen = false,
  storageKey,
  triggerLabel,
}: PopupProps) {
  const isControlled = open !== undefined;
  const [ready, setReady] = useState(false);
  const [internalOpen, setInternalOpen] = useState(false);

  useEffect(() => {
    const hidden = storageKey ? isPopupHiddenForToday(storageKey) : false;
    setInternalOpen(isControlled ? Boolean(open ?? false) : (defaultOpen ?? false) && !hidden);
    setReady(true);
  }, [storageKey, defaultOpen, isControlled, open]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  const handleClose = () => {
    handleOpenChange(false);
  };

  const handleHideToday = () => {
    if (storageKey) {
      hidePopupForToday(storageKey);
    }
    handleOpenChange(false);
  };

  const isOpen = isControlled ? Boolean(open) : internalOpen;

  if (!ready) {
    return null;
  }

  const panelProps = {
    title,
    text,
    imageUrl,
    link,
    onClose: handleClose,
    onHideToday: handleHideToday,
  };

  const contentStyles = {
    width,
    maxW: '90vw' as const,
    boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;',
    borderWidth: '1px',
    borderColor: 'gray.600',
    fontFamily: 'NanumSquareNeo',
    rounded: 'xl' as const,
    overflow: 'hidden' as const,
  };

  // 트리거 없는 공지 팝업: 문서 흐름에 배치해 flex-wrap 시 세로로 쌓이도록 함
  if (!triggerLabel) {
    if (!isOpen) {
      return null;
    }

    return (
      <Box {...contentStyles} role="dialog" aria-label={title}>
        <PopupPanel {...panelProps} />
      </Box>
    );
  }

  return (
    <Popover.Root
      size={size}
      open={isOpen}
      onOpenChange={(details) => handleOpenChange(details.open)}
      closeOnInteractOutside={false}
      positioning={{ placement: 'bottom-start' }}
    >
      <Popover.Trigger asChild>
        <Button size="sm" variant="outline">
          {triggerLabel}
        </Button>
      </Popover.Trigger>

      <Popover.Positioner>
        <Popover.Content {...contentStyles}>
          <PopupPanel {...panelProps} />
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
}
