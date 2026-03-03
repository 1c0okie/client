// src/pages/main/Shop/ShopPage.jsx
import { useState, useEffect, useRef } from 'react';
import http from '../../../lib/http';
import Herobanner from '../../../components/layout/HeroBanner/HeroBanner';
import BookCard from '../../../components/book/BookCard/BookCard';
import SidebarFilter from '../../../components/SidebarFilter/SidebarFilter'; 
import Pagination from '../../../components/ui/Pagination/Pagination';
import { useFilterStore } from '../../../features/books/filter.store';
import { CATEGORY_LABELS } from '../../../lib/constants';
import { FaChevronDown, FaCheck } from 'react-icons/fa'; 
import './ShopPage.css';

// Định nghĩa các tùy chọn sắp xếp
const SORT_OPTIONS = [
  { value: 'default', label: 'Mặc định' },
  { value: 'best-seller', label: 'Bán chạy nhất' },
  { value: 'price-asc', label: 'Giá: Thấp đến Cao' },
  { value: 'price-desc', label: 'Giá: Cao đến Thấp' },
  { value: 'name-asc', label: 'Tên: A - Z' },
];

const ShopPage = () => {
  const { searchText, selectedCategory } = useFilterStore();
  
  // State quản lý Dropdown sắp xếp
  const [sortOption, setSortOption] = useState('default');
  const [isSortOpen, setIsSortOpen] = useState(false); 
  const sortRef = useRef(null); 

  // 2. State chứa dữ liệu thật từ API
  const [books, setBooks] = useState([]); 
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;
  const TOP_LIMIT = 10;

  // --- 3. GỌI API LẤY SÁCH ---
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const data = await http.get('/books'); 
        setBooks(data); // Lưu dữ liệu vào state
        setLoading(false);
      } catch (error) {
        console.error("Lỗi tải sách:", error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // --- LOGIC XỬ LÝ CLICK RA NGOÀI ĐỂ ĐÓNG DROPDOWN ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- LOGIC XỬ LÝ DỮ LIỆU ---
  // Dùng 'books' (state) thay vì 'BOOKS' (const)
  let processedBooks = [...books]; 

  // 1. Lọc theo Search Text
  if (searchText) {
    processedBooks = processedBooks.filter((book) =>
      book.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  // 2. Xử lý theo Category & Tiêu đề
  let pageTitle = "Tất cả sách";

  if (searchText) {
    pageTitle = `Kết quả tìm kiếm: "${searchText}"`;
  } else {
    switch (selectedCategory) {
      case "Best Seller":
        processedBooks.sort((a, b) => b.sold - a.sold);
        processedBooks = processedBooks.slice(0, TOP_LIMIT);
        pageTitle = "🔥 Sách Bán Chạy Nhất";
        break;
      case "Trending":
        processedBooks.sort((a, b) => b.rating - a.rating);
        processedBooks = processedBooks.slice(0, TOP_LIMIT);
        pageTitle = "⭐ Xu Hướng Đang Hot";
        break;
      case "New Arrival":
        // Sửa logic: MongoDB dùng _id dạng chuỗi, nên sort theo createdAt
        processedBooks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        processedBooks = processedBooks.slice(0, TOP_LIMIT);
        pageTitle = "✨ Sách Mới Nhập";
        break;
      case "All":
      case "Tất cả":
        pageTitle = "Tất cả sản phẩm";
        break;
      default:
        processedBooks = processedBooks.filter((book) => book.category === selectedCategory);
        const vietnameseName = CATEGORY_LABELS[selectedCategory] || selectedCategory;
        pageTitle = `Danh mục: ${vietnameseName}`;
        break;
    }
  }

  // 3. Xử lý Sắp xếp thủ công (Ghi đè)
  if (sortOption !== 'default') {
    switch (sortOption) {
      case 'price-asc': processedBooks.sort((a, b) => a.price - b.price); break;
      case 'price-desc': processedBooks.sort((a, b) => b.price - a.price); break;
      case 'name-asc': processedBooks.sort((a, b) => a.title.localeCompare(b.title)); break;
      case 'best-seller': processedBooks.sort((a, b) => b.sold - a.sold); break;
    }
  }

  // 4. Phân trang
  const totalPages = Math.ceil(processedBooks.length / ITEMS_PER_PAGE);
  const currentBooks = processedBooks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, selectedCategory, sortOption]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="shop-page container">
      <div className="shop-sidebar">
        <SidebarFilter />
      </div>

      <div className="shop-content">
        <Herobanner />
        
        <div className="shop-toolbar">
          <div className="toolbar-left">
             <h2 className="shop-title">{pageTitle}</h2>
             <p className="result-count">
               {/* Hiển thị Loading hoặc Số lượng */}
               {loading ? 'Đang tải...' : <>Hiển thị <strong>{processedBooks.length}</strong> kết quả</>}
             </p>
          </div>
          
          {/* --- CUSTOM DROPDOWN --- */}
          <div className="sort-wrapper" ref={sortRef}>
            <label>Sắp xếp:</label>
            
            <div 
              className={`custom-dropdown ${isSortOpen ? 'open' : ''}`} 
              onClick={() => setIsSortOpen(!isSortOpen)}
            >
              <span className="current-sort">
                {SORT_OPTIONS.find(opt => opt.value === sortOption)?.label}
              </span>
              <FaChevronDown className="dropdown-arrow" />
              
              {/* Menu xổ xuống */}
              {isSortOpen && (
                <div className="dropdown-list">
                  {SORT_OPTIONS.map((opt) => (
                    <div 
                      key={opt.value}
                      className={`dropdown-item ${sortOption === opt.value ? 'selected' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation(); 
                        setSortOption(opt.value);
                        setIsSortOpen(false);
                      }}
                    >
                      {opt.label}
                      {sortOption === opt.value && <FaCheck className="check-icon" />}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* ----------------------- */}
        </div>

        {/* LOADING UI & GRID */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
            <h3>Đang tải dữ liệu sách...</h3>
          </div>
        ) : currentBooks.length > 0 ? (
          <>
            <div className="shop-grid">
              {currentBooks.map((book) => (
                // Lưu ý: MongoDB trả về _id, nhưng code cũ dùng key={book._id}
                // Ta dùng fallback: book._id hoặc book._id
                <BookCard key={book._id} book={book} />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
              />
            )}
          </>
        ) : (
          <div className="no-result">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png" 
              alt="No result" 
              width="100"
            />
            <p>Không tìm thấy sách phù hợp!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;