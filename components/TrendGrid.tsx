import React from 'react';
import Link from 'next/link';
import { IoTrendingUpSharp } from 'react-icons/io5';
import useSWR from 'swr';
import { createPostFetchUrl, fetcher } from '../utils/api';
import { Post } from '../types';
import { formatPostDate } from '../utils';
import Avatar from './Avatar';

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!posts && <p>Loading...</p>}
          {posts?.map((post: Post, index: number) => {
            const postNumber = index < 10 ? `0${index + 1}` : index + 1;
            const { username } = post.user;
            const postDate = formatPostDate(post?.created_at, {
              day: true,
              month: true,
            });

            return (
              <div key={post.id} className="flex">
                <div className="mr-5 text-stone-200 text-[30px] leading-none font-bold">
                  <p className="-mt-1">{postNumber}</p>
                </div>
                <div>
                  {post?.user && (
                    <Link href={`/@${post.user.username}`}>
                      <a className="flex items-center mb-2 font-medium text-[13px]">
                        {post?.user?.image && (
                          <div className="inline-flex mr-2">
                            <Avatar
                              src={post?.user?.image}
                              alt={post?.user?.name}
                              size="24"
                            />
                          </div>
                        )}
                        <span>{post?.user?.name}</span>
                      </a>
                    </Link>
                  )}
                  <h4 className="text-base font-bold">
                    <Link href={`/@${username}/${post.uuid}`}>
                      <a>{post.title}</a>
                    </Link>
                  </h4>
                  <p className="mt-2 text-stone-500 text-sm">{postDate}</p>
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
