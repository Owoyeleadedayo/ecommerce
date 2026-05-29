import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { MoveRight } from "lucide-react";

const solutionsData = [
  {
    id: 1,
    image: "/images/wad.jpg",
    title: "Lasts longer than ordinary non-stick pan",
    description:
      "Experience the durability and longevity of our premium non-stick pans, designed to withstand the test of time and elevate your cooking experience.",
  },
  {
    id: 2,
    image: "/images/wad2.jpg",
    title: "Made with a unique patented process",
    description:
      "Our unique patented process ensures precision and innovation, delivering exceptional quality and performance that sets us apart in the market.",
  },
  {
    id: 3,
    image: "/images/wad3.jpg",
    title: "5mm thick bottom provides stable heat distribution",
    description:
      "The 5mm thickened bottom ensures even heat distribution, preventing hot spots and delivering perfectly cooked meals every time.",
  },
];

const Solutions = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-10 bg-[#F3EBE4] px-6 py-16 md:px-12 lg:px-45">
      <div className="flex flex-col items-center gap-2 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#B2A088]">
          Our Story
        </p>
        <h2 className="text-3xl font-semibold text-gray-900 md:text-4xl">
          Our Solutions
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {solutionsData.map((item) => (
          <div key={item.id} className="group flex flex-col gap-4">
            {/* IMAGE */}
            <div className="relative h-72 overflow-hidden rounded-md">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <p className="text-xl font-medium capitalize text-gray-900">
              {item.title}
            </p>

            <p className="text-base leading-7 tracking-wide text-gray-500">
              {item.description}
            </p>

            <div className="flex">
              <Button className="rounded-3xl border border-black bg-transparent p-3 text-black transition-colors duration-300 hover:border-[#B2A088] hover:bg-[#B2A088] hover:text-white md:p-5">
                Shop Now <MoveRight />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Solutions;
