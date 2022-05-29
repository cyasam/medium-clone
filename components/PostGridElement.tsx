import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Post } from '../types';
import { findH2Text, formatPostDate } from '../utils';

type Props = {
  link: string;
  post: Post;
};

function PostGridElement({ post, link }: Props) {
  const h2Text = findH2Text(post.body);
  const date =
    post.created_at &&
    formatPostDate(post.created_at, { day: true, month: true });

  return (
    <div
      key={post.id}
      className="flex items-center pb-8 mb-8 border-b border-stone-300"
    >
      <div className="flex-1">
        <div className="mb-2 font-medium text-[13px]">{post.user.name}</div>
        <h4 className="text-xl font-bold">
          <Link href={link}>
            <a>{post.title}</a>
          </Link>
        </h4>
        <p className="mt-1 text-stone-500 text-base line-clamp-2">{h2Text}</p>
        <div className="mt-2 text-stone-500 text-sm">{date}</div>
      </div>
      <div className="flex-shrink-0 ml-10">
        <Image width={112} height={112} src="/thumb2.jpeg" alt="" />
      </div>
    </div>
  );
}

export default PostGridElement;
