import React, { useContext } from 'react';
import Logo from '../../assets/img/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { ModalContext } from '../Modal';

function DefaultHeader() {
  const { openModal } = useContext(ModalContext);

  return (
    <>
      <header className="absolute top-0 h-[75px] w-full bg-amber-400 border-b border-black">
        <div className="container flex items-center justify-between h-full">
          <div className="flex-shrink-0 w-[162px] h-[25px]">
            <Link href="/">
              <a className="relative block h-full">
                <Image
                  src={Logo}
                  layout="fill"
                  objectFit="contain"
                  alt="Medium Clone"
                />
              </a>
            </Link>
          </div>

          <nav>
            <ul className="flex items-center">
              <li className="ml-6 hidden md:block">
                <Link href="/">
                  <a>Our story</a>
                </Link>
              </li>
              <li className="ml-6 hidden md:block">
                <Link href="/">
                  <a>Membership</a>
                </Link>
              </li>
              <li className="ml-6 hidden md:block">
                <Link href="/">
                  <a>Write</a>
                </Link>
              </li>
              <li className="ml-6 hidden sm:block">
                <button
                  type="button"
                  onClick={() => {
                    openModal();
                  }}
                >
                  Sign In
                </button>
              </li>
              <li className="ml-6">
                <button
                  type="button"
                  className="px-4 py-2 rounded-full bg-black text-white"
                  onClick={() => {
                    openModal();
                  }}
                >
                  Get Started
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

export default DefaultHeader;
