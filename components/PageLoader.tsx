import React from 'react';
import { ClockLoader } from 'react-spinners';

function PageLoader() {
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col">
      <ClockLoader loading={true} size="250px" />
      <p className="mt-5 text-2xl">Please Wait...</p>
    </div>
  );
}

export default PageLoader;
