import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";

const ShopNew = () => {
    const products = [
      {
        id: 1,
        name: "Non-stick Fry Pan",
        price: 10000,
        image: "/images/ironPan1.png",
      },
      {
        id: 2,
        name: "Non-stick Pan",
        price: 16000,
        image: "/images/ironPan2.png",
      },
      {
        id: 3,
        name: "Iron Pan",
        price: 7000,
        image: "/images/ironPan3.png",
      },
    ];
  return (
    <section className="flex flex-col bg-[#FFFFFF] justify-center items-center py-18 gap-10">
      <div className="flex flex-col gap-4">
        <p className="text-black/50 text-lg text-center font-medium">
          Utensils for beautiful kitchen
        </p>
        <p className="text-[#B2A088] text-4xl text-center font-semibold">
          {" "}
          Shop New Nonsticks
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <Card key={product.id} className="group relative w-75 h-full py-0">
            <div className="relative h-80 w-full overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
              />

              <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <button className="rounded-full bg-white p-3 shadow hover:scale-110 transition">
                  <ShoppingCart size={20} />
                </button>
                <button className="rounded-full bg-white p-3 shadow hover:scale-110 transition">
                  <Heart size={20} />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1 border-gray-200 text-center pb-4">
              <p className="text-xl font-semibold">{product.name}</p>
              <p className="text-black/60 text-base font-medium">₦{product.price.toLocaleString()}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ShopNew;
