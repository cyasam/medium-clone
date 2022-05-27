import { PrismaClient } from '@prisma/client';
import { errorHandler } from './../../../utils/errors';
import { serializeData } from '../../../utils';

const prisma = new PrismaClient();

export default async function postHandler(req: any, res: any) {
  try {
    const {
      query: { order, excludeUser },
      method,
    } = req;

    switch (method) {
      case 'GET':
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

        res.status(200).json(serializeData(posts));
        break;
      default:
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error: any) {
    return errorHandler(error, res);
  }
}
