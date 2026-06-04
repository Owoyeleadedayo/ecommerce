import { configureStore, PreloadedState } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import cartReducer from "./cartSlice";

export type RootState = ReturnType<ReturnType<typeof makeStore>["getState"]>;
export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];

export function makeStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState,
  });
}

// Default singleton store (used by hooks)
export const store = makeStore();

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
