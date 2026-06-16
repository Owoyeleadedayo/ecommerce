"use client";

import React from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store";
import { setCartOpen, removeFromCart, updateQuantity } from "@/store/cartSlice";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { CartItem } from "@/types/product";
import { useScrollLock } from "@/lib/useScrollLock";

export default function CartDrawer() {
  const dispatch = useAppDispatch();
  const { items, isOpen } = useAppSelector((state) => state.cart);

  // Shared scroll lock — coordinates with NavBar, no race conditions
  useScrollLock(isOpen);

  const subtotal = items.reduce<number>(
    (sum: number, item: { product: { price: number }; quantity: number }) =>
      sum + item.product.price * item.quantity,
    0,
  );

  return (
    <>
      {/* Backdrop — NO backdrop-blur (causes iOS Safari stacking trap) */}
      <div
        className={`fixed inset-0 z-[200] bg-black/60 transition-opacity duration-300
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => dispatch(setCartOpen(false))}
        aria-hidden="true"
      />

      {/* Drawer panel — single stacking context, no isolate, no nested z */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md z-[201]
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full pointer-events-none"}`}
        role="dialog"
        aria-modal={isOpen}
        aria-label="Shopping cart"
      >
        <div className="flex h-full w-full flex-col bg-[#1E2A24] text-white shadow-2xl border-l border-white/10">
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
            <Button
              type="button"
              onClick={() => dispatch(setCartOpen(false))}
              className="rounded-full p-1.5 text-white/70 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
            >
              <X className="h-5 w-5" />
            </Button>
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
                        <Button
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
                        </Button>
                        <span className="text-xs font-semibold px-2 min-w-6 text-center">
                          {item.quantity}
                        </span>
                        <Button
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
                        </Button>
                      </div>
                      <span className="text-sm font-bold text-white/90">
                        ₦{(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Remove button */}
                  <Button
                    onClick={() => dispatch(removeFromCart(item.product.id))}
                    className="p-1 text-white/40 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors cursor-pointer self-start"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
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
                <Button
                  type="button"
                  onClick={() => dispatch(setCartOpen(false))}
                  className="w-full text-center py-2 text-sm text-white/60 hover:text-white border rounded-lg transition-colors cursor-pointer"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
