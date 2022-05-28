import { NextApiResponse } from 'next';
export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export const errorHandler = (error: any, res: NextApiResponse) => {
  if (error instanceof AuthenticationError) {
    return res.status(401).json({ message: error.message });
  }

  if (error.response) {
    return res.status(error.response.status).json(error.response.data);
  }

  return res
    .status(500)
    .json(process.env.NODE_ENV !== 'production' && { message: error.message });
};
