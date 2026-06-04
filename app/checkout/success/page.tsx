"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { useAppDispatch } from "@/store";
import { clearCart } from "@/store/cartSlice";
import { CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  const dispatch = useAppDispatch();

  // Clear cart upon reaching success page
  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  // Generate a random mock order number
  const orderNumber = "CK-" + Math.floor(100000 + Math.random() * 900000);

  return (
    <main className="flex-1 flex flex-col w-full bg-[#18231E] text-white">
      <PageHeader pageName="Order Confirmed" />

      <div className="flex-1 flex flex-col items-center justify-center max-w-lg mx-auto text-center px-6 py-20 gap-8">
        {/* Check animation wrapper */}
        <div className="relative flex items-center justify-center h-24 w-24 rounded-full bg-[#B2A088]/20 border border-[#B2A088]/40 animate-pulse">
          <CheckCircle2 className="h-16 w-16 text-[#B2A088] stroke-[1.5]" />
        </div>

        <div className="space-y-3">
          <h2 className="text-3xl font-extrabold tracking-tight">
            Thank you for your order!
          </h2>
          <p className="text-white/60 leading-relaxed">
            Your transaction was completed successfully. A receipt and order confirmation has been emailed to you.
          </p>
        </div>

        {/* Order Details box */}
        <div className="w-full bg-[#26352F]/40 backdrop-blur-md rounded-2xl border border-white/10 p-6 space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-white/50">Order Number</span>
            <span className="font-bold text-white tracking-wide">{orderNumber}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-white/50">Status</span>
            <span className="font-semibold text-green-400">Processing</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-white/50">Est. Delivery</span>
            <span className="font-medium text-white/90">3 - 5 Business Days</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 w-full pt-4">
          <Link href="/products" className="flex-1">
            <Button
              variant="outline"
              className="w-full border-white/10 hover:border-white/20 text-white/80 hover:text-white hover:bg-white/5 h-12 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <ShoppingBag className="h-4.5 w-4.5" />
              Continue Shopping
            </Button>
          </Link>
          <Link href="/" className="flex-1">
            <Button className="w-full bg-[#B2A088] hover:bg-[#A39178] text-white h-12 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all">
              Go To Home
              <ArrowRight className="h-4.5 w-4.5" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
