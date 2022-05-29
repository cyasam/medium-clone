import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { serializeData } from '../../../../utils/api';
import { errorHandler } from '../../../../utils/errors';
import { authMiddleware } from '../../../../utils/middlewares';

interface ExtendedNextApiRequest extends NextApiRequest {
  query: { order?: string; author: string };
  body: {
    title: string;
    body: string;
    status: string;
  };
}

const prisma = new PrismaClient();

export const getAllAuthorPosts = async (author: string, order?: string) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        status: 'published',
        user: {
          username: author,
        },
      },
      orderBy: {
        created_at: order === 'desc' ? 'desc' : 'asc',
      },
      select: {
        id: true,
        title: true,
        body: true,
        created_at: true,
        user: true,
        uuid: true,
        status: true,
      },
    });
    prisma.$disconnect();

    return serializeData(posts);
  } catch (error) {
    return null;
  }
};

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      query: { order, author },
      body: { title, body, status },
      method,
    } = req;

    switch (method) {
      case 'GET':
        const posts = await getAllAuthorPosts(author, order);

        res.status(200).json(posts);
        break;
      case 'POST':
        await authMiddleware(req);

        if (!author)
          return res.status(401).json({ message: 'author not provided' });

        const existingUser = await prisma.user.findUnique({
          where: {
            username: author,
          },
        });

        if (!existingUser)
          return res.status(404).json({ message: 'User not found' });

        const post = await prisma.post.create({
          data: { title, body, userId: existingUser.id, status },
        });
        prisma.$disconnect();

        res.status(200).json(serializeData(post));
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error: any) {
    return errorHandler(error, res);
  }
}
