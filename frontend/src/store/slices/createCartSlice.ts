import { StateCreator } from "zustand";

import { ProductData } from "@/types/product";

export interface CartSlice {
  cart: ProductData[];
  addToCart: (product: ProductData) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, action: "increase" | "decrease") => void;
  clearCart: () => void;
}

export const createCartSlice: StateCreator<CartSlice> = (set, get) => ({
  cart: [],

  addToCart: (product: ProductData) => {
    const cart = get().cart;
    const existingProductIndex = cart.findIndex(p => p.id === product.id);
    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex] = product;
      set({ cart: updatedCart });
    } else {
      set({ cart: [...cart, product] });
    }
  },

  removeFromCart: (productId: number) => {
    set({
      cart: get().cart.filter(product => product.id !== productId),
    });
  },

  updateQuantity: (productId: number, action: "increase" | "decrease") => {
    const cart = get().cart;
    const findProduct = cart.find(p => p.id === productId);
    if (findProduct) {
      const updatedProduct = { ...findProduct };
      if (action === "decrease") {
        updatedProduct.quantity = Math.max(updatedProduct.quantity! - 30, 30);
      } else {
        updatedProduct.quantity! += 30;
      }
      const newCart = cart.map(product =>
        product.id === productId ? updatedProduct : product,
      );
      set({ cart: newCart });
    }
  },

  clearCart: () => {
    set({ cart: [] });
  },
});
