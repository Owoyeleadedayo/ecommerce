import Image from 'next/image';
import React from 'react';

const AboutOurProduct = () => {
  const features = [
    {
      id: 1,
      title: "No chemical",
      description:
        "Ante metus dictum at tempor commodo ullamcorper a lacus vestibulum.",
      image: "/images/nochemical.png",
      alt: "no chemical",
    },
    {
      id: 2,
      title: "Earth Friendly",
      description:
        "Ante metus dictum at tempor commodo ullamcorper a lacus vestibulum.",
      image: "/images/planet-earth.png",
      alt: "earth friendly",
    },
    {
      id: 3,
      title: "Recycle Product",
      description:
        "Ante metus dictum at tempor commodo ullamcorper a lacus vestibulum.",
      image: "/images/recycle.png",
      alt: "recycle product",
    },
    {
      id: 4,
      title: "Sturdy & Durable",
      description:
        "Ante metus dictum at tempor commodo ullamcorper a lacus vestibulum.",
      image: "/images/stopwatch.png",
      alt: "sturdy durable",
    },
  ];
  return (
    <section className="flex flex-col w-full h-full bg-[#F5EDE7] justify-center items-center py-20 gap-15">
      <div className="flex flex-col gap-1">
        <p className="text-black/50 text-lg text-center font-medium capitalize">
          about our product
        </p>
        <p className="text-black text-4xl text-center font-medium">
          {" "}
          Designed for better cooking
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl">
        {features.map((item) => (
          <div key={item.id} className="flex flex-col max-w-sm gap-3">
            <div className="relative h-16 w-full overflow-hidden">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col gap-1 text-center pb-4">
              <p className="text-2xl font-normal">{item.title}</p>
              <p className="text-black/60 text-base font-light">
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
