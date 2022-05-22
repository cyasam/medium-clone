import { useSession } from 'next-auth/react';
import router from 'next/router';
import React, { ReactNode, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Api } from '../../utils';
import Header2 from '../headers/Header2';

type Props = {
  children: ReactNode;
};

type NewPost = {
  title: string;
  body: string;
} | null;

export const NewPostContext = React.createContext({
  setNewPost: (data: NewPost) => {},
});

function NewPostLayout({ children }: Props) {
  const { data: session, status } = useSession();

  const { email } = session?.user ?? {
    email: null,
  };

  const [newPostData, setNewPostData] = useState<NewPost>(null);

  const createPost = async () => {
    const toastId = toast.loading('Loading...');

    try {
      const {
        data: { post },
      } = await Api.post('/posts', { ...newPostData, user_email: email });

      if (!post) {
        toast.error('Post not added.', {
          id: toastId,
        });
      }

      toast.success('Post added successfully', { id: toastId });

      setTimeout(() => router.push('/'), 2000);
    } catch (err) {
      toast.error('Internal Error', {
        id: toastId,
      });
    }
  };

  const setNewPost = (data: NewPost) => {
    setNewPostData(data);
  };

  if (status === 'loading') return null;

  if (status === 'unauthenticated') {
    router.push('/');
    return null;
  }

  return (
    <NewPostContext.Provider value={{ setNewPost }}>
      <Header2 newPostData={newPostData} createPost={createPost} />
      <div className="container max-w-[740px]">{children}</div>
      <Toaster />
    </NewPostContext.Provider>
  );
}

export default NewPostLayout;
