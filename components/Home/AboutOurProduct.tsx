import Image from 'next/image';
import React from 'react';

const AboutOurProduct = () => {
  const features = [
    {
      id: 1,
      title: "No chemical",
      description:
        "Our products are free from harmful chemicals, ensuring a safe and healthy cooking experience.",
      image: "/images/nochemical.png",
      alt: "no chemical",
    },
    {
      id: 2,
      title: "Earth Friendly",
      description:
        "Our products are designed with the environment in mind, using sustainable materials and practices.",
      image: "/images/planet-earth.png",
      alt: "earth friendly",
    },
    {
      id: 3,
      title: "Recycle Product",
      description:
        "Our products are made from recycled materials, reducing waste and promoting sustainability.",
      image: "/images/recycle.png",
      alt: "recycle product",
    },
    {
      id: 4,
      title: "Sturdy & Durable",
      description:
        "Our products are built to last, providing you with years of reliable performance.",
      image: "/images/stopwatch.png",
      alt: "sturdy durable",
    },
  ];
  return (
    <section className="flex flex-col w-full h-full bg-[#F5EDE7] justify-center items-center px-10 md:px-20 lg:px-45 py-14 md:py-22 gap-5 md:gap-10">
      <div className="flex flex-col gap-1">
        <p className="text-black/50 text-sm md:text-lg text-center font-medium capitalize">
          about our product
        </p>
        <p className="text-black text-2xl md:text-4xl text-center font-medium">
          {" "}
          Designed for better cooking
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 w-full max-w-5xl">
        {features.map((item) => (
          <div key={item.id} className="flex flex-col max-w-sm gap-3">
            <div className="relative h-14 md:h-16 w-full overflow-hidden">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col gap-1 text-center pb-4">
              <p className="text-xl md:text-2xl font-normal">{item.title}</p>
              <p className="text-black/60 text-sm md:text-base font-light">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AboutOurProduct;
