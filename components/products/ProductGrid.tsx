"use client";

import React, { useState, useRef } from "react";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

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

const PRODUCTS_PER_PAGE = 8;

export default function ProductGrid({ products }: ProductGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = Math.min(startIndex + PRODUCTS_PER_PAGE, filteredProducts.length);
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <div
      ref={gridRef}
      className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12 scroll-mt-24"
    >
      {/* Category filters */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {CATEGORIES.map((category) => (
          <Button
            type="button"
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`cursor-pointer px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 ${
              selectedCategory === category
                ? "bg-[#B2A088] text-white shadow-lg"
                : "bg-white text-[#26352F] border border-[#EAE3DB] hover:border-[#D1C5B5] hover:bg-[#FBF9F6]"
            }`}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Grid count summary */}
      <p className="text-black/60 text-sm mb-6 font-medium">
        Showing {filteredProducts.length === 0 ? 0 : startIndex + 1}–{endIndex}{" "}
        of {filteredProducts.length} products
        {selectedCategory !== "All" && ` in ${selectedCategory}`}
      </p>

      {/* Products Grid */}
      {paginatedProducts.length === 0 ? (
        <div className="text-center py-20 bg-[#FBF9F6] rounded-2xl border border-[#EAE3DB]">
          <p className="text-lg text-black/50">
            No products found in this category.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-6 border-t border-[#EAE3DB]">
              {/* Desktop indicator */}
              <span className="text-sm text-black/60 font-medium hidden sm:inline">
                Showing{" "}
                <span className="font-semibold text-[#26352F]">
                  {startIndex + 1}–{endIndex}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-[#26352F]">
                  {filteredProducts.length}
                </span>{" "}
                products
              </span>

              {/* Navigation Controls */}
              <nav
                className="flex items-center gap-1.5 w-full sm:w-auto justify-center"
                aria-label="Products Pagination"
              >
                {/* Previous Button */}
                <Button
                  type="button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`cursor-pointer h-10 w-10 flex items-center justify-center rounded-lg border border-[#EAE3DB] bg-white text-[#26352F] transition-all duration-300 hover:bg-[#FBF9F6] hover:border-[#D1C5B5] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-[#EAE3DB] disabled:active:scale-100`}
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>

                {/* Page Number Buttons */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => {
                    const isActive = page === currentPage;
                    return (
                      <Button
                        key={page}
                        type="button"
                        onClick={() => handlePageChange(page)}
                        aria-current={isActive ? "page" : undefined}
                        className={`cursor-pointer h-10 min-w-10 px-3.5 flex items-center justify-center rounded-lg text-sm font-semibold tracking-wide transition-all duration-300 active:scale-95 ${
                          isActive
                            ? "bg-[#B2A088] text-white shadow-md hover:bg-[#A39178]"
                            : "bg-white text-[#26352F] border border-[#EAE3DB] hover:bg-[#FBF9F6] hover:border-[#D1C5B5]"
                        }`}
                      >
                        {page}
                      </Button>
                    );
                  },
                )}

                {/* Next Button */}
                <Button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`cursor-pointer h-10 w-10 flex items-center justify-center rounded-lg border border-[#EAE3DB] bg-white text-[#26352F] transition-all duration-300 hover:bg-[#FBF9F6] hover:border-[#D1C5B5] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-[#EAE3DB] disabled:active:scale-100`}
                  aria-label="Next Page"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
}
