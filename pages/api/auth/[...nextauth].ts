import { v4 as uuidv4 } from 'uuid';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-initials-sprites';

import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';

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
  } catch (error) {
    console.log(error);
  }
};

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: <string>process.env.GOOGLE_CLIENT_ID,
      clientSecret: <string>process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user?.email) return false;

      const existingUser = await prisma.users.findUnique({
        where: {
          email: user?.email,
        },
      });

      if (existingUser) return true;

      let avatarUrl = await uploadAvatarImage(user);

      const newUser = await prisma.users.create({
        data: { name: user.name, email: user?.email, avatar: avatarUrl },
      });

      if (!newUser) return false;

      return true;
    },
    async session({ session }) {
      const existingUser = await prisma.users.findUnique({
        where: {
          email: session?.user?.email ?? undefined,
        },
      });

      if (!existingUser) return session;

      if (session && session.user) {
        session.user.image = existingUser.avatar;
      }

      return session;
    },
  },
});
