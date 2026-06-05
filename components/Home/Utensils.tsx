"use client";

import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import { Card } from "../ui/card";
import { useAppDispatch } from "@/store";
import { addToCart } from "@/store/cartSlice";
import { Product } from "@/types/product";
import { useState } from "react";

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
  { id: 3, name: "Iron Pan", price: 7000, image: "/images/utensils/pan.png" },
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

const mapUtensilToProduct = (item: (typeof products)[0]): Product => ({
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

// ── isolated card so each has its own imgError state ──────────────────────────
interface UtensilCardProps {
  product: (typeof products)[0];
  onAddToCart: () => void;
}

const UtensilCard = ({ product, onAddToCart }: UtensilCardProps) => {
  const [imgError, setImgError] = useState(false);

  return (
    <Card className="group relative w-full md:w-68 h-full py-0 overflow-hidden">
      {/* Image container */}
      <div className="relative h-60 w-full overflow-hidden bg-gray-50">
        {!imgError ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          // Fallback placeholder when image fails to load
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gray-100 text-gray-400">
            <ShoppingCart size={32} className="opacity-30" />
            <span className="text-xs">{product.name}</span>
          </div>
        )}

        {/* Hover overlay with actions */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button
            type="button"
            aria-label={`Add ${product.name} to cart`}
            onClick={onAddToCart}
            className="rounded-full bg-white p-3 shadow hover:scale-110 transition cursor-pointer flex items-center justify-center"
          >
            <ShoppingCart size={20} className="text-[#26352F]" />
          </button>
          <button
            type="button"
            aria-label={`Add ${product.name} to wishlist`}
            className="rounded-full bg-white p-3 shadow hover:scale-110 transition cursor-pointer flex items-center justify-center"
          >
            <Heart size={20} className="text-[#26352F]" />
          </button>
        </div>
      </div>

      {/* Product info */}
      <div className="flex flex-col gap-1 border-t border-gray-100 text-center pb-4 pt-3">
        <p className="text-xl font-semibold">{product.name}</p>
        <p className="text-black/60 text-base font-medium">
          ₦{product.price.toLocaleString()}
        </p>
      </div>
    </Card>
  );
};
const Utensils = () => {
  const dispatch = useAppDispatch();

  return (
    <section className="flex flex-col bg-white justify-center items-center px-6 md:px-16 lg:px-45 py-18 md:py-22 gap-10">
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
          <UtensilCard
            key={product.id}
            product={product}
            onAddToCart={() =>
              dispatch(addToCart(mapUtensilToProduct(product)))
            }
          />
        ))}
      </div>
    </section>
  );
};

export default Utensils;
