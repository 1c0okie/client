import { create } from 'zustand';
import http from '../../lib/http';

export const useBookStore = create((set, get) => ({
  books: [],
  isLoading: false,

  // 1. Lấy danh sách sách
  getBooksList: async () => {
    set({ isLoading: true });
    try {
      const data = await http.get('/books');
      set({ books: data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error(error);
    }
  },

  // 2. Tạo sách mới (mặc định)
  createBookAdmin: async () => {
    try {
      await http.post('/books', {});
      get().getBooksList(); // Load lại bảng
    } catch (error) {
      alert(error.response?.data?.message || "Lỗi khi tạo sách");
    }
  },

  // 3. Xóa sách
  deleteBookAdmin: async (id) => {
    try {
      await http.delete(`/books/${id}`);
      get().getBooksList(); // Load lại bảng
    } catch (error) {
      alert(error.response?.data?.message || "Lỗi khi xóa sách");
    }
  },

  // 4. Cập nhật sách
  updateBookAdmin: async (id, bookData) => {
    try {
      await http.put(`/books/${id}`, bookData);
      alert("Cập nhật sách thành công!");
      get().getBooksList(); // Load lại bảng
      return true; // Trả về true để Component biết mà đóng Modal
    } catch (error) {
      alert(error.response?.data?.message || "Lỗi khi cập nhật sách");
      return false;
    }
  }
}));