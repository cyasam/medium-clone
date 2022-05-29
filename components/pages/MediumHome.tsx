import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';
import { createPostFetchUrl, fetcher } from '../../utils/api';
import { useSession } from 'next-auth/react';

function MediumHome() {
  const { data: session } = useSession();
  const username = session?.user?.username;
  const postFetchUrl = createPostFetchUrl(username);

  const { data: posts } = useSWR(postFetchUrl, fetcher);

  return (
    <section>
      <div className="main-container">
        <div className="list">
          {posts?.map((post: any) => (
            <div
              key={post.id}
              className="flex items-center pb-8 mb-8 border-b border-stone-300"
            >
              <div className="flex-1">
                <div className="mb-2 font-medium text-[13px]">
                  {post.user.name}
                </div>
                <h4 className="text-xl font-bold">
                  <Link href={`/@${post.user.username}/${post.uuid}`}>
                    <a>{post.title}</a>
                  </Link>
                </h4>
                <p className="mt-1 text-stone-500 text-base line-clamp-2">
                  A lessons I&apos;ve learned from recovering my own footing in
                  life
                </p>
                <div className="mt-2 text-stone-500 text-sm">
                  May 19 · 5 min read ·
                  <Link href="/">
                    <a className="inline-block ml-1 px-2 py-1 text-xs rounded-full bg-stone-100 text-">
                      Self Improvement
                    </a>
                  </Link>
                </div>
              </div>
              <div className="flex-shrink-0 ml-10">
                <Image width={112} height={112} src="/thumb2.jpeg" alt="" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MediumHome;
