import { useSession } from 'next-auth/react';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

function PostEditorLayout({ children }: Props) {
  const { data: session } = useSession();

  if (!session) return null;

  return <main>{children}</main>;
}

export default PostEditorLayout;
