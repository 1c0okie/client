import { create } from 'zustand';
import http from '../../lib/http'; // Dùng http.js đã cấu hình token

export const useOrderStore = create((set,get) => ({
  isLoading: false,
  error: null,
  orderSuccess: false, // Cờ báo hiệu đặt hàng thành công
  myOrders: [], // State lưu danh sách đơn hàng

  // 1. Hàm gọi API tạo đơn hàng (Đã có)
  // Thêm vào state của useOrderStore
  dashboardData: null,

  getDashboardStatsAdmin: async () => {
    set({ isLoading: true });
    try {
      // Gọi API vừa tạo
      const data = await http.get('/orders/stats/dashboard');
      set({ dashboardData: data, isLoading: false });
    } catch (error) {
      console.error("Lỗi lấy thống kê:", error);
      set({ isLoading: false });
    }
  },
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
  // ==========================================
  // --- STATE VÀ HÀM DÀNH CHO ADMIN ---
  // ==========================================
  
  // State chứa danh sách toàn bộ đơn hàng của hệ thống
  allOrders: [],

  // 1. Lấy tất cả đơn hàng
  getAllOrdersAdmin: async () => {
    set({ isLoading: true });
    try {
      // Gọi API GET /api/orders
      const data = await http.get('/orders');
      
      // Lưu dữ liệu vào biến allOrders
      set({ allOrders: data, isLoading: false });
    } catch (error) {
      console.error(error);
      set({ isLoading: false });
      alert(error.response?.data?.message || "Lỗi khi tải danh sách đơn hàng");
    }
  },

  // 2. Cập nhật trạng thái đơn hàng
  updateOrderStatusAdmin: async (orderId, newStatus) => {
    try {
      // Gọi API PUT /api/orders/:id/status
      await http.put(`/orders/${orderId}/status`, { status: newStatus });
      
      alert("Cập nhật trạng thái đơn hàng thành công!");
      
      // Sau khi cập nhật thành công, gọi lại hàm lấy danh sách để UI tự động refresh
      get().getAllOrdersAdmin(); 
      
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Lỗi khi cập nhật trạng thái");
    }
  }
}));