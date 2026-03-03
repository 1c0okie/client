// src/components/common/SearchBox/SearchBox.jsx
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFilterStore } from '../../../features/books/filter.store';
import { useDebounce } from '../../../hooks/useDebounce';
import { FaSearch } from 'react-icons/fa';
import './SearchBox.css'; // Tách CSS riêng hoặc dùng chung Header.css tùy bạn

const SearchBox = () => {
  const navigate = useNavigate();
  const setSearchText = useFilterStore((state) => state.setSearchText);

  // State nội bộ
  const [localSearch, setLocalSearch] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  
  const debouncedSearch = useDebounce(localSearch, 300);
  const searchContainerRef = useRef(null);

  // Logic lọc dữ liệu
  useEffect(() => {
    if (debouncedSearch.trim() === '') {
      setSearchResult([]);
      return;
    }
    const filtered = BOOKS.filter(book => 
      book.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
    setSearchResult(filtered);
  }, [debouncedSearch]);

  // Logic submit
  const handleSearchSubmit = () => {
    setSearchText(localSearch);
    setShowResult(false);
    navigate('/shop');
  };

  // Logic click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowResult(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="search-wrapper" ref={searchContainerRef}>
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Tìm kiếm sách..." 
          value={localSearch}
          onChange={(e) => {
            setLocalSearch(e.target.value);
            setShowResult(true);
          }}
          onFocus={() => setShowResult(true)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
        />
        <button className="search-btn" onClick={handleSearchSubmit}>
        <FaSearch />
        </button>
      </div>

      {showResult && localSearch && (
        <div className="search-dropdown">
          {searchResult.length > 0 ? (
            <>
              {searchResult.slice(0, 5).map((book) => (
                <Link 
                  to={`/book/${book._id}`} 
                  key={book._id} 
                  className="search-item"
                  onClick={() => setShowResult(false)}
                >
                  <img src={book.image} alt="" />
                  <div className="search-item-info">
                    <p className="search-item-title">{book.title}</p>
                    <p className="search-item-price">{book.price.toLocaleString('vi-VN')}₫</p>
                  </div>
                </Link>
              ))}
              {searchResult.length > 5 && (
                <div className="search-view-more" onClick={handleSearchSubmit}>
                  Xem thêm {searchResult.length - 5} sản phẩm khác...
                </div>
              )}
            </>
          ) : (
            <div className="search-no-result">Không tìm thấy sản phẩm nào</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBox;