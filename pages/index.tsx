import { ReactNode } from 'react';
import { SWRConfig } from 'swr';
import HomeLayout from '../components/layouts/HomeLayout';
import DefaultHome from '../components/pages/DefaultHome';
import MediumHome from '../components/pages/MediumHome';
import ProtectedPages from '../components/pages/ProtectedPages';
import { createPostFetchUrl } from '../utils';
import { getAllPosts } from './api/posts';

export async function getServerSideProps(){
  const postFetchUrl = createPostFetchUrl();
  const posts = await getAllPosts()

  return {props: {
    fallback: {
      [postFetchUrl]: posts
    }
  }}
}

type Props = {
  fallback: any
}

function Home({fallback}: Props) {
  return (
    <SWRConfig value={{ fallback }}>
    <ProtectedPages fallback={<DefaultHome  />}>
      <MediumHome />
    </ProtectedPages></SWRConfig>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <HomeLayout>{page}</HomeLayout>;
};

export default Home;
