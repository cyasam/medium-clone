import { User } from '@prisma/client';

export type PostStatus = 'draft' | 'published';

export type Post = {
  id: string;
  title: string | null;
  body: string | null;
  created_at: string | null;
  userId: string;
  modified_at: string | null;
  title_changes: string | null;
  body_changes: string | null;
  uuid: string;
  status: PostStatus;
  user: User;
};
