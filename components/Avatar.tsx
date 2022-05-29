import React from 'react';
import Image from 'next/image';

type Props = {
  src: string;
  alt?: string | null;
  size?: string | number;
};

function Avatar({ src, alt, size }: Props) {
  return (
    <div className="inline-flex bg-gray-300 rounded-full overflow-hidden">
      {src && (
        <Image
          src={src}
          width={size ?? '24'}
          height={size ?? '24'}
          alt={alt ?? ''}
        />
      )}
    </div>
  );
}

export default Avatar;
