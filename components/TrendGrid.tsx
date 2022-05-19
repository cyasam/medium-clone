import React from 'react';
import { IoTrendingUpSharp } from 'react-icons/io5';

function TrendGrid() {
  return (
    <section className="border-b border-stone-200">
      <div className="container py-10">
        <p className="flex items-center mb-6 font-medium text-sm">
          <span className="inline-flex -mt-[1px] mr-3 p-[1px] rounded-full border border-gray-700">
            <IoTrendingUpSharp className=" text-base" />
          </span>
          TRENDING ON MEDIUM
        </p>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex">
            <div className="mr-5 text-stone-200 text-[30px] leading-none font-bold">
              <p className="-mt-1">01</p>
            </div>
            <div>
              <div className="mb-2 font-medium text-[13px]">
                Tim Sneath <span className="text-stone-500">in</span> Flutter
              </div>
              <h4 className="text-base font-bold">Introducing Flutter 3</h4>
              <p className="mt-2 text-stone-500 text-sm">May 11 · 7 min read</p>
            </div>
          </div>

          <div className="flex">
            <div className="mr-5 text-stone-200 text-[30px] leading-none font-bold">
              <p className="-mt-1">02</p>
            </div>
            <div>
              <div className="mb-2 font-medium text-[13px]">Hannah Summers</div>
              <h4 className="text-base font-bold">
                The Assassination of Amber Heard
              </h4>
              <p className="mt-2 text-stone-500 text-sm">May 4 · 8 min read</p>
            </div>
          </div>

          <div className="flex">
            <div className="mr-5 text-stone-200 text-[30px] leading-none font-bold">
              <p className="-mt-1">03</p>
            </div>
            <div>
              <div className="mb-2 font-medium text-[13px]">
                Matt Charnock <span className="text-stone-500">in</span> The
                Bold Italic
              </div>
              <h4 className="text-base font-bold">
                You, Too, Could Own This Shitty Bay Area Fixer-Upper — for Just
                $661,500
              </h4>
              <p className="mt-2 text-stone-500 text-sm">May 12 · 4 min read</p>
            </div>
          </div>

          <div className="flex">
            <div className="mr-5 text-stone-200 text-[30px] leading-none font-bold">
              <p className="-mt-1">04</p>
            </div>
            <div>
              <div className="mb-2 font-medium text-[13px]">
                Arthur Hayes <span className="text-stone-500">in</span>{' '}
                Entrepreneur&apos;s Handbook
              </div>
              <h4 className="text-base font-bold">Luna Brothers, Inc.</h4>
              <p className="mt-2 text-stone-500 text-sm">
                May 13 · 20 min read
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrendGrid;
