import { PrismaClient } from '@prisma/client';
import { serializeData } from '../../../utils';
import { errorHandler } from '../../../utils/errors';

const prisma = new PrismaClient();

export default async function postHandler(req: any, res: any) {
  try {
    const {
      query: { uuid },
      method,
    } = req;

    switch (method) {
      case 'GET':
        const post = await prisma.post.findUnique({
          where: {
            uuid,
          },
          select: {
            id: true,
            title: true,
            body: true,
            created_at: true,
            user: true,
            uuid: true,
          },
        });
        prisma.$disconnect();

        res.status(200).json(serializeData(post));
        break;

      default:
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error: any) {
    return errorHandler(error, res);
  }
}
