import { useSession } from 'next-auth/react';
import router from 'next/router';
import React, { ReactNode } from 'react';
import Header2 from '../headers/Header2';

type Props = {
  children: ReactNode;
};

function NewPostLayout({ children }: Props) {
  const { status } = useSession();

  if (status === 'loading') return null;

  if (status === 'unauthenticated') {
    router.push('/');
    return null;
  }

  return (
    <div>
      <Header2 />
      <div className="container max-w-[740px]">{children}</div>
    </div>
  );
}

export default NewPostLayout;
