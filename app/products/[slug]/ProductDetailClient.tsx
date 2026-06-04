"use client";

import React, { useState } from "react";
import { Product } from "@/types/product";
import { useAppDispatch } from "@/store";
import { addToCart } from "@/store/cartSlice";
import { Star, ShoppingCart, ShieldCheck, Truck, RefreshCw, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    // Add product to cart according to selected quantity
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-16 text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Left Column: Product Image */}
        <div className="relative rounded-2xl overflow-hidden bg-[#26352F]/30 border border-white/10 flex items-center justify-center p-4 min-h-[350px] md:min-h-[500px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-xl shadow-lg"
          />
          {product.badge && (
            <span className="absolute top-8 left-8 bg-[#B2A088] text-white text-sm font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
              {product.badge}
            </span>
          )}
        </div>

        {/* Right Column: Product Info */}
        <div className="flex flex-col justify-between">
          <div className="space-y-6">
            {/* Category and Rating */}
            <div className="flex flex-wrap items-center gap-4">
              <span className="bg-white/5 border border-white/10 text-white/70 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                {product.category}
              </span>
              <div className="flex items-center gap-1.5">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-white/20"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-white/80">
                  {product.rating}
                </span>
                <span className="text-sm text-white/40">
                  ({product.reviewCount} customer reviews)
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-4">
              <span className="text-3xl md:text-4xl font-extrabold text-[#B2A088]">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-white/40 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Stock status */}
            <div className="flex items-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  product.inStock ? "bg-green-500" : "bg-red-500"
                }`}
              />
              <span className="text-sm font-semibold">
                {product.inStock ? "In Stock & Ready to Ship" : "Out of Stock"}
              </span>
            </div>

            {/* Description */}
            <p className="text-base text-white/70 leading-relaxed border-t border-b border-white/10 py-6">
              {product.description}
            </p>
          </div>

          {/* Action Area */}
          <div className="mt-8 space-y-6">
            {product.inStock && (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                {/* Quantity adjust */}
                <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 h-14 sm:w-36">
                  <span className="text-sm text-white/50 select-none">Qty</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleDecrease}
                      disabled={quantity <= 1}
                      className="p-1 text-white/60 hover:text-white disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="font-bold text-lg min-w-[20px] text-center select-none">
                      {quantity}
                    </span>
                    <button
                      onClick={handleIncrease}
                      className="p-1 text-white/60 hover:text-white cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Add to Cart button */}
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#B2A088] hover:bg-[#A39178] text-white h-14 rounded-xl font-bold text-base flex items-center justify-center gap-3 shadow-lg hover:scale-[1.01] transition-all cursor-pointer"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add To Cart — ${(product.price * quantity).toFixed(2)}
                </Button>
              </div>
            )}

            {/* Core guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10 text-white/60 text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-[#B2A088] flex-shrink-0" />
                <span>Secure Checkout & Payment encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-[#B2A088] flex-shrink-0" />
                <span>Fast & Reliable Insured Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-[#B2A088] flex-shrink-0" />
                <span>30-Day Money Back Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
