import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { PrismaClient } from '@prisma/client';
import { serializeData } from '../../../utils';

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

      const newUser = await prisma.users.create({
        data: { name: user.name, email: user?.email },
      });

      if (!newUser) return false;

      return true;
    },
  },
});
