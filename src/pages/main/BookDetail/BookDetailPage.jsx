// src/pages/main/BookDetail/BookDetailPage.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import http from '../../../lib/http';
import { useCartStore } from '../../../features/cart/cart.store';
import { useToastStore } from '../../../features/ui/toast.store';
import Breadcrumb from '../../../components/ui/Breadcrumb/Breadcrumb';
import './BookDetailPage.css';

const BookDetailPage = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const { addToCart } = useCartStore();
  const { showToast } = useToastStore();

  // 2. Tạo State để lưu dữ liệu sách, trạng thái loading và số lượng
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // 3. Gọi API lấy chi tiết sách khi ID thay đổi
  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        setLoading(true);
        // Gọi API Backend (Proxy đã chuyển /api về port 5000)
        const data = await http.get(`/books/${id}`);
        setBook(data);
        setLoading(false);
      } catch (err) {
        console.error("Lỗi tải sách:", err);
        setError("Không tìm thấy sách hoặc lỗi kết nối.");
        setLoading(false);
      }
    };

    fetchBookDetail();
    setQuantity(1); // Reset số lượng về 1 khi xem sách mới
  }, [id]);

  // 4. Xử lý tăng giảm số lượng
  const handleQuantityChange = (type) => {
    if (type === 'decrease') {
      setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    } else {
      setQuantity((prev) => prev + 1);
    }
  };

  // 5. Xử lý thêm vào giỏ hàng (kèm số lượng)
  const handleAddToCart = () => {
    if (book) {
      addToCart({ ...book, quantity }); // Gửi kèm quantity vào store
      showToast(book);
    }
  };

  // --- RENDERING (Hiển thị) ---

  // Trường hợp đang tải
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px', color: '#666' }}>
        <h3>Đang tải thông tin sách...</h3>
      </div>
    );
  }

  // Trường hợp lỗi hoặc không có sách
  if (error || !book) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h2>😢 {error}</h2>
        <Link to="/" style={{color: '#ff424e', textDecoration: 'none'}}>Quay lại trang chủ</Link>
      </div>
    );
  }

  // Tính toán giảm giá (nếu có)
  const discount = book.originalPrice 
    ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100) 
    : 0;

  return (
    <div className="book-detail-page">
      {/* Breadcrumb (Điều hướng) */}
      <Breadcrumb items={[
        { label: 'Trang chủ', link: '/' },
        { label: 'Cửa hàng', link: '/shop' },
        { label: book.title } // Phần tử cuối không cần link
      ]} />

      <div className="detail-container">
        {/* Cột Trái: Ảnh sách */}
        <div className="detail-left">
          <div className="img-wrapper">
            <img src={book.image} alt={book.title} />
          </div>
        </div>

        {/* Cột Phải: Thông tin chi tiết */}
        <div className="detail-right">
          <h1 className="product-title">{book.title}</h1>
          
          <div className="product-meta">
            <span>Tác giả: 
              <strong>
                <Link to={`/author/${book.author}`} className="author-link">
                   {book.author}
                </Link>
              </strong>
            </span>
            <span>•</span>
            <span>Thể loại: <strong>{book.category}</strong></span>
            <span>•</span>
            <span>Đánh giá: ⭐ {book.rating} ({book.numReviews} đánh giá)</span>
          </div>

          <div className="product-price-box">
            <span className="current-price">{book.price.toLocaleString('vi-VN')}₫</span>
            {discount > 0 && (
              <>
                <span className="original-price">{book.originalPrice.toLocaleString('vi-VN')}₫</span>
                <span className="discount-tag">Giảm {discount}%</span>
              </>
            )}
          </div>

          <div className="product-description">
            <h3>Mô tả sản phẩm</h3>
            <p>{book.description}</p>
          </div>

          {/* Các nút hành động */}
          <div className="action-buttons">
            <div className="quantity-control">
              <button onClick={() => handleQuantityChange('decrease')}>-</button>
              <input type="text" value={quantity} readOnly />
              <button onClick={() => handleQuantityChange('increase')}>+</button>
            </div>
            
            <button className="btn-add-cart-lg" onClick={handleAddToCart}>
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;