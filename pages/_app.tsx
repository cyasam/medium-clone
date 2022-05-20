import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Layout from '../components/layouts/Layout';
import SignIn from '../components/SignIn';
import Modal, { ModalProvider } from '../components/Modal';

import type { Page } from '../types/page';

type Props = AppProps & {
  Component: Page;
};

function MyApp({ Component, pageProps: { session, ...pageProps } }: Props) {
  const getLayout =
    Component.getLayout || ((page: React.ReactNode) => <Layout>{page}</Layout>);

  return (
    <SessionProvider session={session}>
      <ModalProvider>
        {getLayout(<Component {...pageProps} />)}
        <Modal>
          <SignIn />
        </Modal>
      </ModalProvider>
    </SessionProvider>
  );
}

export default MyApp;
