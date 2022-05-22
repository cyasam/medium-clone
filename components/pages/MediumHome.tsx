import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';
import { Api } from '../../utils';

const fetcher = (url: string) => Api.get(url).then((res) => res.data);

function MediumHome() {
  const { data: posts } = useSWR('/posts?order=desc', fetcher);

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
                  {post.users.name}
                  <span className="mx-[2px] text-stone-500">in</span>Better
                  Humans
                </div>
                <h4 className="text-xl font-bold">{post.title}</h4>
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
