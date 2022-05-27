import { PrismaClient } from '@prisma/client';
import { serializeData } from '../../../utils';

const prisma = new PrismaClient();

export default async function postHandler(req: any, res: any) {
  try {
    const {
      query: { order, excludeUser, postStatus },
      body: { title, body, username, status },
      method,
    } = req;

    switch (method) {
      case 'GET':
        const posts = await prisma.post.findMany({
          where: {
            status: postStatus ?? 'published',
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
      case 'POST':
        if (!username)
          return res.status(401).json({ message: 'user_email not provided' });

        const existingUser = await prisma.user.findUnique({
          where: {
            username,
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
  } catch (err) {
    console.log(err);
  }
}
