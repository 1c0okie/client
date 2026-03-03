// src/components/layout/Header/Header.jsx
import { useState, useEffect } from 'react'; // <--- Thêm useEffect
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../../../features/cart/cart.store';
import { useFilterStore } from '../../../features/books/filter.store';
import { useDebounce } from '../../../hooks/useDebounce'; // <--- Import Hook vừa viết
import Badge from '../../ui/Badge/Badge';
import NavBar from '../NavBar/NavBar';
import SearchBox from '../../common/SearchBox/SearchBox';
import { CiShoppingCart } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { useAuthStore } from '../../../features/auth/auth.store';
import { CiPhone, CiCircleInfo  } from "react-icons/ci";
import './Header.css';

const Header = () => {

  const { userInfo, logout } = useAuthStore(); // 2. Lấy userInfo & logout
    
  const items = useCartStore((state) => state.items);
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
  
  // 1. Dùng state nội bộ để hứng chữ người dùng gõ ngay lập tức (để hiển thị trên ô input)
  const [localSearch, setLocalSearch] = useState('');
  
  // 2. Tạo biến debounce: Biến này chỉ thay đổi sau khi localSearch dừng biến động 0.5s
  const debouncedSearchText = useDebounce(localSearch, 500);

  const setSearchText = useFilterStore((state) => state.setSearchText);
  const navigate = useNavigate();

  // 3. Khi debouncedSearchText thay đổi thật sự thì mới bắn lên Store để lọc
  useEffect(() => {
    setSearchText(debouncedSearchText);
  }, [debouncedSearchText, setSearchText]);

  const handleSearchChange = (e) => {
    setLocalSearch(e.target.value);
    navigate('/'); 
  };

  return (
    <header className="header">
      <div className="container header-container">
        {/* ... Logo giữ nguyên */}
        <div className="logo">
          <Link to="/"><img className='logo-icon' src="/logo1.svg" alt="logo" /></Link>
        </div>
        {/* SEARCH BOX (Đã tách riêng) */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
           <SearchBox />
        </div>

        {/* ... Nav links giữ nguyên */}
        <nav className="nav-links">

          <Link to="/cart"  className="cart-link" style={{position: 'relative'}}>
          Giỏ hàng 
          <CiShoppingCart  className="cart-icon" />
          <Badge count={totalQuantity} />
          </Link>

          
          {/* 3. LOGIC HIỂN THỊ USER */}
        {userInfo ? (
          // A. NẾU ĐÃ ĐĂNG NHẬP
          <div className="user-dropdown">
            {userInfo.name}
            <div className="dropdown-menu">
              <Link className='link-profile' to="/account/profile">Hồ sơ</Link>
              <button onClick={logout}>Đăng xuất</button>
            </div>
            <CiUser className='cart-icon'/>
          </div>
        ) : (
          // B. NẾU CHƯA ĐĂNG NHẬP
           <Link to="/auth/login" className="btn-login">Đăng nhập <CiUser className='cart-icon'/></Link>
        )}
        </nav>
       
      </div> 
      <NavBar />
    </header>
  );
};

export default Header;