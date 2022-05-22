import React, {
  BaseSyntheticEvent,
  ReactElement,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { EditorState } from 'draft-js';
import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor';
import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar';
import { stateToHTML } from 'draft-js-export-html';
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

const MediumEditor = (): ReactElement => {
  const [plugins, InlineToolbar] = useMemo(() => {
    const inlineToolbarPlugin = createInlineToolbarPlugin({
      theme: { buttonStyles, toolbarStyles },
    });

    return [[inlineToolbarPlugin], inlineToolbarPlugin.InlineToolbar];
  }, []);

  const [title, setTitle] = useState('');
  const [editorState, setEditorState] = useState(() =>
    createEditorStateWithText('')
  );

  const { setNewPost } = useContext(NewPostContext);

  const editor = useRef<Editor | null>(null);

  const onChange = (value: EditorState): void => {
    setEditorState(value);

    setNewPost({
      title,
      body: getEditorContent(value).toString(),
    });
  };

  const onTitleChange = (e: BaseSyntheticEvent) => {
    const title = e.target.innerHTML;
    setTitle(title);

    setNewPost({
      title,
      body: getEditorContent().toString(),
    });
  };

  const onTitlePaste = (e: ClipboardEvent) => {
    e.preventDefault();

    navigator.clipboard.writeText(e.target.innerHTML);

    const copyText = e.clipboardData.getData('text/plain');

    const selection = window.getSelection();
    if (!selection?.rangeCount) return false;

    selection.getRangeAt(0).insertNode(document.createTextNode(copyText));
    selection.collapseToEnd();

    onTitleChange(e);
  };

  const focus = (): void => {
    editor.current?.focus();
  };

  const getEditorContent = (value?: any) => {
    const state = value ?? editorState;
    return stateToHTML(state.getCurrentContent());
  };

  return (
    <div className="medium-editor mt-10">
      <div
        contentEditable="true"
        className="w-full p-4 text-[2rem] font-bold outline-none placeholder:text-stone-400"
        placeholder="Title"
        onInput={onTitleChange}
        onPaste={onTitlePaste}
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

export default dynamic(() => Promise.resolve(MediumEditor), {
  ssr: false,
});
