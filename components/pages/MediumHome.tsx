import React from 'react';
import useSWR from 'swr';
import { createPostFetchUrl, fetcher } from '../../utils/api';
import { useSession } from 'next-auth/react';
import PostGridElement from '../PostGridElement';

function MediumHome() {
  const { data: session } = useSession();
  const username = session?.user?.username;
  const postFetchUrl = createPostFetchUrl(username);

  const { data: posts, error } = useSWR(postFetchUrl, fetcher);

  return (
    <section>
      <div className="main-container">
        <div className="list">
          {error && <p>{error.message}</p>}
          {posts &&
            posts?.map((post: any) => (
              <PostGridElement
                key={post.id}
                post={post}
                link={`/@${post.user.username}/${post.uuid}`}
              />
            ))}
        </div>
      </div>
    </section>
  );
}

export default MediumHome;
