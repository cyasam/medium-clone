import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { ReactNode } from 'react';
import { SWRConfig } from 'swr';
import HomeLayout from '../components/layouts/HomeLayout';
import DefaultHome from '../components/pages/DefaultHome';
import MediumHome from '../components/pages/MediumHome';
import ProtectedPages from '../components/pages/ProtectedPages';
import { createPostFetchUrl } from '../utils/api';
import { getAllPosts } from './api/posts';

export async function getServerSideProps(context: any) {
  const postFetchUrl = createPostFetchUrl();
  const posts = await getAllPosts('desc');

  return {
    props: {
      session: await getSession(context),
      fallback: {
        [postFetchUrl]: posts,
      },
    },
  };
}

type Props = {
  fallback: any;
};

function Home({ fallback }: Props) {
  return (
    <SWRConfig value={{ fallback }}>
      <Head>
        <title>Medium Clone</title>
        <meta name="description" content="Write your stories..." />
      </Head>
      <ProtectedPages fallback={<DefaultHome />}>
        <MediumHome />
      </ProtectedPages>
    </SWRConfig>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <HomeLayout>{page}</HomeLayout>;
};

export default Home;
