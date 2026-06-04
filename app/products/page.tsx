import React from "react";
import PageHeader from "@/components/PageHeader";
import ProductGrid from "@/components/products/ProductGrid";
import { products } from "@/lib/products";

export const metadata = {
  title: "Premium Cookware & Kitchen Tools - All Products",
  description: "Browse our collection of professional-grade pots, pans, knives, bakeware, tools, and premium appliances.",
};

const ProductsPage = () => {
  return (
    <main className="flex-1 flex flex-col w-full bg-[#FDFBF7]">
      <PageHeader pageName="All Products" />
      
      <div className="w-full flex-1">
        <ProductGrid products={products} />
      </div>
    </main>
  );
};

export default ProductsPage;
