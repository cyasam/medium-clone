import React, { ReactNode } from 'react';
import MediumEditor from '../components/editor/MediumEditor';
import NewPostLayout from '../components/layouts/NewPostLayout';

function NewPost() {
  return <MediumEditor />;
}

NewPost.getLayout = (page: ReactNode) => {
  return <NewPostLayout>{page}</NewPostLayout>;
};

export default NewPost;
