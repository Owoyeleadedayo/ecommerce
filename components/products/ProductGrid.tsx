"use client";

import React, { useState } from "react";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

const CATEGORIES = [
  "All",
  "Cookware",
  "Knives",
  "Bakeware",
  "Tools",
  "Appliances",
  "Tableware",
];

export default function ProductGrid({ products }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12">
      {/* Category filters */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`cursor-pointer px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 ${
              selectedCategory === category
                ? "bg-[#B2A088] text-white shadow-lg"
                : "bg-white text-[#26352F] border border-[#EAE3DB] hover:border-[#D1C5B5] hover:bg-[#FBF9F6]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid count summary */}
      <p className="text-black/60 text-sm mb-6 font-medium">
        Showing {filteredProducts.length} of {products.length} products
      </p>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-[#FBF9F6] rounded-2xl border border-[#EAE3DB]">
          <p className="text-lg text-black/50">No products found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
