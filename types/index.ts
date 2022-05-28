import { User } from '@prisma/client';

export type PostStatus = 'draft' | 'published';

export type Post = {
  id: string;
  title: string | null;
  body: string | null;
  created_at: Date | null;
  userId: string;
  modified_at: Date | null;
  title_changes: string | null;
  body_changes: string | null;
  uuid: string;
  status: PostStatus;
  user: User;
};
