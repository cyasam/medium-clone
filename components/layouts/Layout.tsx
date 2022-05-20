import React from 'react';
import { useSession } from 'next-auth/react';
import { ClockLoader } from 'react-spinners';
import MediumLayout from './MediumLayout';
import HomeLayout from './HomeLayout';

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

  if (status === 'authenticated') {
    return <MediumLayout>{children}</MediumLayout>;
  }

  return <HomeLayout>{children}</HomeLayout>;
}

export default Layout;
