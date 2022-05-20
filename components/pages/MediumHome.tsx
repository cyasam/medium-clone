import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function MediumHome() {
  return (
    <section>
      <div className="main-container">
        <div className="list">
          <div className="flex items-center pb-8 mb-8 border-b border-stone-300">
            <div className="flex-1">
              <div className="mb-2 font-medium text-[13px]">
                Desiree Peralta
                <span className="mx-[2px] text-stone-500">in</span>Better Humans
              </div>
              <h4 className="text-xl font-bold">
                What To Do When You Feel You Can&apos;t Handle Your Life Anymore
              </h4>
              <p className="mt-1 text-stone-500 text-base line-clamp-2">
                A lessons I&apos;ve learned from recovering my own footing in
                life
              </p>
              <div className="mt-2 text-stone-500 text-sm">
                May 19 · 5 min read ·
                <Link href="/">
                  <a className="inline-block ml-1 px-2 py-1 text-xs rounded-full bg-stone-100 text-">
                    Self Improvement
                  </a>
                </Link>
              </div>
            </div>
            <div className="flex-shrink-0 ml-10">
              <Image width={112} height={112} src="/thumb2.jpeg" alt="" />
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex-1">
              <div className="mb-2 font-medium text-[13px]">
                Desiree Peralta
                <span className="mx-[2px] text-stone-500">in</span>
                Better Humans
              </div>
              <h4 className="text-xl font-bold">
                Does The Buffalo Mass Shooting Indicate A Change In White
                Supremacy?
              </h4>
              <p className="mt-1 text-stone-500 text-base line-clamp-2">
                The face of extreme acts of hate and White supremacy has traded
                White, middle-aged men wearing sheets and pointed hats for
                armed, younger…
              </p>
              <div className="mt-2 text-stone-500 text-sm">
                May 18 · 6 min read ·
                <Link href="/">
                  <a className="inline-block ml-1 px-2 py-1 text-xs rounded-full bg-stone-100 text-">
                    Self Improvement
                  </a>
                </Link>
              </div>
            </div>
            <div className="flex-shrink-0 ml-10">
              <Image width={112} height={112} src="/thumb2.jpeg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MediumHome;
