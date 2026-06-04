import React from "react";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import { getProductBySlug, getRelatedProducts } from "@/lib/products";
import ProductCard from "@/components/products/ProductCard";
import ProductDetailClient from "./ProductDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);
  
  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} - Premium Cookware`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product);

  return (
    <main className="flex-1 flex flex-col w-full bg-[#FDFBF7]">
      <PageHeader pageName={product.name} />
      
      {/* Product Detail Section */}
      <ProductDetailClient product={product} />

      {/* Related Products Section */}
      {related.length > 0 && (
        <section className="w-full max-w-7xl mx-auto px-4 md:px-8 xl:px-25 py-16 border-t border-[#EAE3DB]">
          <h2 className="text-3xl font-extrabold text-[#26352F] tracking-tight mb-10 text-center md:text-left">
            You May Also <span className="text-[#B2A088]">Like</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
