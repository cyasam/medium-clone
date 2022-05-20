import React from 'react';
import MediumHeader from '../headers/MediumHeader';

type Props = {
  children: React.ReactNode;
};

function MediumLayout({ children }: Props) {
  return (
    <div className="wrapper">
      <MediumHeader />
      <main className="py-10">{children}</main>
    </div>
  );
}

export default MediumLayout;
