import { useRouter } from 'next/router';
import React from 'react';

function PostDetailPage() {
  const {
    query: { author, uuid },
  } = useRouter();
  return (
    <div>
      {author} , {uuid}
    </div>
  );
}

export default PostDetailPage;
