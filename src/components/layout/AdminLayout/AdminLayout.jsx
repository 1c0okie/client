// src/components/layout/AdminLayout/AdminLayout.jsx
import { Outlet, Link, useLocation } from 'react-router-dom';
import './AdminLayout.css'; // Tạo CSS bên dưới

const AdminLayout = () => {
  const location = useLocation();

  const MENU_ITEMS = [
    { path: '/admin/dashboard', label: '📊 Tổng quan', icon: 'dashboard' },
    { path: '/admin/products', label: '📚 Quản lý Sách', icon: 'book' },
    { path: '/admin/orders', label: '📦 Đơn hàng', icon: 'shopping_cart' },
    { path: '/admin/users', label: '👥 Người dùng', icon: 'people' },
  ];

  return (
    <div className="admin-layout">
      {/* SIDEBAR BÊN TRÁI */}
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <h2>Admin CP</h2>
        </div>
        
        <nav className="admin-nav">
          {MENU_ITEMS.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="admin-logout">
          <Link to="/">🚪 Đăng xuất</Link>
        </div>
      </aside>

      {/* NỘI DUNG BÊN PHẢI */}
      <main className="admin-main">
        {/* Header nhỏ của Admin */}
        <header className="admin-header">
          <span>Xin chào, <strong>Administrator</strong></span>
        </header>

        {/* Nội dung thay đổi (Table, Form...) */}
        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;