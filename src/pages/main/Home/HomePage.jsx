// src/pages/main/Home/HomePage.jsx
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import http from '../../../lib/http.js';
import { useFilterStore } from '../../../features/books/filter.store.js';

// Import các component giao diện
import HeroBanner from '../../../components/layout/HeroBanner/HeroBanner';
import FeaturedCategories from '../../../components/layout/FeaturedCategories/FeaturedCategories';
import BookRow from '../../../components/book/BookRow/BookRow';
import OtherRow from '../../../components/layout/OtherRow/OtherRow/OtherRow.jsx';

import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const { setSelectedCategory } = useFilterStore();

  // 1. State chứa dữ liệu thật từ API
  const [books, setBooks] = useState([]); 
  const [loading, setLoading] = useState(true);

  // 2. Gọi API lấy sách khi trang load
  useEffect(() => {
    const fetchBooks = async () => {
      try {
       const data = await http.get('/books');
        setBooks(data); // Lưu dữ liệu thật vào state
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi tải sách:", error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // 3. Hàm chuyển trang khi bấm "Xem tất cả"
  const handleViewAll = (categoryName) => {
    setSelectedCategory(categoryName);
    navigate('/shop');
    window.scrollTo(0, 0);
  };

  // --- LOGIC XỬ LÝ DỮ LIỆU (Dùng biến 'books' thay vì 'BOOKS') ---

  // A. Best Seller: Sắp xếp theo 'sold' giảm dần
  // Lưu ý: Cần kiểm tra books có dữ liệu chưa để tránh lỗi
  const bestSellerBooks = [...books]
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 10);

  // B. Trending: Sắp xếp theo 'rating' giảm dần
  const trendingBooks = [...books]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10);

  // C. Sách Mới: Sắp xếp theo thời gian tạo 'createdAt' (Mới nhất lên đầu)
  // Vì MongoDB lưu _id dạng chuỗi, ta nên dùng createdAt chuẩn hơn
  const newBooks = [...books]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 10);

  // D. Sách Thiếu Nhi (Lọc theo Category trong DB của bạn)
  // Hãy đảm bảo trong DB bạn có sách category là "Children's" hoặc "Thiếu nhi"
  // Ở đây mình ví dụ lọc theo category ID hoặc tên tiếng Anh nếu bạn dùng seeder cũ
  const kidBooks = books.filter(b => 
    b.category === "Children's" || b.category === "Thiếu nhi"
  ).slice(0, 10);


  return (
    <div className="home-page-container">
      <div className="home-content">
        
        {/* Banner & Danh mục */}
        <HeroBanner />
        <FeaturedCategories />

        {/* LOADING UI: Hiển thị khi đang tải dữ liệu */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
            <h3>Đang tải dữ liệu sách...</h3>
          </div>
        ) : (
          /* HIỂN THỊ DỮ LIỆU KHI ĐÃ TẢI XONG */
          <>
            {/* Hàng 1: Best Seller */}
            <BookRow 
              title="Best Seller - Bán Chạy Nhất" 
              books={bestSellerBooks} 
              onViewAll={() => handleViewAll("Best Seller")}
            />

            {/* Hàng 2: Trending */}
            <BookRow 
              title="Trending - Xu Hướng Tuần Này" 
              books={trendingBooks} 
              onViewAll={() => handleViewAll("Trending")}
            />

            {/* Hàng 3: Sách Mới */}
            <BookRow 
              title="Sách Mới Nhập Kho" 
              books={newBooks} 
              onViewAll={() => handleViewAll("New Arrival")}
            />

            {/* Gợi ý thêm */}
            <div className='for-more'>
              <Link className='for-more-text' to="/shop">
                <h3>Khám phá kho sách khổng lồ</h3>
              </Link>
            </div>

            {/* Hàng 4: Sách Thiếu Nhi (Hoặc dùng Trending nếu chưa có sách thiếu nhi) */}
            <OtherRow
              title="Sách Thiếu Nhi Được Yêu Thích"
              books={kidBooks.length > 0 ? kidBooks : trendingBooks} 
            />
          </>
        )}

      </div>
    </div>
  );
};

export default HomePage;