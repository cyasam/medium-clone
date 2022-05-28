import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import MediumEditor from '../../../components/editor/MediumEditor';
import NewPostLayout, {
  PostStatus,
} from '../../../components/layouts/NewPostLayout';
import { Api, createAuthorPostFetchUrlByID, fetcher } from '../../../utils';
import ProtectedPages from '../../../components/pages/ProtectedPages';

type Post = {
  body: string;
  body_changes: string;
  status: PostStatus;
};

export async function getServerSideProps(context: any) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}

function EditPost() {
  const {
    query: { uuid },
  } = useRouter();

  const { data: session } = useSession();
  const username = session?.user?.username;

  const [blocks, setBlocks] = useState();
  const [postStatus, setPostStatus] = useState<PostStatus>('draft');

  useEffect(() => {
    const init = async () => {
      const postFetchUrl = createAuthorPostFetchUrlByID(uuid, username);
      const { data: post } = await Api.get(postFetchUrl);

      const {
        body,
        body_changes,
        status: postStatus,
      }: Post = post ?? {
        body: null,
        body_changes: null,
        status: 'draft',
      };

      const blocks =
        postStatus === 'published'
          ? JSON.parse(body_changes ?? body)
          : JSON.parse(body);

      setBlocks(blocks);
      setPostStatus(postStatus);
    };

    uuid && username && init();
  }, [username, uuid]);

  return (
    <ProtectedPages>
      <Head>
        <title>Edit Post</title>
      </Head>
      {blocks && <MediumEditor blocks={blocks} postStatus={postStatus} />}
    </ProtectedPages>
  );
}

EditPost.getLayout = (page: ReactNode) => {
  return <NewPostLayout>{page}</NewPostLayout>;
};

export default EditPost;
