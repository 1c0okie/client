// src/components/book/BookCard/BookCard.jsx
import { Link } from 'react-router-dom';
import { useCartStore } from '../../../features/cart/cart.store';
import { CiShoppingCart  } from "react-icons/ci";
import { useToastStore } from '../../../features/ui/toast.store'; // <--- Import
import './BookCard.css'; // Sẽ tạo CSS ngay bên dưới

const BookCard = ({ book }) => {
  const bookId = book._id
  // Tính phần trăm giảm giá
  const discount = Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100);
  const addToCart = useCartStore((state) => state.addToCart);
  const { showToast } = useToastStore(); // <--- Lấy hàm showToast

  const handleQuickAdd = (e) => {
    e.preventDefault(); // Chặn việc bấm nút này mà nó lại nhảy vào trang chi tiết (do thẻ Link bao ngoài)
    addToCart(book);
    showToast(book);
  };
  return (
    <div className="book-card">
      <Link to={`/book/${bookId}`} className="book-link">
        {/* Ảnh bìa */}
        <div className="book-image-wrapper">
          <img src={book.image} alt={book.title} className="book-image" />
          {discount > 0 && <span className="discount-badge">-{discount}%</span>}
        </div>

        {/* Thông tin */}
        <div className="book-info">
          <h3 className="book-title" title={book.title}>{book.title}</h3>
          {/* --- CẬP NHẬT PHẦN NÀY --- */}
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '12px', color: '#777', marginBottom: '5px' }}>
             <span style={{ color: '#fdd835', marginRight: '5px' }}>
               {'★'.repeat(Math.round(book.rating))} 
             </span>
             <span>({book.rating})</span>
             <span style={{ margin: '0 8px' }}>|</span>
             <span style={{ color: '#333' }}>
               Đã bán {book.sold >= 1000 ? `${(book.sold/1000).toFixed(1)}k` : book.sold}
             </span>
          </div>
          {/* ------------------------- */}
          <p className="book-author">{book.author}</p>
          
          <div className="book-price-row">
            <span className="current-price">{book.price.toLocaleString('vi-VN')}₫</span>
            {discount > 0 && (
              <span className="original-price">{book.originalPrice.toLocaleString('vi-VN')}₫</span>
            )}
          </div>
          
        </div>
      </Link>
      
      <button className="btn-add-cart" onClick={handleQuickAdd}>
          <CiShoppingCart  className="bag-icon" />
          <span className='cart-text'>Thêm vào giỏ</span>
        
      </button>
    </div>
  );
};

export default BookCard;