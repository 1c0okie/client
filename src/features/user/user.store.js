import { create } from 'zustand';
import http from '../../lib/http';

export const useUserAdminStore = create((set, get) => ({
  usersList: [],
  isLoading: false,

  // 1. Lấy danh sách
  getUsersAdmin: async () => {
    set({ isLoading: true });
    try {
      const data = await http.get('/users');
      set({ usersList: data, isLoading: false });
    } catch (error) {
      console.error(error);
      set({ isLoading: false });
    }
  },

  // 2. Thay đổi quyền (Admin <-> User)
  updateRoleAdmin: async (id, isAdmin) => {
    try {
      await http.put(`/users/${id}/role`, { isAdmin });
      alert("Cập nhật phân quyền thành công!");
      get().getUsersAdmin(); // Load lại bảng
    } catch (error) {
      alert(error.response?.data?.message || "Lỗi cập nhật quyền");
    }
  },

  // 3. Xóa User
  deleteUserAdmin: async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa vĩnh viễn tài khoản này?")) {
      try {
        await http.delete(`/users/${id}`);
        alert("Đã xóa người dùng!");
        get().getUsersAdmin(); // Load lại bảng
      } catch (error) {
        alert(error.response?.data?.message || "Lỗi khi xóa người dùng");
      }
    }
  }
}));