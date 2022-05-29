import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Post } from '../types';
import { findH2Text, formatPostDate } from '../utils';
import Avatar from './Avatar';

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
        <div className="flex items-center mb-2">
          <Link href={`/@${post.user.username}`}>
            <a className="flex items-center text-stone-800 text-sm">
              {post.user.image && (
                <div className="flex mr-2">
                  <Avatar
                    src={post.user.image}
                    alt={post.user.name}
                    size="24"
                  />
                </div>
              )}
              {post.user.name}
            </a>
          </Link>

          <div className="ml-1 text-stone-500 text-sm">
            <span className="mr-1">·</span>
            {date}
          </div>
        </div>
        <h4 className="text-xl font-bold">
          <Link href={link}>
            {post.title ? <a>{post.title}</a> : 'Untitled Post'}
          </Link>
        </h4>
        <p className="mt-1 text-stone-500 text-base line-clamp-2">{h2Text}</p>
      </div>
      <div className="flex-shrink-0 ml-10">
        <Image width={112} height={112} src="/thumb2.jpeg" alt="" />
      </div>
    </div>
  );
}

export default PostGridElement;
