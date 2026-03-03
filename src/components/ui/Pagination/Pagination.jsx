import './Pagination.css';
import { IoIosArrowForward,IoIosArrowBack } from "react-icons/io";
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Tạo mảng số trang [1, 2, 3...]
  const pages = [...Array(totalPages).keys()].map(num => num + 1);

  if (totalPages <= 1) return null;

  return (
    <div className="ui-pagination">
      <button 
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <IoIosArrowBack />
      </button>

      {pages.map(page => (
        <button
          key={page}
          className={page === currentPage ? 'active' : ''}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button 
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default Pagination;