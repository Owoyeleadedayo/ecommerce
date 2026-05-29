import React from "react";

const marketData = [
  {
    id: 1,
    title: "The ABC of utensils",
    description:
      "Discover the ABC of Utensils: Your ultimate guide to essential kitchen tools that elevate your cooking experience and simplify meal preparation.",
    image: "/images/ku-1.jpg",
  },
  {
    id: 2,
    title: "The magicians of the kitchen",
    description:
      "Meet passionate chefs and creative cooks who transform simple ingredients into extraordinary culinary experiences with skill and artistry.",
    image: "/images/ckc2.jpg",
  },
  {
    id: 3,
    title: "100% best utensils in town",
    description:
      "Experience premium-quality utensils crafted for durability, precision, and effortless cooking in every kitchen.",
    image: "/images/ku3.jpg",
  },
  {
    id: 4,
    title: "Makes kitchen look smarter",
    description:
      "Upgrade your kitchen with stylish, modern utensils that combine elegance, innovation, and everyday functionality.",
    image: "/images/ku2.jpg",
  },
];

const Market = () => {
  return (
    <section className="px-6 py-16 md:px-12 lg:px-45">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {marketData.map((item) => (
          <div
            key={item.id}
            className="group relative h-112.5 overflow-hidden rounded-lg"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: `url(${item.image})`,
              }}
            />

            <div className="absolute inset-0 bg-black/45 transition-all duration-500 group-hover:bg-black/60" />

            <div className="relative flex h-full items-center p-6 md:p-10">
              <div className="max-w-[320px] bg-black/40 p-6 backdrop-blur-sm">
                <h2 className="mb-4 text-2xl font-medium capitalize tracking-wide text-white md:text-3xl">
                  {item.title}
                </h2>

                <p className="text-sm leading-7 tracking-wide text-white/85">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Market;
