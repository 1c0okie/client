// src/features/ui/toast.store.js
import { create } from 'zustand';

export const useToastStore = create((set) => ({
  toastData: null, // Chứa { title, image, message }
  
  // Hàm hiện thông báo
  showToast: (product) => {
    set({ 
      toastData: {
        title: product.title,
        image: product.image,
        message: 'Đã thêm vào giỏ hàng thành công!'
      } 
    });

    // Tự động tắt sau 3 giây
    setTimeout(() => {
      set({ toastData: null });
    }, 3000);
  },

  // Hàm tắt thủ công (nếu muốn bấm nút X)
  hideToast: () => set({ toastData: null }),
}));