import React from 'react';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import { createAuthorPostsFetchUrl, fetcher } from '../utils/api';

import { Post } from '../types';
import PostGridElement from './PostGridElement';

function DraftPosts() {
  const { data: session } = useSession();
  const username = session?.user?.username;
  const postFetchUrl = createAuthorPostsFetchUrl(username, 'draft');

  const { data: posts, error } = useSWR(postFetchUrl, fetcher);

  if (!posts && !error) return <p>Loading...</p>;

  return (
    <div className="list">
      {posts.length === 0 && <p>You don`t have any drafts.</p>}
      {posts?.map((post: Post) => (
        <PostGridElement
          key={post.id}
          post={post}
          link={`/p/${post.uuid}/edit`}
        />
      ))}
    </div>
  );
}

export default DraftPosts;
