import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { ReactElement, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  fallback?: ReactElement;
};

function ProtectedPages({ children, fallback }: Props) {
  const { status } = useSession();
  const router = useRouter();

  if (status === 'loading') return null;

  if (status === 'unauthenticated') {
    if (fallback) return fallback;

    router.push('/');
    return null;
  }

  return <>{children}</>;
}

export default ProtectedPages;
