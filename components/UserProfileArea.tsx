import React, { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Avatar from './Avatar';

type Props = {
  menuClassName?: string;
};

function UserProfileArea({ menuClassName }: Props) {
  const [openMenu, setOpenMenu] = useState(false);
  const { data: session } = useSession();

  const { email, name } = session?.user ?? {
    email: null,
    name: null,
  };

  return (
    <div className="flex justify-center">
      <div className="relative ">
        <div
          className="w-8 h-8 rounded-full overflow-hidden cursor-pointer"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <Avatar />
        </div>

        {openMenu && (
          <div
            className={`absolute ${
              menuClassName ??
              'top-[calc(100%+15px)] lg:left-1/2 lg:-translate-x-1/2'
            } flex min-w-[260px] w-[min-content] shadow shadow-stone-200 border border-stone-300 rounded px-6 py-5 bg-white`}
          >
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
        )}
      </div>
    </div>
  );
}

export default UserProfileArea;
