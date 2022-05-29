import Head from 'next/head';
import React, { ReactNode } from 'react';
import MediumEditor from '../components/editor/MediumEditor';
import NewPostLayout from '../components/layouts/NewPostLayout';

function NewPost() {
  return (
    <>
      <Head>
        <title>New Post</title>
      </Head>
      <MediumEditor />
    </>
  );
}

NewPost.getLayout = (page: ReactNode) => {
  return <NewPostLayout>{page}</NewPostLayout>;
};

export default NewPost;
