import { useRef } from 'react';
import BookCard from '../BookCard/BookCard';
import './BookRow.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const BookRow = ({ title, books,onViewAll }) => {
  const rowRef = useRef(null);

  const handleScroll = (direction) => {
    const element = rowRef.current;
    if (element) {
      // Lấy chiều rộng hiện tại của khung nhìn
      const width = element.clientWidth;
      
      // Nếu bấm trái thì trừ đi chiều rộng, bấm phải thì cộng thêm
      const scrollAmount = direction === 'left' ? -width : width;

      element.scrollBy({
        left: scrollAmount,
        behavior: 'smooth', // Hiệu ứng trượt mượt
      });
    }
  };

  return (
    <div className="book-row">
      {/* Tiêu đề mục */}
      <h2 className="row-title">
        <span className="title-text">{title}</span>
        {/* Đường gạch trang trí */}
        <span className="title-line"></span> 
        {/* Thêm sự kiện onClick vào đây */}
        <span 
          className="view-all" 
          onClick={onViewAll} 
          style={{cursor: 'pointer'}}
        >
          Xem tất cả ({books.length})
        </span>
      </h2>

      <div className="row-container">
        {/* Nút Trái */}
        <button 
          className="scroll-btn left" 
          onClick={() => handleScroll('left')}
          aria-label="Scroll Left"
        >
          <FaChevronLeft />
        </button>

        {/* Danh sách sách (Scroll Area) */}
        <div className="book-list-scroll" ref={rowRef}>
          {books.map((book) => (
            <div key={book._id} className="book-item-snap">
              <BookCard book={book} />
            </div>
          ))}
        </div>

        {/* Nút Phải */}
        <button 
          className="scroll-btn right" 
          onClick={() => handleScroll('right')}
          aria-label="Scroll Right"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default BookRow;