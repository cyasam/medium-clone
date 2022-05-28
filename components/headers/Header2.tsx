import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import LogoMini from '../../assets/img/logo-mini.svg';
import UserProfileArea from '../UserProfileArea';
import { PostStatus } from '../../types';


type Props = {
  changed: boolean;
  publishClick: (postStatus: PostStatus) => void;
};

function Header2({ changed, publishClick }: Props) {
  const { data: session } = useSession();

  const { name } = session?.user ?? {
    name: null,
  };

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
            <span className="ml-4">Draft in {name}</span>
          </div>

          <div className="flex items-center">
            <button
              type="button"
              disabled={!changed}
              onClick={() => publishClick('published')}
              className="mr-6 px-3 py-1 h-6 text-xs rounded-full bg-green-700 hover:bg-green-800 text-white disabled:opacity-50"
            >
              Publish
            </button>

            <UserProfileArea menuClassName="right-0 lg:-right-1/2 lg:transform-" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header2;
