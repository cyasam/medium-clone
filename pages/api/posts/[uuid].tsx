import { PrismaClient } from '@prisma/client';
import { serializeData } from '../../../utils';

const prisma = new PrismaClient();

export default async function postHandler(req: any, res: any) {
  const {
    query: { uuid },
    body: { title, body, body_changes, title_changes },
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
          title_changes: true,
          body_changes: true,
          created_at: true,
          user: true,
          uuid: true,
          status: true,
        },
      });
      prisma.$disconnect();

      res.status(200).json(serializeData(post));
      break;
    case 'PUT':
      const editedPost = await prisma.post.update({
        where: {
          uuid,
        },
        data: {
          title,
          title_changes,
          body_changes,
          body,
        },
        select: {
          id: true,
          title: true,
          body: true,
          title_changes: true,
          body_changes: true,
          created_at: true,
          user: true,
          uuid: true,
          status: true,
        },
      });
      prisma.$disconnect();

      res.status(200).json(serializeData(editedPost));
      break;
    default:
      res.setHeader('Allow', ['GET, PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
