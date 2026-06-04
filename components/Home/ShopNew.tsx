"use client";

import { Card } from "../ui/card";
import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import { useAppDispatch } from "@/store";
import { addToCart } from "@/store/cartSlice";
import { Product } from "@/types/product";

const ShopNew = () => {
  const dispatch = useAppDispatch();

  const products = [
    {
      id: 101,
      name: "Non-stick Fry Pan",
      price: 10000,
      image: "/images/ironPan1.png",
    },
    {
      id: 102,
      name: "Non-stick Pan",
      price: 16000,
      image: "/images/ironPan2.png",
    },
    {
      id: 103,
      name: "Iron Pan",
      price: 7000,
      image: "/images/ironPan3.png",
    },
  ];

  const mapUtensilToProduct = (item: typeof products[0]): Product => ({
    id: `utensil-${item.id}`,
    slug: item.name.toLowerCase().replace(/\s+/g, "-"),
    name: item.name,
    price: item.price,
    image: item.image,
    category: "Cookware",
    description: `Premium quality ${item.name} for modern kitchens.`,
    rating: 4.9,
    reviewCount: 52,
    inStock: true,
  });

  return (
    <section className="flex flex-col bg-[#FFFFFF] justify-center items-center py-10 md:py-18 px-10 md:px-20 lg:px-45 gap-10">
      <div className="flex flex-col gap-1">
        <p className="text-black/50 text-sm md:text-lg text-center font-medium">
          Utensils for beautiful kitchen
        </p>
        <p className="text-[#B2A088] text-2xl md:text-4xl text-center font-semibold">
          Shop New Nonsticks
        </p>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-8">
        {products.map((product) => (
          <Card
            key={product.id}
            className="group relative w-full md:w-75 h-full py-0"
          >
            <div className="relative h-80 w-full overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
              />

              <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => dispatch(addToCart(mapUtensilToProduct(product)))}
                  className="rounded-full bg-white p-3 shadow hover:scale-110 transition cursor-pointer flex items-center justify-center"
                >
                  <ShoppingCart size={20} className="text-[#26352F]" />
                </button>
                <button className="rounded-full bg-white p-3 shadow hover:scale-110 transition cursor-pointer flex items-center justify-center">
                  <Heart size={20} className="text-[#26352F]" />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1 border-gray-200 text-center pb-4">
              <p className="text-xl font-semibold">{product.name}</p>
              <p className="text-black/60 text-base font-medium">
                ₦{product.price.toLocaleString()}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ShopNew;
