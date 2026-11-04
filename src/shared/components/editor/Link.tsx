import { useCallback, useEffect, useRef, useState } from 'react';
import { LinkIcon, TrashIcon, UnlinkIcon } from 'lucide-react';

import type { Editor } from '@tiptap/react';

import { Box, Button, Flex, IconButton, Input } from '@chakra-ui/react';

interface LinkProps {
  editor: Editor | null;
}

interface LinkMenuProps {
  editor: Editor;
}

const Link = ({ editor }: LinkProps) => {
  if (!editor) return null;

  return <LinkMenu editor={editor} />;
};

const LinkMenu = ({ editor }: LinkMenuProps) => {
  const linkMenuRef = useRef<HTMLDivElement>(null);
  const [isLinkMenuOpen, setIsLinkMenuOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');

  // 현재 선택된 링크 정보 가져오기
  const getCurrentLink = useCallback(() => {
    if (!editor) return null;

    const { from, to } = editor.state.selection;
    const attrs = editor.getAttributes('link');

    if (attrs.href) {
      return {
        href: attrs.href,
        text: editor.state.doc.textBetween(from, to) || attrs.href,
      };
    }

    return null;
  }, [editor]);

  // 링크 메뉴 열 때 현재 링크 정보 설정
  useEffect(() => {
    if (isLinkMenuOpen) {
      const currentLink = getCurrentLink();
      if (currentLink) {
        setLinkUrl(currentLink.href);
        setLinkText(currentLink.text);
      } else {
        // 선택된 텍스트가 있으면 링크 텍스트로 사용
        const { from, to } = editor.state.selection;
        const selectedText = editor.state.doc.textBetween(from, to);
        setLinkText(selectedText);
        setLinkUrl('');
      }
    }
  }, [isLinkMenuOpen, editor, getCurrentLink]);

  // 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (linkMenuRef.current && !linkMenuRef.current.contains(event.target as Node)) {
        setIsLinkMenuOpen(false);
      }
    };

    if (isLinkMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLinkMenuOpen]);

  // 링크 추가/편집
  const handleLinkAdd = useCallback(() => {
    if (!editor) return;

    const url = linkUrl.trim();
    if (!url) {
      alert('링크 URL을 입력해주세요.');
      return;
    }

    // URL 유효성 검사 (http:// 또는 https://로 시작하는지 확인)
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      alert('유효한 링크 URL을 입력해주세요. (http:// 또는 https://로 시작해야 합니다)');
      return;
    }

    const { from, to } = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(from, to);

    // 텍스트가 선택되어 있으면 해당 텍스트에 링크 추가
    if (selectedText) {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run();
    } else {
      // 텍스트가 선택되지 않았으면 링크 텍스트와 함께 추가
      const textToInsert = linkText.trim() || url;
      editor
        .chain()
        .focus()
        .insertContent({
          type: 'text',
          text: textToInsert,
          marks: [
            {
              type: 'link',
              attrs: {
                href: url,
              },
            },
          ],
        })
        .run();
    }

    setLinkUrl('');
    setLinkText('');
    setIsLinkMenuOpen(false);
  }, [editor, linkUrl, linkText]);

  // 링크 제거
  const handleLinkRemove = useCallback(() => {
    if (!editor) return;

    editor.chain().focus().unsetLink().run();
    setIsLinkMenuOpen(false);
  }, [editor]);

  const isLinkActive = editor.isActive('link');
  const currentLink = getCurrentLink();

  return (
    <Box position="relative" ref={linkMenuRef}>
      <Flex align="center" gap={0.5}>
        <IconButton
          type="button"
          aria-label={isLinkActive ? '링크 편집' : '링크 추가'}
          title={isLinkActive ? '링크 편집' : '링크 추가'}
          size="xs"
          borderRadius="sm"
          color={isLinkMenuOpen || isLinkActive ? 'white' : 'gray.900'}
          backgroundColor={isLinkMenuOpen || isLinkActive ? 'gray.800' : 'transparent'}
          _hover={{
            color: 'white',
            backgroundColor: 'gray.800',
          }}
          onClick={() => setIsLinkMenuOpen(!isLinkMenuOpen)}
        >
          <LinkIcon size={16} />
        </IconButton>
        {isLinkActive && (
          <IconButton
            type="button"
            aria-label="링크 제거"
            title="링크 제거"
            size="xs"
            borderRadius="sm"
            color="gray.900"
            backgroundColor="transparent"
            _hover={{
              color: 'white',
              backgroundColor: 'gray.800',
            }}
            _focus={{ outline: 'none', backgroundColor: 'gray.800' }}
            onClick={handleLinkRemove}
          >
            <UnlinkIcon size={16} />
          </IconButton>
        )}
      </Flex>

      {isLinkMenuOpen && (
        <Box
          position="absolute"
          top="100%"
          left={0}
          p={2}
          mt={1}
          bg="white"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="sm"
          zIndex={50}
          minW="320px"
          boxShadow="md"
        >
          <Flex flexDirection="column" gap={2}>
            <Box>
              <Input
                size="xs"
                placeholder="URL"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleLinkAdd();
                  }
                }}
                bg="gray.100"
                borderRadius="sm"
                px={3}
                py={2}
                fontSize="xs"
                fontWeight="medium"
                color="gray.800"
                _focus={{
                  bg: 'gray.200',
                  outline: 'none',
                }}
                autoFocus
              />
            </Box>
            {!currentLink && (
              <Box>
                <Input
                  size="xs"
                  placeholder="링크명 (선택사항)"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleLinkAdd();
                    }
                  }}
                  bg="gray.100"
                  borderRadius="sm"
                  px={3}
                  py={2}
                  fontSize="xs"
                  fontWeight="medium"
                  color="gray.800"
                  _focus={{
                    bg: 'gray.200',
                    outline: 'none',
                  }}
                />
              </Box>
            )}
            <Flex align="center" gap={2}>
              <Button
                type="button"
                size="xs"
                flex={1}
                bg="blue.100"
                color="blue.600"
                _hover={{ bg: 'blue.200' }}
                _focus={{ outline: 'none' }}
                onClick={handleLinkAdd}
              >
                <LinkIcon size={14} />
              </Button>
              {currentLink && (
                <Button
                  type="button"
                  size="xs"
                  flex={1}
                  bg="red.100"
                  color="red.600"
                  _hover={{ bg: 'red.200' }}
                  _focus={{ outline: 'none' }}
                  onClick={handleLinkRemove}
                >
                  <TrashIcon size={14} />
                </Button>
              )}
            </Flex>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default Link;
