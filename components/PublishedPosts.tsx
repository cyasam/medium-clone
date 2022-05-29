import React from 'react';
import useSWR from 'swr';
import { createAuthorPostsFetchUrl, fetcher } from '../utils/api';

import PostGridElement from './PostGridElement';
import { Post } from '../types';
import { useRouter } from 'next/router';

export const getUsername = (value: string) => value && value.replace('@', '');

type Props = {
  author: string;
  pageType?: string;
};

function PublishedPosts({ author, pageType }: Props) {
  const username = getUsername(author as string);
  const postFetchUrl = createAuthorPostsFetchUrl(username);

  const { data: posts, error } = useSWR(postFetchUrl, fetcher);

  if (!posts && !error) return <p>Loading...</p>;

  return (
    <div className="list">
      {posts && posts.length === 0 && <p>You don`t have any drafts.</p>}
      {posts?.map((post: Post) => {
        let link = `/@${post.user.username}/${post.uuid}`;

        if (pageType === 'edit') {
          link = `/p/${post.uuid}/edit`;
        }

        return <PostGridElement key={post.id} post={post} link={link} />;
      })}
    </div>
  );
}

export default PublishedPosts;
