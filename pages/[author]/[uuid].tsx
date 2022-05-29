import React, { useEffect } from 'react';
import { SWRConfig } from 'swr';
import { createPostFetchUrlByID } from '../../utils/api';
import { getPostByID } from '../api/posts/[uuid]';
import { getSession } from 'next-auth/react';
import PostDetailArea from '../../components/pages/PostDetailArea';
import Head from 'next/head';
import { Post } from '../../types';
import { formatPostDate } from '../../utils';
import { useRouter } from 'next/router';

export async function getServerSideProps(context: any) {
  const { uuid } = context.params;
  const postFetchUrl = createPostFetchUrlByID(uuid);
  const post = await getPostByID(uuid);

  if (!post) {
    return {
      redirect: {
        permanent: true,
        destination: '/not-found',
      },
    };
  }

  return {
    props: {
      post,
      session: await getSession(context),
      fallback: {
        [postFetchUrl]: post,
      },
    },
  };
}

type Props = {
  post: Post;
  fallback: any;
};

function PostDetailPage({ post, fallback }: Props) {
  const router = useRouter();

  useEffect(() => {
    if (!post) router.push('/not-found');
  }, [router, post]);

  if (!post) return null;

  const date = post.created_at && formatPostDate(post.created_at);

  return (
    <SWRConfig value={{ fallback }}>
      <Head>
        <title>
          {post.title} | by {post.user.name} | {date}
        </title>
      </Head>
      <PostDetailArea />
    </SWRConfig>
  );
}

export default PostDetailPage;
