import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import './AccountLayout.css';
import { CiUser, CiLogout } from "react-icons/ci";
import { GoHistory } from "react-icons/go";
import { useAuthStore } from '../../../features/auth/auth.store'; // Import Store chứa thông tin User

const AccountLayout = () => {
  const navigate = useNavigate();
  
  // Lấy userInfo và hàm logout từ Store
  const { userInfo, logout } = useAuthStore();

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
      logout(); // Xóa token & thông tin trong localStorage
      navigate('/login'); // Đẩy người dùng về trang đăng nhập (hoặc '/')
    }
  };

  // Lấy chữ cái đầu tiên của tên để làm Avatar (nếu chưa có tên thì dùng chữ 'U' mặc định)
  const avatarLetter = userInfo?.name ? userInfo.name.charAt(0).toUpperCase() : 'U';

  return (
    <div className="account-layout container">
      {/* SIDEBAR MENU */}
      <div className="account-sidebar">
        <div className="user-brief">
          <div className="user-avatar">{avatarLetter}</div>
          <div className="user-info">
            {/* Hiển thị Tên thật và Email thật từ Backend */}
            <strong>{userInfo?.name || 'Người dùng'}</strong>
            <span style={{ fontSize: '12px', color: '#888' }}>
              {userInfo?.email || ''}
            </span>
          </div>
        </div>

        <nav className="account-nav">
          <NavLink to="/account/profile" className={({isActive}) => isActive ? 'active' : ''}>
            <CiUser className="icon" /> Hồ sơ cá nhân
          </NavLink>
          <NavLink to="/account/orders" className={({isActive}) => isActive ? 'active' : ''}>
            <GoHistory className="icon" /> Lịch sử đơn hàng
          </NavLink>
          
          {/* Nút đăng xuất đã gắn hàm xử lý thật */}
          <button className="btn-logout" onClick={handleLogout}>
            <CiLogout className="icon" /> Đăng xuất
          </button>
        </nav>
      </div>

      {/* NỘI DUNG CHÍNH (ProfilePage hoặc OrderHistoryPage sẽ render ở đây) */}
      <div className="account-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AccountLayout;