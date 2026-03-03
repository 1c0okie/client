import { create } from 'zustand';
import http from '../../lib/http'; // Import instance http đã cấu hình

export const useAuthStore = create((set) => ({
  // 1. Khởi tạo State: Lấy từ LocalStorage nếu có
  userInfo: localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')) 
    : null,

  isLoading: false,
  error: null,

  // 2. Hàm Đăng Nhập
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      // Gọi API: POST /api/users/login
      const data = await http.post('/users/login', { email, password });

      // Lưu kết quả (bao gồm token, name, phone, address...) vào Store & LocalStorage
      set({ userInfo: data, isLoading: false });
      localStorage.setItem('userInfo', JSON.stringify(data));
      
      return true; // Thành công
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error.response?.data?.message || error.message 
      });
      return false; // Thất bại
    }
  },

  // 3. Hàm Đăng Ký
  register: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      // Gọi API: POST /api/users
      const data = await http.post('/users', { name, email, password });

      set({ userInfo: data, isLoading: false });
      localStorage.setItem('userInfo', JSON.stringify(data));
      
      return true;
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error.response?.data?.message || error.message 
      });
      return false;
    }
  },

  // 4. Hàm Cập Nhật Profile (Quan trọng cho phần Phone/Address)
  updateProfile: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      // userData chứa: { name, password, phone, address }
      // Gọi API: PUT /api/users/profile
      const data = await http.put('/users/profile', userData);

      // Backend trả về user mới (đã có phone/address), ta cập nhật lại Store
      set({ userInfo: data, isLoading: false });

      localStorage.setItem('userInfo', JSON.stringify(data));
    
      return true;
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error.response?.data?.message || error.message 
      });
      return false;
    }
  },

  // 5. Hàm Đăng Xuất
  logout: () => {
    localStorage.removeItem('userInfo');
    set({ userInfo: null });
    // Có thể thêm điều hướng về trang chủ ở component gọi hàm này
  },
}));