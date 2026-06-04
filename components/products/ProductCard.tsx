"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import { useAppDispatch } from "@/store";
import { addToCart } from "@/store/cartSlice";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#EAE3DB] hover:border-[#D1C5B5] hover:shadow-md transition-all duration-300 flex flex-col justify-between h-[450px]">
      {/* Product Image & Badge */}
      <div className="relative h-56 w-full overflow-hidden bg-[#FBF9F6]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />

        {product.badge && (
          <span className="absolute top-4 left-4 z-10 bg-[#B2A088] text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            {product.badge}
          </span>
        )}

        {/* Quick details overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <Link href={`/products/${product.slug}`}>
            <Button className="bg-white/95 text-[#26352F] hover:bg-white rounded-full text-xs font-medium px-4 py-2 cursor-pointer shadow-md">
              View Details
            </Button>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-black/50 mb-2">
            <span>{product.category}</span>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
              <span className="text-black/80 font-medium">
                {product.rating}
              </span>
              <span>({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <Link href={`/products/${product.slug}`}>
            <h3 className="text-lg font-bold text-[#26352F] group-hover:text-[#B2A088] transition-colors leading-tight mb-2">
              {product.name}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-sm text-black/60 line-clamp-2 mb-3">
            {product.description}
          </p>
        </div>

        {/* Price & Add to Cart button */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-[#26352F]">
              ₦{product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-black/40 line-through">
                ₦{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <Button
            onClick={() => dispatch(addToCart(product))}
            disabled={!product.inStock}
            className={`cursor-pointer h-10 w-10 p-0 rounded-full flex items-center justify-center transition-all ${
              product.inStock
                ? "bg-[#B2A088] hover:bg-[#A39178] text-white shadow-md hover:scale-105"
                : "bg-black/10 text-black/30 cursor-not-allowed"
            }`}
            title={product.inStock ? "Add to Cart" : "Out of Stock"}
          >
            <ShoppingCart className="h-4.5 w-4.5 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
}
