import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import LogoMini from '../../assets/img/logo-mini.svg';
import UserProfileArea from '../UserProfileArea';

function Header2() {
  const { data: session, status } = useSession();

  const { email, name, image } = session?.user ?? {
    email: null,
    name: null,
    image: null,
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
            {status === 'authenticated' && (
              <span className="ml-4">Draft in {name}</span>
            )}
          </div>

          <UserProfileArea />
        </div>
      </div>
    </header>
  );
}

export default Header2;
