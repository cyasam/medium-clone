import React, { MouseEventHandler } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import LogoMini from '../../assets/img/logo-mini.svg';
import UserProfileArea from '../UserProfileArea';

type Props = {
  newPostData: any;
  createPost: MouseEventHandler;
};

function Header2({ newPostData, createPost }: Props) {
  const { data: session, status } = useSession();

  const { name } = session?.user ?? {
    name: null,
  };

  console.log(session);

  return (
    <header className="h-[65px] w-full">
      <div className="container max-w-[1072px] flex items-center h-full">
        <div className="w-full flex justify-between">
          <div className="inline-flex items-center">
            <Link href="/">
              <a className="flex flex-shrink-0">
                <Image
                  width={43}
                  height={25}
                  src={LogoMini}
                  alt="Medium Clone"
                />
              </a>
            </Link>
            {status === 'authenticated' && (
              <span className="ml-4">Draft in {name}</span>
            )}
          </div>

          <div className="flex items-center">
            <button
              type="button"
              disabled={
                newPostData?.title?.length === 0 ||
                newPostData?.body?.length === 0
              }
              onClick={createPost}
              className="mr-6 px-3 py-1 h-6 text-xs rounded-full bg-green-700 hover:bg-green-800 text-white disabled:opacity-50"
            >
              Publish
            </button>

            <UserProfileArea />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header2;
