import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaBars, FaChevronRight, FaClipboardList } from 'react-icons/fa';
import { useFilterStore } from '../../../features/books/filter.store';
import { CiDeliveryTruck,CiFacebook,CiInstagram ,CiMenuBurger    } from "react-icons/ci";
import './NavBar.css'; // Tạo file này ở bước 2
import { CiPhone, CiCircleInfo  } from "react-icons/ci";
const NavBar = () => {
  const { setSelectedCategory } = useFilterStore();

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
  };

  return (
    <div className="navbar">
      <div className="container navbar-container">
        
        {/* 1. MENU DANH MỤC (BÊN TRÁI) */}
        <div className="nav-dropdown-wrapper">
          <div className="nav-dropdown-btn">
            <CiMenuBurger   className="icon-menu" />
            <span className='menu-store'>DANH MỤC</span>
          </div>

          {/* Menu xổ xuống */}
          <div className="nav-dropdown-content">
            {/* Mục 1: Trang chủ */}
            <Link to="/" className="nav-item">Trang chủ</Link>
            
            {/* Mục 2: Tác giả bán chạy (Demo) */}
            <Link to="/shop" className="nav-item">
              Tác giả bán chạy <span className="badge-hot">Hot</span>
            </Link>
            
            {/* Mục 3: Thể loại (Có menu con) */}
           
            <div className="nav-item has-submenu">
            
              <span>Thể loại</span>
              <FaChevronRight className="arrow-right" />
              
              {/* Menu con cấp 2 */}
              <div className="submenu">
                <div className="submenu-group">
                  <strong>Fiction (Hư cấu)</strong>
                  <Link to="/shop" onClick={() => handleCategoryClick('Fantasy')}>Fantasy</Link>
                  <Link to="/shop" onClick={() => handleCategoryClick('Science Fiction')}>Science Fiction</Link>
                  <Link to="/shop" onClick={() => handleCategoryClick('Horror')}>Kinh dị</Link>
                  <Link to="/shop" onClick={() => handleCategoryClick('Romance')}>Lãng mạn</Link>
                </div>
                <div className="submenu-group">
                  <strong>Non-Fiction (Phi hư cấu)</strong>
                  <Link to="/shop" onClick={() => handleCategoryClick('Non-Fiction')}>Kiến thức chung</Link>
                  <Link to="/shop" onClick={() => handleCategoryClick('Biographies & History')}>Tiểu sử & Lịch sử</Link>
                  <Link to="/shop" onClick={() => handleCategoryClick('Business')}>Kinh doanh</Link>
                </div>
              </div>
              
            </div>
       
            <Link to="/shop" className="nav-item">
              Điểm tin <span className="badge-hot">Hot</span>
            </Link>
            <Link to="/shop" className="nav-item">
              Ưu đãi <span className="badge-hot">Hot</span>
            </Link>
          </div>
        </div>

        {/* 2. CÁC TIỆN ÍCH (BÊN PHẢI) */}
        <div className="nav-utilities">
        <Link to="/contact" className="util-link" >
          Liên hệ
          <CiPhone className="cart-icon" />
        </Link>
        <Link to="/about" className="util-link">
          Giới thiệu 
          <CiCircleInfo  className="cart-icon" />
        </Link>
          {/* Kiểm tra đơn hàng */}
          <Link to="/account/orders" className="util-link">
            Kiểm tra đơn hàng<CiDeliveryTruck className='nav-icon' /> 
          </Link>
          
          <div className="divider">|</div>

          {/* Mạng xã hội */}
          <span className="social-label">Kết nối:</span>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="fb-icon">
            <CiFacebook className='nav-icon' />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="ins-icon">
            <CiInstagram className='nav-icon' />
          </a>
        </div>

      </div>
    </div>
  );
};

export default NavBar;