import Image from 'next/image';
import React from 'react';

const Unbreakable = () => {
  return (
    <section className="w-full bg-[#F3EBE4] px-6 py-15 md:py-20 md:px-12 lg:px-24">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-16 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#B2A088]">
            Unbreakable
          </p>
          <h2 className="text-3xl font-semibold leading-tight text-gray-900 md:text-3xl">
            Crafted with precision and built to last, our products are designed
            to withstand the test of time.
          </h2>
          <p className="text-base leading-8 text-gray-500">
            We understand that durability is essential in the kitchen, which is
            why we use high-quality materials and rigorous testing to ensure our
            products can handle the demands of everyday cooking.
          </p>
          <p className="text-base leading-8 text-gray-500">
            From our sturdy cookware to our resilient utensils, every item in
            our collection is engineered for longevity, giving you confidence in
            your kitchen tools for years to come.
          </p>
        </div>
        <div className='flex justify-end items-end'>
          <Image
            src="/images/about7.png"
            alt="Unbreakable"
            width={500}
            height={400}
            className=" object-cover transition duration-700 hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
}

export default Unbreakable;
