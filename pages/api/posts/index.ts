import { PrismaClient } from '@prisma/client';
import { serializeData } from '../../../utils';

const prisma = new PrismaClient();

export default async function postHandler(req: any, res: any) {
  const {
    query: { order },
    body: { title, body, user_email },
    method,
  } = req;

  switch (method) {
    case 'GET':
      const posts = await prisma.posts.findMany({
        orderBy: {
          created_at: order === 'desc' ? 'desc' : 'asc',
        },
        select: {
          id: true,
          title: true,
          body: true,
          created_at: true,
          users: true,
        },
      });
      prisma.$disconnect();

      res.status(200).json(serializeData(posts));
      break;
    case 'POST':
      if (!user_email)
        return res.status(401).json({ message: 'user_email not provided' });

      const existingUser = await prisma.users.findUnique({
        where: {
          email: user_email,
        },
      });

      if (!existingUser)
        return res.status(404).json({ message: 'User not found' });

      const post = await prisma.posts.create({
        data: { title, body, user_id: existingUser.id },
      });
      prisma.$disconnect();

      res.status(200).json(serializeData(post));
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
