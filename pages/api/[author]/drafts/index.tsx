import { PrismaClient } from '@prisma/client';
import { serializeData } from '../../../../utils';
import { errorHandler } from '../../../../utils/errors';
import { authMiddleware } from '../../../../utils/middlewares';

const prisma = new PrismaClient();

export default async function postHandler(req: any, res: any) {
  try {
    await authMiddleware(req, res);

    const {
      query: { order, author },
      method,
    } = req;

    switch (method) {
      case 'GET':
        const posts = await prisma.post.findMany({
          where: {
            status: 'draft',
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
