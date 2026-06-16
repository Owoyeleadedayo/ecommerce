"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store";
import { setCartOpen, removeFromCart, updateQuantity } from "@/store/cartSlice";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { CartItem } from "@/types/product";

export default function CartDrawer() {
  const dispatch = useAppDispatch();
  const { items, isOpen } = useAppSelector((state) => state.cart);

  // Disable body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const subtotal = items.reduce<number>(
    (sum: number, item: { product: { price: number }; quantity: number }) =>
      sum + item.product.price * item.quantity,
    0,
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => dispatch(setCartOpen(false))}
      />

      {/* Drawer panel */}
      <div className="relative z-10 flex h-full w-full max-w-md flex-col bg-[#1E2A24] text-white shadow-2xl transition-transform duration-300 border-l border-white/10">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-[#B2A088]" />
            <h2 className="text-xl font-bold tracking-wide">Your Cart</h2>
            {items.length > 0 && (
              <span className="rounded-full bg-[#B2A088] px-2 py-0.5 text-xs font-semibold">
                {items.reduce(
                  (count: number, item: CartItem) => count + item.quantity,
                  0,
                )}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => dispatch(setCartOpen(false))}
            className="rounded-full p-1.5 text-white/70 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center text-center gap-4">
              <ShoppingBag className="h-16 w-16 text-white/20 stroke-[1.5]" />
              <div>
                <p className="text-lg font-medium text-white/80">
                  Your cart is empty
                </p>
                <p className="text-sm text-white/40 mt-1">
                  Explore our premium cookware collection.
                </p>
              </div>
              <Button
                type="button"
                onClick={() => dispatch(setCartOpen(false))}
                className="mt-2 bg-[#B2A088] text-white hover:bg-[#A39178] px-6 rounded-full cursor-pointer"
              >
                Start Shopping
              </Button>
            </div>
          ) : (
            items.map((item: CartItem) => (
              <div
                key={item.product.id}
                className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors"
              >
                {/* Product Image */}
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-black/20">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold truncate text-white/95">
                    {item.product.name}
                  </h3>
                  <p className="text-xs text-[#B2A088] mt-0.5">
                    {item.product.category}
                  </p>

                  {/* Quantity and Price Row */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center bg-black/40 rounded-lg border border-white/10">
                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              productId: item.product.id,
                              quantity: item.quantity - 1,
                            }),
                          )
                        }
                        className="p-1 px-2 text-white/60 hover:text-white cursor-pointer"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="text-xs font-semibold px-2 min-w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              productId: item.product.id,
                              quantity: item.quantity + 1,
                            }),
                          )
                        }
                        className="p-1 px-2 text-white/60 hover:text-white cursor-pointer"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="text-sm font-bold text-white/90">
                      ₦{(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => dispatch(removeFromCart(item.product.id))}
                  className="p-1 text-white/40 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors cursor-pointer self-start"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-white/10 bg-black/20 px-6 py-6 space-y-4">
            <div className="flex items-center justify-between text-base">
              <span className="font-medium text-white/70">Subtotal</span>
              <span className="text-2xl font-bold text-white">
                ₦{subtotal.toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-white/40">
              Shipping, taxes, and discounts calculated at checkout.
            </p>
            <div className="flex flex-col gap-2 pt-2">
              <Link href="/checkout" className="w-full">
                <Button
                  type="button"
                  onClick={() => dispatch(setCartOpen(false))}
                  className="w-full bg-[#B2A088] text-white hover:bg-[#A39178] py-6 font-semibold rounded-xl text-md cursor-pointer transition-all shadow-lg"
                >
                  Proceed to Checkout
                </Button>
              </Link>
              <button
                type="button"
                onClick={() => dispatch(setCartOpen(false))}
                className="w-full text-center py-2 text-sm text-white/60 hover:text-white border rounded-lg transition-colors cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
