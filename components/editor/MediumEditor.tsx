import React, {
  BaseSyntheticEvent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { EditorState } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import '@draft-js-plugins/inline-toolbar/lib/plugin.css';

import {
  createBlockStyleButton,
  ItalicButton,
  BoldButton,
  UnderlineButton,
  BlockquoteButton,
  CodeBlockButton,
} from '@draft-js-plugins/buttons';
import dynamic from 'next/dynamic';
import { NewPostContext } from '../layouts/NewPostLayout';
import { useDebounce } from 'usehooks-ts';

interface ClipboardEvent<T = Element> extends BaseSyntheticEvent {
  clipboardData: DataTransfer;
}

const buttonStyles = {
  buttonWrapper: 'editor-button-wrapper',
  button: 'editor-button',
  active: 'editor-active',
};
const toolbarStyles = {
  toolbar: 'editor-toolbar',
};

const HeadlineTwoButton = createBlockStyleButton({
  blockType: 'header-two',
  children: (
    <div className="relative -top-[1px] font-medium text-[22px]">T</div>
  ),
});

type Props = {
  title?: string;
  body?: string;
  postStatus?: 'draft' | 'published';
};

const MediumEditor: React.FC<Props> = ({
  title: defaultTitle,
  body: defaultBody,
  postStatus,
}) => {
  const [plugins, InlineToolbar] = useMemo(() => {
    const inlineToolbarPlugin = createInlineToolbarPlugin({
      theme: { buttonStyles, toolbarStyles },
    });

    return [[inlineToolbarPlugin], inlineToolbarPlugin.InlineToolbar];
  }, []);

  const editor = useRef<Editor | null>(null);

  const [title, setTitle] = useState(defaultTitle);
  const [editorState, setEditorState] = useState(
    () =>
      EditorState.createWithContent(stateFromHTML(defaultBody ?? '')) ??
      EditorState.createEmpty()
  );

  const [editing, setEditing] = useState(false);
  const changed = useDebounce(editing, 3000);

  const { onChanged } = useContext(NewPostContext);

  // Methods
  const detectStateChanged = (value: EditorState) => {
    const oldState = editorState.getCurrentContent();
    const newState = value.getCurrentContent();

    return oldState !== newState;
  };

  const onChange = (value: EditorState): void => {
    if (!detectStateChanged(value)) return;

    setEditorState(value);
    setEditing(true);
  };

  const onTitleChange = (e: BaseSyntheticEvent) => {
    const title = e.target.innerHTML;
    setTitle(title);
    setEditing(true);
  };

  const onTitlePaste = (e: ClipboardEvent) => {
    e.preventDefault();

    const copyText = e.clipboardData.getData('text/plain');

    const range = window.getSelection()?.getRangeAt(0);
    if (!range) return;

    range.deleteContents();

    const textNode = document.createTextNode(copyText);
    range.insertNode(textNode);
    range.selectNodeContents(textNode);
    range.collapse(false);

    const selection = window.getSelection();
    if (!selection) return;

    selection.removeAllRanges();
    selection.addRange(range);

    onTitleChange(e);
  };

  const focus = (): void => {
    editor.current?.focus();
  };

  const getEditorContent = useCallback(
    (value?: any) => {
      const state = value ?? editorState;
      return stateToHTML(state.getCurrentContent());
    },
    [editorState]
  );

  // Init

  useEffect(() => {
    if (editing && changed) {
      const data = {
        title: title ?? '',
        body: getEditorContent().toString(),
        postStatus: postStatus ?? 'draft',
      };
      onChanged(data, editing);

      setEditing(false);
    }
  }, [onChanged, getEditorContent, title, editing, changed, postStatus]);

  return (
    <div className="medium-editor mt-10">
      <div
        contentEditable="true"
        className="w-full p-4 text-[2rem] font-bold outline-none placeholder:text-stone-400"
        placeholder="Title"
        onInput={onTitleChange}
        onPaste={onTitlePaste}
        dangerouslySetInnerHTML={{ __html: title ?? '' }}
      />

      <div className="pl-4 border-b border-stone-200" />
      <div className="text-xl p-4" onClick={focus}>
        {getEditorContent().length === 0 && (
          <div className="absolute text-stone-400">Type something...</div>
        )}
        <Editor
          editorKey="MediumEditor"
          editorState={editorState}
          onChange={onChange}
          plugins={plugins}
          ref={(element) => {
            editor.current = element;
          }}
        />
        <InlineToolbar>
          {(externalProps) => (
            <>
              <BoldButton {...externalProps} />
              <ItalicButton {...externalProps} />
              <UnderlineButton {...externalProps} />
              <div className="border-r border-stone-400 h-[20px] mx-1" />
              <HeadlineTwoButton {...externalProps} />
              <BlockquoteButton {...externalProps} />
              <CodeBlockButton {...externalProps} />
            </>
          )}
        </InlineToolbar>
      </div>
    </div>
  );
};

MediumEditor.defaultProps = {
  title: '',
  body: '',
  postStatus: 'draft',
};

export default dynamic(() => Promise.resolve(MediumEditor), {
  ssr: false,
});
