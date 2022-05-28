import React, { ReactNode, useEffect, useState } from 'react';
import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Api, createAuthorPostFetchUrlByID } from '../../../utils';
import { Post, PostStatus } from '../../../types';

import MediumEditor from '../../../components/editor/MediumEditor';
import ProtectedPages from '../../../components/pages/ProtectedPages';
import NewPostLayout from '../../../components/layouts/NewPostLayout';

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
      const { data: post }: {data: Post} = await Api.get(postFetchUrl);

      const {
        body,
        body_changes,
        status: postStatus,
      }: Post = post ?? {
        body: null,
        body_changes: null,
        status: 'draft',
      };

      let blocks = null;

       if( postStatus === 'published') {
        let blocksString = body_changes ?? body
        blocks = blocksString && JSON.parse(blocksString)
       } else {
        blocks = body && JSON.parse(body);
       }

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
