import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { NewPostContext, PostStatus } from '../layouts/NewPostLayout';
import EditorJS from '@editorjs/editorjs';

type Props = {
  blocks?: EditorJS.OutputData;
  postStatus: PostStatus;
};

const EDITOR_HOLDER_ID = 'editorjs';

const MediumEditor = ({ blocks, postStatus }: Props) => {
  const editorInsRef = useRef<EditorJS | null>();
  const { onChanged } = useContext(NewPostContext);

  // Init

  const initEditor = useCallback(async () => {
    const EditorJS = (await import('@editorjs/editorjs')).default;
    const tools = (await import('./tools')).default;

    const editor = new EditorJS({
      holder: EDITOR_HOLDER_ID,
      autofocus: true,
      tools,
      data: blocks,
      placeholder: `Let's start typing something...`,
      onReady() {
        editorInsRef.current = editor;
      },
      async onChange(api) {
        const outputData = await api.saver.save();

        const title = outputData.blocks.find(
          (block) => block.type === 'header' && block.data.level === 1
        );

        const data = {
          title: title?.data?.text,
          body: JSON.stringify(outputData),
        };

        onChanged(data, postStatus);
      },
    });
  }, [blocks, onChanged, postStatus]);

  useEffect(() => {
    !editorInsRef.current && initEditor();
  }, [initEditor]);

  return (
    <div className="medium-editor mt-10">
      <div className="p-4">
        <div id={EDITOR_HOLDER_ID} />
      </div>
    </div>
  );
};

MediumEditor.defaultProps = {
  postStatus: 'draft',
};

export default MediumEditor;
