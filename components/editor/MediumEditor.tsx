import React, { ReactElement, useMemo, useRef, useState } from 'react';
import { EditorState } from 'draft-js';
import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor';
import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar';
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

  const [editorState, setEditorState] = useState(() =>
    createEditorStateWithText('')
  );

  /*   useEffect(() => {
    setEditorState(createEditorStateWithText(''));
  }, []); */

  const editor = useRef<Editor | null>(null);

  const onChange = (value: EditorState): void => {
    setEditorState(value);
  };

  const focus = (): void => {
    editor.current?.focus();
  };

  const getEditorContent = () => {
    return editorState.getCurrentContent().getPlainText();
  };

  return (
    <div className="medium-editor mt-10">
      <input
        type="text"
        className="p-4 text-[2rem] font-bold outline-none placeholder:text-stone-400"
        placeholder="Title"
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
