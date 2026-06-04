"use client";

import React, { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "./index";
import { CartItem } from "@/types/product";

const CART_STORAGE_KEY = "ck-cart-items";

function loadCartFromStorage(): CartItem[] {
  try {
    if (typeof window === "undefined") return [];
    const serialized = localStorage.getItem(CART_STORAGE_KEY);
    if (!serialized) return [];
    return JSON.parse(serialized) as CartItem[];
  } catch {
    return [];
  }
}

function saveCartToStorage(items: CartItem[]) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // If localStorage is unavailable, silently fail
  }
}

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Create store once with cart preloaded from localStorage
  const storeRef = useRef<ReturnType<typeof makeStore> | null>(null);

  if (!storeRef.current) {
    const savedItems = loadCartFromStorage();
    storeRef.current = makeStore({
      cart: {
        items: savedItems,
        isOpen: false, // always start with drawer closed
      },
    });

    // Subscribe to store changes and persist cart items to localStorage
    storeRef.current.subscribe(() => {
      const state = storeRef.current!.getState();
      saveCartToStorage(state.cart.items);
    });
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
