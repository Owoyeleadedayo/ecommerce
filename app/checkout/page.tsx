"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useAppSelector } from "@/store";
import PageHeader from "@/components/PageHeader";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import BankTransferForm from "@/components/checkout/BankTransferForm";
import { ShoppingBag, ArrowLeft, Loader2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/types/product";

// Initialize Stripe. Uses a fallback string if the key is not defined.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder"
);


export default function CheckoutPage() {
  const { items } = useAppSelector((state) => state.cart);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isMock, setIsMock] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "transfer">("card");

  // Pricing calculations
  const subtotal = items.reduce<number>(
    (sum: number, item: CartItem) => sum + item.product.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.08;
  const shipping = subtotal > 150 ? 0 : 9.99;
  const total = subtotal + tax + shipping;

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      if (items.length === 0) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items }),
        });

        if (!response.ok) {
          throw new Error("Failed to initialize payment gateway.");
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
        setIsMock(!!data.mock);
      } catch (err) {
        console.error(err);
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentIntent();
  }, [items]);

  // Options for Stripe Elements
  const options = {
    clientSecret: clientSecret || undefined,
    appearance: {
      theme: "night" as const,
      variables: {
        colorPrimary: "#B2A088",
        colorBackground: "#1E2A24",
        colorText: "#ffffff",
        colorDanger: "#ef4444",
        fontFamily: "var(--font-sora), sans-serif",
        spacingUnit: "4px",
        borderRadius: "8px",
      },
    },
  };

  if (items.length === 0 && !isLoading) {
    return (
      <main className="flex-1 flex flex-col w-full bg-[#18231E]">
        <PageHeader pageName="Checkout" />
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-white min-h-[50vh] gap-6">
          <ShoppingBag className="h-16 w-16 text-white/20 stroke-[1.5]" />
          <div>
            <h2 className="text-2xl font-bold">Your Cart is Empty</h2>
            <p className="text-white/60 mt-2 max-w-sm">
              Please add products to your cart before proceeding to checkout.
            </p>
          </div>
          <Link href="/products">
            <Button className="bg-[#B2A088] text-white hover:bg-[#A39178] px-6 rounded-full cursor-pointer">
              Go To Products
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col w-full bg-[#18231E] text-white">
      <PageHeader pageName="Checkout" />

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Side: Stripe form */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#26352F]/40 backdrop-blur-md rounded-2xl border border-white/10 p-6 md:p-8">
              <h2 className="text-2xl font-bold tracking-tight mb-6">
                Shipping &amp; Payment
              </h2>

              {/* Payment Method Selector Tabs */}
              <div className="flex gap-4 border-b border-white/10 pb-6 mb-6">
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`flex-1 py-3 text-center rounded-xl font-semibold border transition-all cursor-pointer ${
                    paymentMethod === "card"
                      ? "bg-[#B2A088] border-[#B2A088] text-white shadow-md"
                      : "bg-white/5 border-white/5 text-white/65 hover:border-white/15 hover:text-white"
                  }`}
                >
                  💳 Card Payment
                </button>
                <button
                  onClick={() => setPaymentMethod("transfer")}
                  className={`flex-1 py-3 text-center rounded-xl font-semibold border transition-all cursor-pointer ${
                    paymentMethod === "transfer"
                      ? "bg-[#B2A088] border-[#B2A088] text-white shadow-md"
                      : "bg-white/5 border-white/5 text-white/65 hover:border-white/15 hover:text-white"
                  }`}
                >
                  🏦 Bank Transfer
                </button>
              </div>

              {paymentMethod === "transfer" ? (
                <BankTransferForm />
              ) : isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 text-white/60 gap-3">
                  <Loader2 className="h-10 w-10 animate-spin text-[#B2A088]" />
                  <p className="text-sm font-semibold">
                    Initializing Secure Gateway...
                  </p>
                </div>
              ) : error ? (
                <div className="bg-red-500/10 border border-red-500/20 text-red-300 rounded-xl p-4 text-sm font-medium">
                  {error}
                </div>
              ) : clientSecret ? (
                isMock ? (
                  <CheckoutForm clientSecret={clientSecret} isMock={true} />
                ) : (
                  <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm clientSecret={clientSecret} isMock={false} />
                  </Elements>
                )
              ) : null}
            </div>
          </div>

          {/* Right Side: Order summary */}
          <div className="lg:col-span-5 bg-[#26352F]/30 border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
            <h2 className="text-2xl font-bold tracking-tight pb-4 border-b border-white/10">
              Order Summary
            </h2>

            {/* Item list */}
            <div className="max-h-60 overflow-y-auto pr-2 space-y-4">
              {items.map(
                (item: {
                  product: {
                    id: string;
                    name: string;
                    price: number;
                    image: string;
                  };
                  quantity: number;
                }) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 items-center"
                  >
                    <div className="h-16 w-16 rounded-lg overflow-hidden bg-black/20 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-white/95 truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-white/50 mt-0.5">
                        Qty: {item.quantity} × ${item.product.price.toFixed(2)}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-white/90">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ),
              )}
            </div>

            {/* Calculations block */}
            <div className="space-y-3 pt-4 border-t border-white/10 text-sm">
              <div className="flex justify-between text-white/70">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Estimated Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-green-400 font-medium">Free</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>

              {shipping > 0 && (
                <div className="flex items-center gap-1.5 text-xs text-[#B2A088] bg-[#B2A088]/10 px-3 py-2 rounded-lg border border-[#B2A088]/20">
                  <Info className="h-3.5 w-3.5 shrink-0" />
                  <span>
                    Add ${(150 - subtotal).toFixed(2)} more for Free Shipping!
                  </span>
                </div>
              )}

              <div className="flex justify-between text-base font-bold pt-3 border-t border-white/10 text-white">
                <span>Total</span>
                <span className="text-xl text-[#B2A088]">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
