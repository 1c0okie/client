import { create } from 'zustand';
import http from '../../lib/http'; // Dùng http.js đã cấu hình token

export const useOrderStore = create((set) => ({
  isLoading: false,
  error: null,
  orderSuccess: false, // Cờ báo hiệu đặt hàng thành công
  myOrders: [], // State lưu danh sách đơn hàng

  // 1. Hàm gọi API tạo đơn hàng (Đã có)
  createOrder: async (orderData) => {
    set({ isLoading: true, error: null, orderSuccess: false });
    try {
      const data = await http.post('/orders', orderData);
      
      set({ isLoading: false, orderSuccess: true });
      return data; // Trả về đơn hàng vừa tạo (có _id)
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error.response?.data?.message || error.message 
      });
      return null;
    }
  },

  // 2. Hàm lấy danh sách đơn hàng của tôi (THÊM MỚI ĐOẠN NÀY)
  getMyOrdersList: async () => {
    set({ isLoading: true, error: null });
    try {
      // Gọi API: GET /api/orders/myorders
      const data = await http.get('/orders/myorders');
      
      set({ myOrders: data, isLoading: false });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error.response?.data?.message || error.message 
      });
    }
  },

  resetOrder: () => set({ orderSuccess: false }),
}));