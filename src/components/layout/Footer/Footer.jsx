// src/components/layout/Footer/Footer.jsx
import './Footer.css';
import { CiPaperplane , CiMail } from "react-icons/ci";
import { FaRegPaperPlane } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';

// Bạn có thể cài thêm react-icons để lấy icon Facebook, Instagram nếu thích
// npm install react-icons

const Footer = () => {
  return (
    <div>
      <div className="footer-top">
        {/* Cột 4: Newsletter */}
          <div className="f-text">
            <h3><FaRegPaperPlane /> Tham gia nhận tin từ Pbook</h3>
          <p>A book is a garden, an orchard, a storehouse, a party, a company by the way, a counselor,<br></br> a multitude of counselors.</p>
          </div>
          <div className="newsletter-form">
            <CiMail className="mail-icon"/>
            <input className='footer-mail' type="email" placeholder="Email của bạn..." />
            <button className='mail-btn'><CiPaperplane className='send-icon'/></button>
          </div>
      </div>
    <footer className="footer">
      
      <div className="container footer-container">
        {/* Cột 1: Giới thiệu */}
        <div className="footer-col">
          <Link to="/"><img className='logo-icon' style={{ marginBottom:'18px' ,marginLeft:'18px'}} src="/footer-logo.svg" alt="logo" /></Link>
          <p>
            Nền tảng mua sách trực tuyến hàng đầu Việt Nam. 
            Nơi lan tỏa tri thức và văn hóa đọc đến mọi nhà.
          </p>
          <p>📍 123 Đường Sách, Q.1, TP.HN</p>
          <p>📞 1900 1234</p>
        </div>

        {/* Cột 2: Hỗ trợ */}
        <div className="footer-col">
          <h3>Hỗ trợ khách hàng</h3>
          <ul>
            <li><a href="#">Hướng dẫn mua hàng</a></li>
            <li><a href="#">Chính sách đổi trả</a></li>
            <li><a href="#">Phương thức thanh toán</a></li>
            <li><a href="#">Vận chuyển & Giao nhận</a></li>
          </ul>
        </div>

        {/* Cột 3: Tài khoản */}
        <div className="footer-col">
          <h3>Tài khoản</h3>
          <ul>
            <li><a href="#">Đăng nhập / Đăng ký</a></li>
            <li><a href="#">Lịch sử đơn hàng</a></li>
            <li><a href="#">Giỏ hàng</a></li>
            <li><a href="#">Sản phẩm yêu thích</a></li>
          </ul>
        </div>
        {/* Cột 4: Những đầu sách hấp dẫn */}
        <div className="footer-col">
          <h3>Vườn sách Pbook</h3>

          <div className="book-cards">
            <img src="footer-img.jpg" alt="Book 1" />
            <img src="footer-img1.jpg" alt="Book 2" />
            <img src="footer-img2.jpg" alt="Book 3" />
          </div>
        </div>


        
      </div>
      
      <div className="footer-bottom">
        <p>© 2026 PBook. All rights reserved.</p>
      </div>
    </footer> </div>
  );
};

export default Footer;