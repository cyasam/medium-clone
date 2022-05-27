import React, { ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import MediumEditor from '../../../components/editor/MediumEditor';
import NewPostLayout from '../../../components/layouts/NewPostLayout';
import { createAuthorPostFetchUrlByID, fetcher } from '../../../utils';
import ProtectedPages from '../../../components/pages/ProtectedPages';

type Post = {
  title: string;
  body: string;
  title_changes: string | null;
  body_changes: string | null;
};

function EditPost() {
  const {
    query: { uuid },
  } = useRouter();

  const postFetchUrl = createAuthorPostFetchUrlByID(uuid);
  const { data: post } = useSWR(postFetchUrl, fetcher);

  const { title, body, title_changes, body_changes }: Post = post ?? {
    title: '',
    body: '',
  };

  return (
    <ProtectedPages>
      <Head>
        <title>Edit Post</title>
      </Head>
      {post && (
        <MediumEditor
          title={title_changes ?? title}
          body={body_changes ?? body}
          postStatus={post?.status}
        />
      )}
    </ProtectedPages>
  );
}

EditPost.getLayout = (page: ReactNode) => {
  return <NewPostLayout>{page}</NewPostLayout>;
};

export default EditPost;
