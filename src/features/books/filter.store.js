// src/features/books/filter.store.js
import { create } from 'zustand';

export const useFilterStore = create((set) => ({
  searchText: '', // Từ khóa tìm kiếm
  selectedCategory: 'All', // Thể loại đang chọn

  // Hàm cập nhật từ khóa (dùng cho Header)
  setSearchText: (text) => set({ searchText: text }),

  // Hàm cập nhật thể loại (dùng cho Sidebar)
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));