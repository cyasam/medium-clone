import React from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

function Avatar() {
  const { data: session } = useSession();

  const name = session?.user?.name;
  const image = session?.user?.image;

  return (
    <div className="inline-flex bg-gray-300 rounded-full overflow-hidden">
      {image && (
        <Image src={image} width="32" height="32" alt={name ?? 'user'} />
      )}
    </div>
  );
}

export default Avatar;
