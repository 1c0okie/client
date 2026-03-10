import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaChartBar, FaBook, FaShoppingCart, FaUsers, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { useAuthStore } from '../../../features/auth/auth.store';
import './AdminLayout.css';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userInfo } = useAuthStore();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const MENU_ITEMS = [
    { path: '/admin/dashboard', label: 'Tổng quan', icon: <FaChartBar /> },
    { path: '/admin/products', label: 'Quản lý Sách', icon: <FaBook /> },
    { path: '/admin/orders', label: 'Đơn hàng', icon: <FaShoppingCart /> },
    { path: '/admin/users', label: 'Người dùng', icon: <FaUsers /> },
  ];

  const handleLogout = () => {
    if (window.confirm('Bạn có chắc chắn muốn đăng xuất khỏi trang Quản trị?')) {
      localStorage.removeItem('userInfo');
      navigate('/');
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="admin-layout">
      {/* 1. TOPBAR NẰM ĐỘC LẬP TRÊN CÙNG (Luôn đứng im) */}
      <header className="admin-topbar">
        <div className="topbar-left">
          <button className="menu-toggle-btn" onClick={toggleSidebar}>
            <FaBars />
          </button>
          <div className="logo">
            <Link to="/">
              <img className="logo-icon" src="/logo1.svg" alt="logo" />
            </Link>
          </div>
        </div>

        <div className="topbar-right">
          <span className="admin-greeting">Xin chào, <strong>{userInfo?.name || 'Admin'}</strong></span>
          <FaUserCircle className="admin-avatar" />
        </div>
      </header>

      {/* 2. PHẦN THÂN (Chứa Sidebar và Nội dung trang) */}
      <div className="admin-body">
        {/* SIDEBAR */}
        <aside className={`admin-sidebar ${isSidebarOpen ? '' : 'closed'}`}>
          <nav className="admin-nav">
            <div className="nav-title">MENU CHÍNH</div>
            {MENU_ITEMS.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`nav-item ${location.pathname.includes(item.path) ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="admin-logout">
            <button onClick={handleLogout} className="logout-btn">
              <FaSignOutAlt /> <span className="nav-label">Đăng xuất</span>
            </button>
          </div>
        </aside>

        {/* NỘI DUNG CHÍNH (Table, Form...) */}
        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;