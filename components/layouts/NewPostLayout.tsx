import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { ReactNode, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import NewPost from '../../pages/new-post';
import { PostStatus } from '../../types';
import { Api } from '../../utils/api';
import Header2 from '../headers/Header2';
import ProtectedPages from '../pages/ProtectedPages';

type Props = {
  children: ReactNode;
};

export type NewPost = {
  title: string | undefined;
  body: string | undefined;
};

export type DraftPost = {
  title_changes: string | undefined;
  body_changes: string | undefined;
};

export const NewPostContext = React.createContext({
  onChanged: (data: NewPost, postStatus: PostStatus) => {},
});

function NewPostLayout({ children }: Props) {
  const { data: session } = useSession();
  const router = useRouter();

  const { username } = session?.user ?? {
    username: null,
  };

  const [postData, setPostData] = useState<NewPost | null>(null);
  const [changed, setChanged] = useState<boolean>(false);

  const createDraft = async (newPostData: NewPost) => {
    const toastId = toast.loading('Loading...');

    try {
      const { data: post } = await Api.post(`/api/${username}/drafts`, {
        ...newPostData,
        username,
        status: 'draft',
      });

      if (!post) {
        toast.error('Draft not created.', {
          id: toastId,
        });
      }

      toast.success('Draft created.', { id: toastId });
      router.push(`/p/${post.uuid}/edit`);
    } catch (err) {
      toast.error('Internal Error', {
        id: toastId,
      });
    }
  };

  const updateDraft = async (uuid: unknown, newPostData: NewPost) => {
    const toastId = toast.loading('Loading...');

    try {
      const { data: post } = await Api.put(`/api/${username}/${uuid}`, {
        ...newPostData,
        status: 'draft',
      });

      if (!post) {
        toast.error('Draft not updated.', {
          id: toastId,
        });
      }

      toast.success('Draft updated.', { id: toastId });
    } catch (err) {
      toast.error('Internal Error', {
        id: toastId,
      });
    }
  };

  const createPost = async (newPostData: NewPost) => {
    const toastId = toast.loading('Loading...');

    try {
      const { data: post } = await Api.put(`/api/${username}/posts`, {
        ...newPostData,
        username,
        status: 'published',
      });

      if (!post) {
        toast.error('Post not added.', {
          id: toastId,
        });
      }

      toast.success('Post added successfully', { id: toastId });
      setTimeout(() => router.push('/'), 1500);
    } catch (err) {
      toast.error('Internal Error', {
        id: toastId,
      });
    }
  };

  const updatePost = async (
    uuid: unknown,
    newPostData: NewPost | DraftPost
  ) => {
    if (!newPostData) return;

    const toastId = toast.loading('Loading...');

    const isPublishedDraft = Object.keys(newPostData).find(
      (key) => key === 'title_changes'
    );
    const text = isPublishedDraft ? 'Draft' : 'Post';

    try {
      const { data: post } = await Api.put(`/api/${username}/${uuid}`, {
        ...newPostData,
        status: 'published',
      });

      if (!post) {
        toast.error(`${text} not updated.`, {
          id: toastId,
        });
      }

      toast.success(`${text} updated.`, { id: toastId });

      if (!isPublishedDraft) setTimeout(() => router.push('/'), 1500);
    } catch (err) {
      toast.error('Internal Error', {
        id: toastId,
      });
    }
  };

  const onChanged = (postData: NewPost, postStatus: PostStatus) => {
    if (!postData) return false;

    const { uuid } = router.query;

    if (postStatus === 'draft') {
      uuid ? updateDraft(uuid, postData) : createDraft(postData);
    } else if (postStatus === 'published') {
      const newPostData = {
        title_changes: postData?.title,
        body_changes: postData?.body,
      };
      updatePost(uuid, newPostData);
    }

    setPostData(postData);
    setChanged(true);
  };

  const publishClick = (postStatus: PostStatus) => {
    if (!postData) return false;

    const { uuid } = router.query;

    if (postStatus === 'published') {
      updatePost(uuid, postData);
    } else if (postStatus === 'draft') {
      createPost(postData);
    }
  };

  return (
    <ProtectedPages redirect={true}>
      <NewPostContext.Provider value={{ onChanged }}>
        <Header2 changed={changed} publishClick={publishClick} />
        <div className="container">{children}</div>
        <Toaster />
      </NewPostContext.Provider>
    </ProtectedPages>
  );
}

export default NewPostLayout;
