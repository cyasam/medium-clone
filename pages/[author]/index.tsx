import { useRouter } from 'next/router';
import React from 'react';
import { SWRConfig } from 'swr';
import PublishedPosts, { getUsername } from '../../components/PublishedPosts';
import { createAuthorPostsFetchUrl } from '../../utils/api';
import { getAllAuthorPosts } from '../api/[author]/posts';

export async function getServerSideProps(context: any) {
  const { author } = context.params;

  const username = getUsername(author as string);
  const postFetchUrl = createAuthorPostsFetchUrl(username);
  const posts = await getAllAuthorPosts(username, 'desc');

  return {
    props: {
      posts,
      fallback: {
        [postFetchUrl]: posts,
      },
    },
  };
}

type Props = {
  fallback: any;
};

function AuthorPostListPage({ fallback }: Props) {
  const {
    query: { author },
  } = useRouter();

  return (
    <SWRConfig value={{ fallback }}>
      <div className="main-container">
        <PublishedPosts author={author as string} />
      </div>
    </SWRConfig>
  );
}

export default AuthorPostListPage;
