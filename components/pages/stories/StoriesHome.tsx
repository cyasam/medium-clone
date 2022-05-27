import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

function StoriesHome({ children }: Props) {
  const router = useRouter();

  const activeClassname = 'border-b pb-4 -mb-[1px] border-black text-black';

  return (
    <main className="container">
      <div className="flex mb-5 border-b border-stone-200 text-stone-500 text-base leading-none">
        <div
          className={classNames('block mr-7', {
            [activeClassname]: router.pathname.includes('drafts'),
          })}
        >
          <Link href="drafts">Drafts</Link>
        </div>
        <div
          className={classNames('block', {
            [activeClassname]: router.pathname.includes('public'),
          })}
        >
          <Link href="public">Published</Link>
        </div>
      </div>
      <div>{children}</div>
    </main>
  );
}

export default StoriesHome;
