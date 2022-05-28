import React from 'react';
import Link from 'next/link';
import { IoTrendingUpSharp } from 'react-icons/io5';
import useSWR from 'swr';
import { createPostFetchUrl, fetcher } from '../utils';
import { Post } from '../types';


function TrendGrid() {
  const postFetchUrl = createPostFetchUrl();
  const { data: posts } = useSWR(postFetchUrl, fetcher);

  return (
    <section className="border-b border-stone-200">
      <div className="container py-10">
        <p className="flex items-center mb-6 font-medium text-sm">
          <span className="inline-flex -mt-[1px] mr-3 p-[1px] rounded-full border border-gray-700">
            <IoTrendingUpSharp className=" text-base" />
          </span>
          TRENDING ON MEDIUM
        </p>
        <div className="grid grid-cols-2 gap-6">
          {!posts && <p>Loading...</p>}
          {posts?.map((post: Post, index: number) => {
            const postNumber = index < 10 ? `0${index + 1}` : index + 1;
            const { username } = post.user;

            return (
              <div key={post.id} className="flex">
                <div className="mr-5 text-stone-200 text-[30px] leading-none font-bold">
                  <p className="-mt-1">{postNumber}</p>
                </div>
                <div>
                  <div className="mb-2 font-medium text-[13px]">
                    {post?.user?.name}
                  </div>
                  <h4 className="text-base font-bold">
                    <Link href={`/@${username}/${post.uuid}`}>
                      <a>{post.title}</a>
                    </Link>
                  </h4>
                  <p className="mt-2 text-stone-500 text-sm">
                    May 11 · 7 min read
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default TrendGrid;
