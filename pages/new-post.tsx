import Head from 'next/head';
import React, { ReactNode } from 'react';
import MediumEditor from '../components/editor/MediumEditor';
import NewPostLayout from '../components/layouts/NewPostLayout';
import ProtectedPages from '../components/pages/ProtectedPages';

function NewPost() {
  return (
    <ProtectedPages>
      <Head>
        <title>New Post</title>
      </Head>
      <MediumEditor />
    </ProtectedPages>
  );
}

NewPost.getLayout = (page: ReactNode) => {
  return <NewPostLayout>{page}</NewPostLayout>;
};

export default NewPost;
