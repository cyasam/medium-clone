import React from 'react';
import DefaultHeader from '../headers/DefaultHeader';

type Props = {
  children: React.ReactNode;
};

function HomeLayout({ children }: Props) {
  return (
    <>
      <DefaultHeader />
      <main className="pt-[75px]">{children}</main>
    </>
  );
}

export default HomeLayout;
