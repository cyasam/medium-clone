import { v4 as uuidv4 } from 'uuid';
import NextAuth, { User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-initials-sprites';

import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { createClient } from '@supabase/supabase-js';

const prisma = new PrismaClient();

const supabase = createClient(
  <string>process.env.SUPABASE_URL,
  <string>process.env.SUPABASE_PUBLICKEY
);

const uploadAvatarImage = async (user: any) => {
  try {
    const { image, name } = user;

    let fileExtension = null;
    let avatarImage = null;
    let mimetype = 'image/svg+xml';

    if (image) {
      const response = await fetch(image);
      avatarImage = await response.blob();
      mimetype = avatarImage.type;

      if (mimetype === 'image/jpeg') {
        fileExtension = '.jpg';
      } else if (mimetype === 'image/png') {
        fileExtension = '.png';
      }
    } else {
      avatarImage = createAvatar(style, {
        seed: name,
      });
    }

    const avatarFileName = `${uuidv4()}${fileExtension ?? '.svg'}`;
    const avatarFileUrl = `public/${avatarFileName}`;

    const { error } = await supabase.storage
      .from('avatars')
      .upload(avatarFileUrl, avatarImage, {
        cacheControl: '3600',
        upsert: false,
        contentType: mimetype,
      });

    if (error) return null;

    const { publicURL, error: error2 } = supabase.storage
      .from('avatars')
      .getPublicUrl(avatarFileUrl);

    if (error2) return null;

    return publicURL;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: <string>process.env.GOOGLE_CLIENT_ID,
      clientSecret: <string>process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  events: {
    async createUser({ user }: { user: User }) {
      try {
        const avatarUrl = await uploadAvatarImage(user);
        const usernameMatchArray = user.email?.match(/^.*(?=@)/g);
        const username = usernameMatchArray ? usernameMatchArray[0] : uuidv4();

        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            username,
            image: avatarUrl,
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
  callbacks: {
    async session({ session }) {
      const existingUser = await prisma.user.findUnique({
        where: {
          email: session?.user?.email ?? undefined,
        },
      });

      return {
        ...session,
        user: {
          ...session.user,
          username: existingUser?.username,
          image: existingUser?.image,
        },
      };
    },
  },
});
