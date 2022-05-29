import { useSession } from 'next-auth/react';
import React from 'react';
import PublishedPosts from '../../PublishedPosts';

function PublishedHome() {
  const { data: session } = useSession();

  const username = session?.user.username;

  return <PublishedPosts author={username} pageType="edit" />;
}

export default PublishedHome;
