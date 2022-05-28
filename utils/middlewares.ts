import { NextApiRequest } from 'next';
import { getSession } from 'next-auth/react';
import { AuthenticationError } from '../utils/errors';

export const authMiddleware = async (req: NextApiRequest) => {
  const session = await getSession({ req });

  if (!session) {
    throw new AuthenticationError('not authenticated.');
  }

  return session;
};
