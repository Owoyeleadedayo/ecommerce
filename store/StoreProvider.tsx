"use client";

import React, { useEffect } from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import cartReducer from "./cartSlice";
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
  } catch {}
}

const store = configureStore({
  reducer: { cart: cartReducer },
  preloadedState: {
    cart: { items: loadCartFromStorage(), isOpen: false },
  },
});

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      saveCartToStorage(store.getState().cart.items);
    });
    return unsubscribe;
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
