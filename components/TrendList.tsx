import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function TrendList() {
  return (
    <section>
      <div className="container py-10">
        <div className="lg:grid lg:grid-cols-[auto,240px] gap-8">
          <aside className="mb-10 pb-5 border-b border-stone-200 order-1">
            <p className="flex items-center mb-6 font-medium text-sm">
              DISCOVER MORE OF WHAT MATTERS TO YOU
            </p>
            <div className="flex flex-wrap">
              <Link href="/">
                <a className="mr-2 mb-3 px-4 py-2 text-xs text-stone-500 border border-stone-200 rounded">
                  Self
                </a>
              </Link>
              <Link href="/">
                <a className="mr-2 mb-3 px-4 py-2 text-xs text-stone-500 border border-stone-200 rounded">
                  Relationships
                </a>
              </Link>
              <Link href="/">
                <a className="mr-2 mb-3 px-4 py-2 text-xs text-stone-500 border border-stone-200 rounded">
                  Data Science
                </a>
              </Link>
              <Link href="/">
                <a className="mr-2 mb-3 px-4 py-2 text-xs text-stone-500 border border-stone-200 rounded">
                  Programming
                </a>
              </Link>
              <Link href="/">
                <a className="mr-2 mb-3 px-4 py-2 text-xs text-stone-500 border border-stone-200 rounded">
                  Self
                </a>
              </Link>
              <Link href="/">
                <a className="mr-2 mb-3 px-4 py-2 text-xs text-stone-500 border border-stone-200 rounded">
                  Relationships
                </a>
              </Link>
              <Link href="/">
                <a className="mr-2 mb-3 px-4 py-2 text-xs text-stone-500 border border-stone-200 rounded">
                  Data Science
                </a>
              </Link>
              <Link href="/">
                <a className="mr-2 mb-3 px-4 py-2 text-xs text-stone-500 border border-stone-200 rounded">
                  Programming
                </a>
              </Link>
              <Link href="/">
                <a className="mr-2 mb-3 px-4 py-2 text-xs text-stone-500 border border-stone-200 rounded">
                  Health
                </a>
              </Link>
            </div>
          </aside>

          <div className="list mt-3">
            <div className="flex items-center mb-12">
              <div>
                <div className="mb-2 font-medium text-[13px]">
                  Desiree Peralta
                  <span className="mx-[2px] text-stone-500">in</span>Better
                  Humans
                </div>
                <h4 className="text-xl font-bold">
                  What To Do When You Feel You Can&apos;t Handle Your Life
                  Anymore
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
                <Image width={200} height={134} src="/thumb.jpeg" alt="" />
              </div>
            </div>

            <div className="flex items-center">
              <div>
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
                  The face of extreme acts of hate and White supremacy has
                  traded White, middle-aged men wearing sheets and pointed hats
                  for armed, younger…
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
                <Image width={200} height={134} src="/thumb.jpeg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrendList;
