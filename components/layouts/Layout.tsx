import React from 'react';
import { useSession } from 'next-auth/react';
import { ClockLoader } from 'react-spinners';

import MediumHeader from '../headers/MediumHeader';

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  const { status } = useSession();

  if (status === 'loading')
    return (
      <div className="w-screen h-screen flex justify-center items-center flex-col">
        <ClockLoader loading={true} size="250px" />
        <p className="mt-5 text-2xl">Please Wait...</p>
      </div>
    );

  return (
    <div className="wrapper">
      <MediumHeader />
      <main className="py-10">{children}</main>
    </div>
  );
}

export default Layout;
