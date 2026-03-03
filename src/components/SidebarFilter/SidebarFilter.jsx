// src/components/layout/SidebarFilter/SidebarFilter.jsx
import { useFilterStore } from '../../features/books/filter.store.js';
import { CATEGORY_LABELS } from '../../lib/constants';  
import './SidebarFilter.css'; // Tạo CSS bên dưới

const CATEGORIES = [
  "All", // Hoặc "Tất cả"
  "Fantasy",
  "Young Adult",
  "Mystery & Thriller",
  "Action & Adventure",
  "Science Fiction",
  "Non-Fiction",
  "Literary Fiction",
  "Horror",
  "Historical Fiction",
  "Children's",
  "Biographies & History",
  "Romance"
];

const SidebarFilter = () => {
  const { selectedCategory, setSelectedCategory } = useFilterStore();

  return (
    <aside className="sidebar-filter">
      <h3 className="filter-title">Danh mục</h3>
      <ul className="category-list">
        {CATEGORIES.map((cat) => (
          <li 
            key={cat} 
            className={selectedCategory === cat || (cat === "All" && selectedCategory === "Tất cả") ? 'active' : ''}
            onClick={() => setSelectedCategory(cat === "All" ? "Tất cả" : cat)}
          >
            {CATEGORY_LABELS[cat] || cat}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SidebarFilter;