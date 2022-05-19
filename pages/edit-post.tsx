import React from 'react';
import PostEditorLayout from '../components/layouts/PostEditorLayout';

function EditPost() {
  return <div>EditPost</div>;
}

EditPost.getLayout = (page: React.ReactNode) => {
  return <PostEditorLayout>{page}</PostEditorLayout>;
};

export default EditPost;
