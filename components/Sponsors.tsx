import Image from "next/image";
import React from "react";

const sponsorsData = [
  { id: 1, image: "/images/sponsors/sp1.jpg" },
  { id: 2, image: "/images/sponsors/sp2.jpg" },
  { id: 3, image: "/images/sponsors/sp3.jpg" },
  { id: 4, image: "/images/sponsors/sp4.jpg" },
  { id: 5, image: "/images/sponsors/sp5.jpg" },
];

const Sponsors = () => {
  return (
    <section className="flex justify-center bg-white px-6 py-16 md:px-12 lg:px-24">
      
      <div className="grid w-full max-w-6xl grid-cols-2 place-items-center gap-10 sm:grid-cols-3 md:grid-cols-5">
        {sponsorsData.map((item) => (
          <div
            key={item.id}
            className="relative h-37.5 w-full max-w-30 overflow-hidden"
          >
            <Image
              src={item.image}
              alt="sponsor"
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>
      
    </section>
  );
};

export default Sponsors;