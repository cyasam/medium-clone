import React from 'react';
import { useSession } from 'next-auth/react';
import PageLoader from '../PageLoader';
import MediumHeader from '../headers/MediumHeader';

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  const { status } = useSession();

  if (status === 'loading') return <PageLoader />;

  return (
    <div className="wrapper">
      <MediumHeader />
      <main className="py-10">{children}</main>
    </div>
  );
}

export default Layout;
