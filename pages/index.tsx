import { useSession } from 'next-auth/react';
import DefaultHome from '../components/pages/DefaultHome';
import SessionHome from '../components/pages/MediumHome';

function Home() {
  const { data: session } = useSession();

  return <>{session ? <SessionHome /> : <DefaultHome />}</>;
}

export default Home;
