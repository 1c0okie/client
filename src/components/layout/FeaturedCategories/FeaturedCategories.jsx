import { useFilterStore } from '../../../features/books/filter.store';
import './FeaturedCategories.css';
import { Link, useNavigate } from 'react-router-dom';
const FeaturedCategories = () => {
  const { setSelectedCategory } = useFilterStore();

  // Danh sách cập nhật theo đúng tên file ảnh bạn đã gửi
  const categories = [
    { id: 'Fantasy', label: 'Fantasy', image: '/FANTASY.jpg', u:'' },
    { id: 'Young Adult', label: 'Young Adult', image: '/YOUNG ADULT.jpg' },
    { id: 'Mystery & Thriller', label: 'Trinh thám', image: '/MYSTERY & THRILLER.jpg' },
    { id: 'Action & Adventure', label: 'Hành động', image: '/ACTION & ADVENTURE.jpg' },
    { id: 'Science Fiction', label: 'Sci-Fi', image: '/SCIENCE FICTION.jpg' },
    { id: 'Non-Fiction', label: 'Kiến thức', image: '/NON-FICTION.jpg' },
    { id: 'Literary Fiction', label: 'Văn học', image: '/LITERARY FICTION.jpg' },
    { id: 'Horror', label: 'Kinh dị', image: '/HORROR.jpg' },
    { id: 'Historical Fiction', label: 'Lịch sử', image: '/HISTORICAL FICTION.jpg' },
    { id: "Children's", label: 'Thiếu nhi', image: "/CHILDREN'S.jpg" },
    { id: 'Biographies & History', label: 'Tiểu sử', image: '/BIOGRAPHIES & HISTORY.jpg' },
    { id: 'Romance', label: 'Lãng mạn', image: '/ROMANCE.jpg' },
  ];

  return (
    <div className="featured-categories-container">
      <h3 className="featured-title">Khám phá theo thể loại</h3>
      <div className="categories-grid">
        {categories.map((cat) => (
          <Link 
            to='/shop'
            key={cat.id} 
            className="cat-item" 
            onClick={() => setSelectedCategory(cat.id)}
          >
            {/* Thay thẻ div icon bằng thẻ img */}
            <div className="cat-img-wrapper">
              <img src={cat.image} alt={cat.label} className="cat-img" />
            </div>
            <span className="cat-label">{cat.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;