import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import LogoMini from '../../assets/img/logo-mini.svg';
import Image from 'next/image';
import Link from 'next/link';
import Avatar from '../Avatar';

type Props = {
  children: React.ReactNode;
};

function MediumLayout({ children }: Props) {
  const { data: session } = useSession();

  const { email, name, image } = session?.user ?? {
    email: null,
    name: null,
    image: null,
  };

  return (
    <div className="wrapper">
      <header className="sticky top-0 flex flex-col justify-between items-center h-screen w-[80px] border-r border-stone-200">
        <div className="py-10 w-full flex justify-center">
          <Link href="/">
            <a className="relative block flex-shrink-0">
              <Image width={43} height={25} src={LogoMini} alt="Medium Clone" />
            </a>
          </Link>
        </div>

        <nav className="flex flex-col items-center">
          <ul>
            <li className="pb-[35px]">
              <Link href="/">
                <a className="">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-label="Home"
                  >
                    <path
                      d="M4.5 10.75v10.5c0 .14.11.25.25.25h5c.14 0 .25-.11.25-.25v-5.5c0-.14.11-.25.25-.25h3.5c.14 0 .25.11.25.25v5.5c0 .14.11.25.25.25h5c.14 0 .25-.11.25-.25v-10.5M22 9l-9.1-6.83a1.5 1.5 0 0 0-1.8 0L2 9"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </a>
              </Link>
            </li>
            <li className="pb-[35px]">
              <Link href="/">
                <a className="">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-label="Notifications"
                  >
                    <path
                      d="M15 18.5a3 3 0 1 1-6 0"
                      stroke="currentColor"
                      strokeLinecap="round"
                    ></path>
                    <path
                      d="M5.5 10.53V9a6.5 6.5 0 0 1 13 0v1.53c0 1.42.56 2.78 1.57 3.79l.03.03c.26.26.4.6.4.97v2.93c0 .14-.11.25-.25.25H3.75a.25.25 0 0 1-.25-.25v-2.93c0-.37.14-.71.4-.97l.03-.03c1-1 1.57-2.37 1.57-3.79z"
                      stroke="currentColor"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </a>
              </Link>
            </li>
            <li className="pb-[35px]">
              <Link href="/">
                <a className="">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-label="Lists"
                  >
                    <path
                      d="M4.5 6.25V21c0 .2.24.32.4.2l5.45-4.09a.25.25 0 0 1 .3 0l5.45 4.09c.16.12.4 0 .4-.2V6.25a.25.25 0 0 0-.25-.25H4.75a.25.25 0 0 0-.25.25z"
                      stroke="currentColor"
                      strokeLinecap="round"
                    ></path>
                    <path
                      d="M8 6V3.25c0-.14.11-.25.25-.25h11.5c.14 0 .25.11.25.25V16.5"
                      stroke="currentColor"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a className="">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-label="Stories"
                  >
                    <path
                      d="M4.75 21.5h14.5c.14 0 .25-.11.25-.25V2.75a.25.25 0 0 0-.25-.25H4.75a.25.25 0 0 0-.25.25v18.5c0 .14.11.25.25.25z"
                      stroke="currentColor"
                    ></path>
                    <path
                      d="M8 8.5h8M8 15.5h5M8 12h8"
                      stroke="currentColor"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                </a>
              </Link>
            </li>
          </ul>

          <hr className="my-[35px] w-6 h-[1px] bg-stone-200" />

          <div className="flex flex-col items-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              aria-label="Write"
            >
              <path
                d="M14 4a.5.5 0 0 0 0-1v1zm7 6a.5.5 0 0 0-1 0h1zm-7-7H4v1h10V3zM3 4v16h1V4H3zm1 17h16v-1H4v1zm17-1V10h-1v10h1zm-1 1a1 1 0 0 0 1-1h-1v1zM3 20a1 1 0 0 0 1 1v-1H3zM4 3a1 1 0 0 0-1 1h1V3z"
                fill="currentColor"
              ></path>
              <path
                d="M17.5 4.5l-8.46 8.46a.25.25 0 0 0-.06.1l-.82 2.47c-.07.2.12.38.31.31l2.47-.82a.25.25 0 0 0 .1-.06L19.5 6.5m-2-2l2.32-2.32c.1-.1.26-.1.36 0l1.64 1.64c.1.1.1.26 0 .36L19.5 6.5m-2-2l2 2"
                stroke="currentColor"
              ></path>
            </svg>
          </div>
        </nav>

        <div className="w-full flex justify-center pt-12 pb-7 group">
          <div className="relative ">
            <div className="w-8 h-8 rounded-full overflow-hidden cursor-pointer">
              <Avatar />
            </div>

            <div className="flex min-w-[260px] w-[min-content] absolute -left-5 bottom-[calc(100%+15px)] shadow shadow-stone-200 border border-stone-300 rounded transition-opacity invisible opacity-0 group-hover:visible group-hover:opacity-100 px-6 py-5 bg-white">
              <div className="mr-4 w-[32px]">
                <Avatar />
              </div>
              <div className="flex-shrink">
                <p className="text-sm">{name}</p>
                <p className="text-xs mt-1 text-stone-500">{email}</p>
                <button
                  className="mt-3 px-2 py-1 text-xs rounded bg-black text-white"
                  onClick={() => signOut()}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="container">{children}</main>
    </div>
  );
}

export default MediumLayout;
