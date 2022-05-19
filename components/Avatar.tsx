import React from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/adventurer';

function Avatar() {
  const { data: session } = useSession();

  const { name, image } = session?.user ?? {
    name: null,
    image: null,
  };

  if (image) {
    return (
      <div className="inline-flex bg-gray-300 rounded-full overflow-hidden">
        <Image src={image} width="32" height="32" alt={name ?? 'user'} />
      </div>
    );
  }

  const AvatarSVG = createAvatar(style, {
    seed: name ?? '',
  });

  return (
    <div
      className="inline-flex bg-gray-300 rounded-full overflow-hidden"
      dangerouslySetInnerHTML={{ __html: AvatarSVG }}
    />
  );
}

export default Avatar;
