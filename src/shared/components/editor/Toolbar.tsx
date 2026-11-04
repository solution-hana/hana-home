import { useCallback } from 'react';
import { Bold, Code, Italic, Quote, Strikethrough, Underline, SquareCode, Minus } from 'lucide-react';

import { Editor } from '@tiptap/react';

import { Flex, IconButton, Separator } from '@chakra-ui/react';

import useToolBar from '@/shared/components/editor/hooks/useToolbar';

import List from './List';
import Link from './Link';
import Image from './Image';
import Heading from './Heading';
import HighLight from './HighLight';
import TextColor from './TextColor';

interface ToolBarProps {
  editor: Editor | null;
  onImageUpload?: (file: File) => Promise<string | null | undefined>;
}

interface ToolBarContentProps extends Omit<ToolBarProps, 'editor'> {
  editor: Editor;
}

export default function Toolbar({ editor, onImageUpload }: ToolBarProps) {
  if (!editor) {
    return null;
  }

  return <ToolBarContent editor={editor} onImageUpload={onImageUpload} />;
}

function ToolBarContent({ editor, onImageUpload }: ToolBarContentProps) {
  useToolBar(editor);

  // Bold
  const toggleBold = useCallback(() => {
    editor.chain().focus().toggleBold().run();
  }, [editor]);

  // Italic
  const toggleItalic = useCallback(() => {
    editor.chain().focus().toggleItalic().run();
  }, [editor]);

  // Underline
  const toggleUnderline = useCallback(() => {
    editor.chain().focus().toggleUnderline().run();
  }, [editor]);

  // Strike
  const toggleStrike = useCallback(() => {
    editor.chain().focus().toggleStrike().run();
  }, [editor]);

  // Blockquote
  const toggleBlockquote = useCallback(() => {
    editor.chain().focus().toggleBlockquote().run();
  }, [editor]);

  // Horizontal Rule
  const insertHorizontalRule = useCallback(() => {
    editor.chain().focus().setHorizontalRule().run();
  }, [editor]);

  // Inline Code
  const toggleCode = useCallback(() => {
    editor.chain().focus().toggleCode().run();
  }, [editor]);

  // Code Block
  const toggleCodeBlock = useCallback(() => {
    editor.chain().focus().toggleCodeBlock().run();
  }, [editor]);

  return (
    <Flex
      p={2}
      gap={1}
      justify="start"
      align="center"
      bg="white"
      borderBottom="1px solid gray.200"
    >
      {/* Heading */}
      <Heading editor={editor} />
      
      {/* List */}
      <List editor={editor} />

      {/* Bold */}
      <IconButton 
        onClick={toggleBold}
        title="굵은 글씨"
        aria-label="굵은 글씨"
        size="xs"
        borderRadius="sm"
        color={editor.isActive('bold') ? 'white' : 'gray.900'}
        backgroundColor={editor.isActive('bold') ? 'gray.800' : 'white'}
        _hover={{
          backgroundColor: 'gray.800',
          color: 'white',
        }}
      >
        <Bold />
      </IconButton>
      
      {/* Italic */}
      <IconButton 
        onClick={toggleItalic}
        title="기울임 글씨"
        aria-label="굵은 글씨"
        size="xs"
        borderRadius="sm"
        color={editor.isActive('italic') ? 'white' : 'gray.900'}
        backgroundColor={editor.isActive('italic') ? 'gray.800' : 'white'}
        _hover={{
          backgroundColor: 'gray.800',
          color: 'white',
        }}
      >
        <Italic />
      </IconButton>

      {/* Underline */}
      <IconButton
        onClick={toggleUnderline}
        title="밑줄"
        aria-label="밑줄"
        size="xs"
        borderRadius="sm"
        color={editor.isActive('underline') ? 'white' : 'gray.900'}
        backgroundColor={editor.isActive('underline') ? 'gray.800' : 'white'}
        _hover={{
          backgroundColor: 'gray.800',
          color: 'white',
        }}
      >
        <Underline />
      </IconButton>

      {/* Strike */}
      <IconButton
        onClick={toggleStrike}
        title="취소선"
        aria-label="취소선"
        size="xs"
        borderRadius="sm"
        color={editor.isActive('strike') ? 'white' : 'gray.900'}
        backgroundColor={editor.isActive('strike') ? 'gray.800' : 'white'}
        _hover={{
          backgroundColor: 'gray.800',
          color: 'white',
        }}
      >
        <Strikethrough />
      </IconButton>

      {/* Blockquote */}
      <IconButton
        onClick={toggleBlockquote}
        title="인용구"
        aria-label="인용구"
        size="xs"
        borderRadius="sm"
        color={editor.isActive('blockquote') ? 'white' : 'gray.900'}
        backgroundColor={editor.isActive('blockquote') ? 'gray.800' : 'white'}
        _hover={{
          backgroundColor: 'gray.800',
          color: 'white',
        }}
      >
        <Quote />
      </IconButton>

      {/* Horizontal Rule */}
      <IconButton
        onClick={insertHorizontalRule}
        title="수평선"
        aria-label="수평선"
        size="xs"
        borderRadius="sm"
        color={editor.isActive('horizontalRule') ? 'white' : 'gray.900'}
        backgroundColor={editor.isActive('horizontalRule') ? 'gray.800' : 'white'}
        _hover={{
          backgroundColor: 'gray.800',
          color: 'white',
        }}
      >
        <Minus />
      </IconButton>

      {/* Inline Code */}
      <IconButton
        onClick={toggleCode}
        title="코드"
        aria-label="코드"
        size="xs"
        borderRadius="sm"
        color={editor.isActive('code') ? 'white' : 'gray.900'}
        backgroundColor={editor.isActive('code') ? 'gray.800' : 'white'}
        _hover={{
          backgroundColor: 'gray.800',
          color: 'white',
        }}
      >
        <Code />
      </IconButton>

      {/* Code Block */}
      <IconButton
        onClick={toggleCodeBlock}
        title="코드 블럭"
        aria-label="코드 블럭"
        size="xs"
        borderRadius="sm"
        color={editor.isActive('codeBlock') ? 'white' : 'gray.900'}
        backgroundColor={editor.isActive('codeBlock') ? 'gray.800' : 'white'}
        _hover={{
          backgroundColor: 'gray.800',
          color: 'white',
        }}
      >
        <SquareCode />
      </IconButton>

      <Separator orientation="vertical" borderColor="gray.200" bg="gray.200" h="20px" />

      {/* TextColor */}
      <TextColor editor={editor} />
      
      {/* HighLight */}
      <HighLight editor={editor} />

      <Separator orientation="vertical" borderColor="gray.200" bg="gray.200" h="20px" />

      {/* Link */}
      <Link editor={editor} />

      {/* Image (로컬 파일 선택 → Supabase 업로드 후 삽입) */}
      <Image editor={editor} onUpload={onImageUpload} isDisabled={false} />
    </Flex>
  );
}