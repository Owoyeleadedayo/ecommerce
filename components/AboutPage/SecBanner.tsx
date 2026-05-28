import Image from "next/image";
import React from "react";

const SecBanner = () => {
  return (
    <section className="w-full px-6 py-20 md:px-12 lg:px-24">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <div className="relative flex justify-center lg:justify-start">
          <div className="absolute right-0 top-10 h-80 w-150 rounded-2xl bg-[#2A3A34] md:flex hidden" />

          <div className="relative z-10 h-100 w-full max-w-137.5 overflow-hidden rounded-2xl shadow-2xl ml-0 md:ml-3">
            <Image
              src="/images/ckck.jpg"
              alt="Cooking story"
              fill
              className="object-cover transition duration-700 hover:scale-105"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#B2A088]">
            Our Story
          </p>

          <h2 className="text-3xl font-semibold leading-tight text-gray-900 md:text-3xl">
            We are passionate about cooking and dedicated to creating products
            that elevate every culinary experience.
          </h2>

          <p className="text-base leading-8 text-gray-500">
            Our journey began with a simple idea: to build a brand that
            celebrates the joy of cooking and inspires creativity in every
            kitchen. We believe cooking is more than a daily routine — it is a
            form of expression, connection, and comfort.
          </p>

          <p className="text-base leading-8 text-gray-500">
            That vision continues to guide us as we curate high-quality kitchen
            essentials designed to empower home cooks and bring elegance into
            everyday moments.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SecBanner;
