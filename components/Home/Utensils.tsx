"use client";

import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import { Card } from "../ui/card";
import { useAppDispatch } from "@/store";
import { addToCart } from "@/store/cartSlice";
import { Product } from "@/types/product";

const Utensils = () => {
  const dispatch = useAppDispatch();

  const products = [
    {
      id: 1,
      name: "Electric Kettle",
      price: 10000,
      image: "/images/utensils/electric-kettle.jpg",
    },
    {
      id: 2,
      name: "Steel Spatula",
      price: 16000,
      image: "/images/utensils/iron-spatula.png",
    },
    {
      id: 3,
      name: "Iron Pan",
      price: 7000,
      image: "/images/utensils/pan.png",
    },
    {
      id: 4,
      name: "Modern Plate",
      price: 7000,
      image: "/images/utensils/plate.png",
    },
    {
      id: 5,
      name: "Roti Spoon",
      price: 7000,
      image: "/images/utensils/rotispoon.png",
    },
    {
      id: 6,
      name: "Spatula",
      price: 7000,
      image: "/images/utensils/spatula.png",
    },
    {
      id: 7,
      name: "Sauce Pan",
      price: 7000,
      image: "/images/utensils/saucepan.png",
    },
    {
      id: 8,
      name: "Hand Blender",
      price: 7000,
      image: "/images/utensils/hand-blender.png",
    },
  ];

  const mapUtensilToProduct = (item: typeof products[0]): Product => ({
    id: `utensil-${item.id}`,
    slug: item.name.toLowerCase().replace(/\s+/g, "-"),
    name: item.name,
    price: item.price,
    image: item.image,
    category: "Utensils",
    description: `Premium quality ${item.name} for modern kitchens.`,
    rating: 4.8,
    reviewCount: 35,
    inStock: true,
  });

  return (
    <section className="flex flex-col bg-[#FFFFFF] justify-center items-center px-10 md:px-20 lg:px-45 py-18 md:py-22 gap-10">
      <div className="flex flex-col gap-1">
        <p className="text-black/50 text-sm md:text-lg text-center font-medium">
          The paradise of utensils
        </p>
        <p className="text-[#B2A088] text-2xl md:text-4xl text-center font-semibold">
          Get everything in one spot
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full max-w-6xl place-items-center gap-5">
        {products.map((product) => (
          <Card
            key={product.id}
            className="group relative w-full md:w-68 h-full py-0"
          >
            <div className="relative h-60 w-full overflow-hidden">
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

export default Utensils;
