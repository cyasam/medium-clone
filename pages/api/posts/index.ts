import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { errorHandler } from './../../../utils/errors';
import { serializeData } from '../../../utils';


export const getAllPosts = async (order?: string, excludeUser?: string) => {
  const prisma = new PrismaClient();
  const posts = await prisma.post.findMany({
    where: {
      status: 'published',
      NOT: {
        user: {
          username: excludeUser,
        },
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

  return serializeData(posts)
}

interface ExtendedNextApiRequest extends NextApiRequest {
  query: { order?: string; excludeUser?: string };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      query: { order, excludeUser },
      method,
    } = req;

    switch (method) {
      case 'GET':
        const posts = await getAllPosts(order, excludeUser)

        res.status(200).json(posts);
        break;
      default:
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error: any) {
    return errorHandler(error, res);
  }
}
