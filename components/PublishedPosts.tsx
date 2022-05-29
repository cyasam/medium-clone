import React from 'react';
import useSWR from 'swr';
import { createAuthorPostsFetchUrl, fetcher } from '../utils/api';
import { useSession } from 'next-auth/react';

import PostGridElement from './PostGridElement';
import { Post } from '../types';

function PublishedPosts() {
  const { data: session } = useSession();
  const username = session?.user?.username;
  const postFetchUrl = createAuthorPostsFetchUrl(username);

  const { data: posts, error } = useSWR(postFetchUrl, fetcher);

  if (!posts && !error) return <p>Loading...</p>;

  return (
    <div className="list">
      {posts && posts.length === 0 && <p>You don`t have any drafts.</p>}
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

export default PublishedPosts;
