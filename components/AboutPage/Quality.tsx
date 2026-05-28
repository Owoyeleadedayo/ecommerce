import React from 'react';
import { Button } from '../ui/button';
import { MoveRight } from 'lucide-react';

const Quality = () => {
  return (
    <div className="flex flex-col w-full py-15 md:py-20 justify-center items-center gap-2 px-6">
      <h2 className="text-[#B2A088] uppercase tracking-widest text-sm font-normal">
        The premium utensils
      </h2>
      <h3 className="text-2xl md:text-4xl text-[#B2A088] font-medium">
        Quality is our obligation
      </h3>
      <div className="max-w-5xl mt-2">
        <p className="text-center font-normal text-base leading-6 text-gray-500">
          Purus in massa tempor nec. Est sit amet facilisis magna etiam tempor
          orci eu lobortis. Eu tincidunt tortor aliquam nulla. Volutpat diam ut
          venenatis tellus in. Fermentum posuere urna nec tincidunt. Elit sed
          vulputate mi sit amet mauris.
        </p>
        <div className="flex justify-center items-center mt-5">
          <Button
            className={
              "bg-transparent border border-black p-3 md:p-5 text-black rounded-3xl hover:text-white hover:bg-[#B2A088] hover:border-[#B2A088] transition-colors duration-300 cursor-pointer"
            }
          >
            Shop Now <MoveRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Quality;
