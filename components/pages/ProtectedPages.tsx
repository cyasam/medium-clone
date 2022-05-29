import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { ReactElement, ReactNode, useEffect } from 'react';

type Props = {
  redirect?: boolean;
  children: ReactNode;
  fallback?: ReactElement;
};

function ProtectedPages({ children, fallback, redirect }: Props) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect && router.push('/');
    }
  }, [status, router, redirect]);

  if (status === 'loading') return null;

  if (status === 'unauthenticated') {
    if (fallback) return fallback;

    return null;
  }

  return <>{children}</>;
}

export default ProtectedPages;
