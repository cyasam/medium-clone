import React from 'react';

type Props = {
  json: any;
};

function EditorHTMLParser({ json }: Props) {
  const cleanData = JSON.parse(json);
  const { blocks } = cleanData;

  const html = blocks.reduce(function (prevBlock: any, block: any) {
    let element;

    if (block.type === 'header') {
      const { level, text } = block.data;
      let className = '';

      if (level === 1) {
        className = 'heading-1';
      } else if (level === 2) {
        className = 'heading-2';
      } else if (level === 3) {
        className = 'heading-3';
      } else if (level === 4) {
        className = 'heading-4';
      } else if (level === 5) {
        className = 'heading-5';
      } else if (level === 6) {
        className = 'heading-6';
      }

      element = `<h${level} class="${className}">${text}</h${level}>`;
    } else if (block.type === 'paragraph') {
      element = `<p class="mt-3 mb-3">${block.data.text}</p>`;
    }

    return prevBlock + element;
  }, '');

  return (
    <article
      className="text-lg"
      dangerouslySetInnerHTML={{ __html: html }}
    ></article>
  );
}

export default EditorHTMLParser;
