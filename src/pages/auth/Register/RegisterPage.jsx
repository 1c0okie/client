import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { useAuthStore } from '../../../features/auth/auth.store';
import Input from '../../../components/ui/Input/Input';
import './RegisterPage.css';

const RegisterPage = () => {
  const navigate = useNavigate();

// 1. Lấy hàm register và state từ Store
  const { register, isLoading, error, userInfo } = useAuthStore();

  // 2. Local State cho Form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null); // Lỗi validation nội bộ (ví dụ: pass không khớp)

  // 3. Nếu đã đăng nhập thì đá về trang chủ
  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage(null);

    // Gọi API Đăng ký
    const success = await register(name, email, password);
    
    if (success) {
      navigate('/'); // Thành công thì về trang chủ
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2 className="register-title">Tạo tài khoản mới</h2>
        <p className="register-subtitle">Trở thành thành viên của BookStore ngay hôm nay</p>

        <form onSubmit={handleRegister} className="register-form">
          <Input 
            label="Họ và tên" 
            type="text" 
            placeholder="Ví dụ: Nguyễn Văn A" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required 
          />

          <Input 
            label="Email" 
            type="email" 
            placeholder="Nhập email của bạn..." 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />

          <Input 
            label="Mật khẩu" 
            type="password" 
            placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          {/* Hiển thị lỗi (Lỗi từ Server hoặc Lỗi nhập liệu) */}
        {(error || message) && (
          <div className="error-message">
            {message || error}
          </div>
        )}


          <button type="submit" className="btn-submit">Đăng ký</button>
        </form>

        <div className="auth-footer">
          <p>Bạn đã có tài khoản? <Link to="/auth/login">Đăng nhập ngay</Link></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;