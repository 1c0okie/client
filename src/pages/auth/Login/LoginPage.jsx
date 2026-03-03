// src/pages/auth/Login/LoginPage.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthStore } from '../../../features/auth/auth.store';
import { FcGoogle } from 'react-icons/fc'; // Icon Google màu gốc
import { FaFacebook } from 'react-icons/fa'; // Icon Facebook xanh
import Input from '../../../components/ui/Input/Input';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, userInfo } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Nếu đã đăng nhập rồi thì đá về trang chủ ngay
  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const handleLogin = async (e) => {
    e.preventDefault();
   // Gọi hàm login từ store
    const success = await login(email, password);
    
    if (success) {
      navigate('/'); // Chuyển trang nếu thành công
    }
  };

  const handleSocialLogin = (platform) => {
    alert(`Đăng nhập bằng ${platform} (Tính năng đang phát triển)`);
    navigate('/');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Đăng nhập</h2>
        <p className="login-subtitle">Chào mừng bạn quay lại với BookStore</p>
        

        <form onSubmit={handleLogin} className="login-form">
          <Input 
            label="Email" 
            type="email" 
            placeholder="Nhập email của bạn..." 
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Binding dữ liệu
            required 
          />

          <Input 
            label="Mật khẩu" 
            type="password" 
            placeholder="Nhập mật khẩu..." 
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Binding dữ liệu
            required 
          />

          <div className="form-extra">
            <label className="checkbox-remember">
              <input type="checkbox" /> Ghi nhớ đăng nhập
            </label>
            <Link to="/forgot-password">Quên mật khẩu?</Link>
          </div>

          <button type="submit" className="btn-submit" disabled={isLoading}>
            {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
          </button>
          {error && <div className="error-message" style={{color: 'red', marginBottom: '15px', textAlign: 'center'}}>{error}</div>}
        </form>

        {/* --- PHẦN MỚI: MẠNG XÃ HỘI --- */}
        <div className="auth-divider">
          <span>Hoặc đăng nhập bằng</span>
        </div>

        <div className="social-login">
          <button className="btn-social google" onClick={() => handleSocialLogin('Google')}>
            <FcGoogle size={24} />
            <span>Google</span>
          </button>
          
          <button className="btn-social facebook" onClick={() => handleSocialLogin('Facebook')}>
            <FaFacebook size={24} color="#1877f2" />
            <span>Facebook</span>
          </button>
        </div>
        {/* ----------------------------- */}

        <div className="auth-footer">
          <p>Chưa có tài khoản? <Link to="/auth/register">Đăng ký ngay</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;