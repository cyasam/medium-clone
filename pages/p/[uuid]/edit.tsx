import React, { ReactNode, useEffect, useState } from 'react';
import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';

import { Api, createAuthorPostFetchUrlByID } from '../../../utils/api';
import { Post, PostStatus } from '../../../types';

import MediumEditor from '../../../components/editor/MediumEditor';
import NewPostLayout from '../../../components/layouts/NewPostLayout';

export async function getServerSideProps(context: any) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}

function EditPost() {
  const router = useRouter();

  const { data: session } = useSession();
  const username = session?.user?.username;

  const [blocks, setBlocks] = useState();
  const [postStatus, setPostStatus] = useState<PostStatus>('draft');

  useEffect(() => {
    const { uuid } = router.query;

    const init = async () => {
      const postFetchUrl = createAuthorPostFetchUrlByID(uuid, username);
      const { data: post }: { data: Post } = await Api.get(postFetchUrl);

      if (!post) router.push('/not-found');

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

      if (postStatus === 'published') {
        let blocksString = body_changes ?? body;
        blocks = blocksString && JSON.parse(blocksString);
      } else {
        blocks = body && JSON.parse(body);
      }

      setBlocks(blocks);
      setPostStatus(postStatus);
    };

    uuid && username && init();
  }, [username, router]);

  return (
    <>
      <Head>
        <title>Edit Post</title>
      </Head>
      <div className="container">
        {blocks && <MediumEditor blocks={blocks} postStatus={postStatus} />}
      </div>
    </>
  );
}

EditPost.getLayout = (page: ReactNode) => {
  return <NewPostLayout>{page}</NewPostLayout>;
};

export default EditPost;
