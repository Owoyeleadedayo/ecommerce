import Image from "next/image";
import React from "react";

const banners = [
  {
    id: 1,
    title: "Premium Cookware",
    image: "/images/ckc.jpg",
    className: "row-span-3 h-[700px]",
  },
  {
    id: 2,
    title: "Modern Kitchen Tools",
    image: "/images/ckc3.jpg",
    className: "col-span-2 h-[340px]",
  },
  {
    id: 3,
    title: "Eco-Friendly Products",
    image: "/images/ckc4.jpg",
    className: "col-span-2 h-[340px]",
  },
];

const Banner = () => {
  return (
    <section className="bg-[#F3EBE4] w-full px-6 py-15 md:py-10 md:px-12 lg:px-25">
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-5">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className={`group relative overflow-hidden rounded-2xl ${banner.className}`}
          >
            {/* IMAGE */}
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-black/20 transition-all duration-500 group-hover:bg-black/70" />

            {/* CONTENT */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="translate-y-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-center text-2xl font-semibold tracking-wide text-white md:text-3xl">
                  {banner.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Banner;
