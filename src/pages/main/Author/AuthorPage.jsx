import { useParams, Link } from 'react-router-dom';
import BookCard from '../../../components/book/BookCard/BookCard';
import { FaBirthdayCake, FaGlobeAmericas, FaAward  } from 'react-icons/fa';
import './AuthorPage.css';

const AuthorPage = () => {
  const { name } = useParams(); // Lấy tên từ URL
  
  // 1. Tìm thông tin tác giả trong danh sách AUTHORS
  // (Decode URI để xử lý các ký tự đặc biệt hoặc khoảng trắng)
  const decodedName = decodeURIComponent(name);
  const authorInfo = AUTHORS.find(a => a.name === decodedName);

  // 2. Lọc các sách của tác giả này từ danh sách BOOKS
  const authorBooks = BOOKS.filter(book => book.author === decodedName);

  // Nếu không có thông tin chi tiết (do chưa nhập trong AUTHORS), ta dùng thông tin mặc định
  const displayInfo = authorInfo || {
    name: decodedName,
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", // Ảnh mặc định
    bio: "Thông tin về tác giả này đang được cập nhật...",
    nationality: "Không rõ",
    birth: "Không rõ"
  };

  return (
    <div className="author-page container">
      {/* PHẦN 1: THÔNG TIN TÁC GIẢ */}
      <div className="author-profile">
        <div className="author-img-wrapper">
           <img src={displayInfo.image} alt={displayInfo.name} />
        </div>
        
        <div className="author-details">
          <h1 className="author-name">{displayInfo.name}</h1>
          
          <div className="author-meta">
            <p><FaBirthdayCake /> Sinh năm: <span>{displayInfo.birth}</span></p>
            <p><FaGlobeAmericas /> Quốc tịch: <span>{displayInfo.nationality}</span></p>
          </div>

          <div className="author-bio">
            <h3>Giới thiệu</h3>
            <p>{displayInfo.bio}</p>
          </div>

          {displayInfo.awards && (
            <div className="author-awards">
              <h3><FaAward  /> Giải thưởng</h3>
              <div className="tags">
                {displayInfo.awards.map((award, index) => (
                  <span key={index} className="award-tag">{award}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* PHẦN 2: SÁCH CỦA TÁC GIẢ */}
      <div className="author-books-section">
        <h2 className="section-title">
          Sách của {displayInfo.name} ({authorBooks.length})
        </h2>

        {authorBooks.length > 0 ? (
          <div className="shop-grid"> {/* Tận dụng class grid cũ của trang Shop */}
            {authorBooks.map(book => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <p className="no-books">Hiện tại chưa có sách nào của tác giả này tại cửa hàng.</p>
        )}
      </div>
    </div>
  );
};

export default AuthorPage;