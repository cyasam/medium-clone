import { ReactNode } from 'react';
import HomeLayout from '../components/layouts/HomeLayout';
import DefaultHome from '../components/pages/DefaultHome';
import MediumHome from '../components/pages/MediumHome';
import ProtectedPages from '../components/pages/ProtectedPages';

function Home() {
  return (
    <ProtectedPages fallback={<DefaultHome />}>
      <MediumHome />
    </ProtectedPages>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <HomeLayout>{page}</HomeLayout>;
};

export default Home;
