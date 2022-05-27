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
  status: 'draft' | 'published';
};

function EditPost() {
  const {
    query: { uuid },
  } = useRouter();

  const { data: session } = useSession();
  const username = session?.user?.username;
  const postFetchUrl = createAuthorPostFetchUrlByID(uuid, username);

  const { data: post } = useSWR(postFetchUrl, fetcher);

  const { title, body, title_changes, body_changes, status }: Post = post ?? {
    title: '',
    body: '',
    title_changes: null,
    body_changes: null,
    status: 'published',
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
          postStatus={status}
        />
      )}
    </ProtectedPages>
  );
}

EditPost.getLayout = (page: ReactNode) => {
  return <NewPostLayout>{page}</NewPostLayout>;
};

export default EditPost;
