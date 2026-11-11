import { useEffect, useMemo } from 'react';

import { Box } from '@chakra-ui/react';

import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import { TextStyle, Color } from '@tiptap/extension-text-style';
import { EditorContent, useEditor, type JSONContent } from '@tiptap/react';

import { CustomImage } from '@/shared/components/editor/hooks/useImage';
import { sanitizeContent } from '@/shared/components/editor/sanitizeContent';

// CSS import
import '@/shared/components/editor/index.css';

interface EditorViewerProps {
  content: JSONContent | null | undefined;
  /** 뷰어 영역에 적용할 추가 스타일 */
  className?: string;
}

export default function EditorViewer({ content, className }: EditorViewerProps) {
  // DB 에서 온 본문은 그리기 전에 주소·색상 값을 걸러 낸다
  const safeContent = useMemo(
    () => (content ? sanitizeContent(content) : { type: 'doc', content: [] }),
    [content],
  );

  const editor = useEditor({
    extensions: [
      StarterKit, 
      CustomImage, 
      TextStyle, 
      Color, 
      Highlight.configure({
        multicolor: true,
      })
    ],
    content: safeContent,
    editable: false,
    editorProps: {
      attributes: {
        class: 'editor-viewer-content',
      },
    },
  });

  useEffect(() => {
    if (!editor || editor.isDestroyed) return;
    editor.commands.setContent(safeContent, { emitUpdate: false });
  }, [editor, safeContent]);

  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  if (!editor) return null;

  return (
    <Box className={className} width="100%">
      <EditorContent editor={editor} className="editor-content editor-content--viewer" />
    </Box>
  );
}
