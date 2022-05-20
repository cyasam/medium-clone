import React, { useContext } from 'react';
import Image from 'next/image';
import { ModalContext } from '../Modal';
import AnimatedM from '../../assets/img/animated-m.svg';

import TrendGrid from '../TrendGrid';
import TrendList from '../TrendList';

function DefaultHome() {
  const { openModal } = useContext(ModalContext);

  return (
    <>
      <section className="relative bg-amber-400 overflow-hidden border-b border-black">
        <div className="absolute top-0 -right-40 lg:right-0 w-[585px] h-full hidden md:block">
          <Image
            src={AnimatedM}
            alt="animated-m"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="container py-24">
          <h2 className="mb-9 text-[70px] md:text-[85px] lg:text-[106px] leading-[1] font-medium font-serif">
            Stay curious.
          </h2>
          <h3 className="md:max-w-[50%] lg:max-w-[400px] text-[22px]">
            Discover stories, thinking, and expertise from writers on any topic.
          </h3>

          <button
            type="button"
            className="mt-14 px-4 py-2 w-56 rounded-full bg-black text-white text-xl"
            onClick={() => {
              openModal();
            }}
          >
            Start Reading
          </button>
        </div>
      </section>

      <TrendGrid />
      <TrendList />
    </>
  );
}

export default DefaultHome;
