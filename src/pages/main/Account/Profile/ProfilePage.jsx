import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../../features/auth/auth.store';
import { useOrderStore } from '../../../../features/order/order.store';
import './ProfilePage.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { userInfo, updateProfile, isLoading } = useAuthStore();
  const { getMyOrdersList } = useOrderStore();

  // --- STATE 1: QUẢN LÝ THÔNG TIN CÁ NHÂN ---
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  // --- STATE 2: QUẢN LÝ MẬT KHẨU ---
  const [passData, setPassData] = useState({
    password: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState({ type: '', text: '' }); // type: 'success' | 'error'

  // Load dữ liệu khi vào trang
  useEffect(() => {
    if (!userInfo) {
      navigate('/auth/login');
    } else {
      setProfileData({
        name: userInfo.name || '',
        email: userInfo.email || '',
        phone: userInfo.phone || '',
        address: userInfo.address || ''
      });
      getMyOrdersList();
    }
  }, [userInfo, navigate, getMyOrdersList]);

  // --- XỬ LÝ 1: CẬP NHẬT THÔNG TIN ---
  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    // Chỉ gửi name, phone, address (Không gửi password)
    const success = await updateProfile({
      name: profileData.name,
      phone: profileData.phone,
      address: profileData.address,
    });

    if (success) {
      setMessage({ type: 'success', text: 'Đã cập nhật thông tin thành công!' });
    } else {
      setMessage({ type: 'error', text: 'Cập nhật thất bại, vui lòng thử lại.' });
    }
  };

  // --- XỬ LÝ 2: ĐỔI MẬT KHẨU ---
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (passData.password.length < 6) {
      setMessage({ type: 'error', text: 'Mật khẩu phải có ít nhất 6 ký tự!' });
      return;
    }

    if (passData.password !== passData.confirmPassword) {
      setMessage({ type: 'error', text: 'Mật khẩu xác nhận không khớp!' });
      return;
    }

    // Chỉ gửi password (Backend sẽ giữ nguyên name, phone cũ)
    const success = await updateProfile({
      password: passData.password
    });

    if (success) {
      setMessage({ type: 'success', text: 'Đổi mật khẩu thành công!' });
      setPassData({ password: '', confirmPassword: '' }); // Reset form pass
    } else {
      setMessage({ type: 'error', text: 'Đổi mật khẩu thất bại.' });
    }
  };

  return (
    <div className="profile-page container">
      <h2 className="page-title">Hồ sơ cá nhân</h2>
      
      {/* Thông báo chung */}
      {message.text && (
        <div className={`alert ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="profile-layout">
        
        {/* --- FORM 1: THÔNG TIN CHUNG --- */}
        <div className="profile-section">
          <h3 className="section-header">Thông tin chung</h3>
          <form onSubmit={handleUpdateInfo}>
            <div className="form-group">
              <label>Họ và tên</label>
              <input 
                type="text" 
                value={profileData.name}
                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                value={profileData.email} 
                disabled 
                className="input-disabled"
              />
              <span className="note">Email không thể thay đổi</span>
            </div>

            <div className="form-group">
              <label>Số điện thoại</label>
              <input 
                type="text" 
                value={profileData.phone}
                onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                placeholder="Nhập số điện thoại"
              />
            </div>

            <div className="form-group">
              <label>Địa chỉ</label>
              <input 
                type="text" 
                value={profileData.address}
                onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                placeholder="Nhập địa chỉ giao hàng"
              />
            </div>

            <button type="submit" className="btn-save" disabled={isLoading}>
              {isLoading ? 'Đang lưu...' : 'Lưu thông tin'}
            </button>
          </form>
        </div>

        {/* --- FORM 2: BẢO MẬT (ĐỔI MK) --- */}
        <div className="profile-section security-section">
          <h3 className="section-header">Bảo mật</h3>
          <form onSubmit={handleChangePassword}>
            <div className="form-group">
              <label>Mật khẩu mới</label>
              <input 
                type="password" 
                value={passData.password}
                onChange={(e) => setPassData({...passData, password: e.target.value})}
                placeholder="Nhập mật khẩu mới"
              />
            </div>

            <div className="form-group">
              <label>Xác nhận mật khẩu</label>
              <input 
                type="password" 
                value={passData.confirmPassword}
                onChange={(e) => setPassData({...passData, confirmPassword: e.target.value})}
                placeholder="Nhập lại mật khẩu mới"
              />
            </div>

            <button type="submit" className="btn-save btn-security" disabled={isLoading}>
              Đổi mật khẩu
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;