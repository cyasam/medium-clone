import { useSession } from 'next-auth/react';
import React from 'react';
import DefaultHeader from '../headers/DefaultHeader';
import PageLoader from '../PageLoader';
import Layout from './Layout';

type Props = {
  children: React.ReactNode;
};

function HomeLayout({ children }: Props) {
  const { status } = useSession();

  if (status === 'loading') return <PageLoader />;

  if (status === 'authenticated') return <Layout>{children}</Layout>;

  return (
    <>
      <DefaultHeader />
      <main className="pt-[75px]">{children}</main>
    </>
  );
}

export default HomeLayout;
