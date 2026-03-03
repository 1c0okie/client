// src/features/cart/cart.store.js
import { create } from 'zustand';

export const useCartStore = create((set) => ({
  items: [],

  // --- THÊM PHẦN NÀY ---
  isOpen: false, // Mặc định là đóng
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  
  // 1. Thêm vào giỏ
  addToCart: (product) => set((state) => {
    const existingItem = state.items.find((item) => item._id === product._id);
    if (existingItem) {
      return {
        items: state.items.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    }
    return { items: [...state.items, { ...product, quantity: 1 }] };
  }),

  // 2. Xóa sản phẩm khỏi giỏ
  removeFromCart: (productId) => set((state) => ({
    items: state.items.filter((item) => item._id !== productId)
  })),

  // 3. Tăng số lượng (+1)
  increaseQuantity: (productId) => set((state) => ({
    items: state.items.map((item) =>
      item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
    )
  })),

  // 4. Giảm số lượng (-1)
  decreaseQuantity: (productId) => set((state) => ({
    items: state.items.map((item) =>
      item._id === productId && item.quantity > 1 
        ? { ...item, quantity: item.quantity - 1 } 
        : item
    )
  })),

  // 5. Xóa sạch giỏ (Dùng sau khi thanh toán xong)
  clearCart: () => set({ items: [] }),
}));