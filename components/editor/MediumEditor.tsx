import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { NewPostContext } from '../layouts/NewPostLayout';
import EditorJS from '@editorjs/editorjs';
import { PostStatus } from '../../types';
import { useDebounce } from 'usehooks-ts';

type Props = {
  blocks?: EditorJS.OutputData;
  postStatus: PostStatus;
};

const EDITOR_HOLDER_ID = 'editorjs';

const MediumEditor = ({ blocks, postStatus }: Props) => {
  const editorInsRef = useRef<EditorJS | null>();
  const { onChanged } = useContext(NewPostContext);

  const [edit, setEdit] = useState(false);
  const debouncedEdit = useDebounce<boolean>(edit, 1000);

  useEffect(() => {
    if (edit && debouncedEdit) {
      const change = async () => {
        const outputData = await editorInsRef?.current?.saver.save();

        const title = outputData?.blocks.find(
          (block) => block.type === 'header' && block.data.level === 1
        );

        const data = {
          title: title?.data?.text,
          body: JSON.stringify(outputData),
        };

        onChanged(data, postStatus);
      };

      change();
      setEdit(false);
    }
  }, [onChanged, edit, debouncedEdit, postStatus]);

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
      async onChange() {
        setEdit(true);
      },
    });
  }, [blocks]);

  useEffect(() => {
    !editorInsRef.current && initEditor();
  }, [initEditor]);

  return (
    <div className="medium-editor mt-10">
      <div className="p-4">
        <div className="text-lg" id={EDITOR_HOLDER_ID} />
      </div>
    </div>
  );
};

MediumEditor.defaultProps = {
  postStatus: 'draft',
};

export default MediumEditor;
