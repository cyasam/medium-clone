import React from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { createPostFetchUrlByID, fetcher } from '../../utils/api';
import { formatPostDate } from '../../utils';
import EditorHTMLParser from '../html-elements/EditorHTMLParser';
import Image from 'next/image';

function PostDetailArea() {
  const {
    query: { uuid },
  } = useRouter();

  const postFetchUrl = createPostFetchUrlByID(uuid);
  const { data: post } = useSWR(postFetchUrl, fetcher);

  return (
    <section>
      <div className="main-container">
        <div className="list">
          <div className="flex items-center mb-6">
            <div className="mr-4">
              <Image
                className="rounded-full"
                src={post.user.image}
                width="48"
                height="48"
                alt={post.user.name}
              />
            </div>
            <div className="flex-1">
              <div className="text-base">{post.user.name}</div>

              <div className="mt-1 text-stone-500 text-sm">
                {formatPostDate(post.created_at, { day: true, month: true })} ·
                5 min read
              </div>
            </div>
          </div>

          <EditorHTMLParser json={post.body} />
        </div>
      </div>
    </section>
  );
}

export default PostDetailArea;
