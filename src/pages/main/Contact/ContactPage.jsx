import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import './ContactPage.css';

const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.");
  };

  return (
    <div className="contact-page container">
      <div className="contact-header">
        <h1>Liên hệ với chúng tôi</h1>
        <p>Chúng tôi luôn lắng nghe và sẵn sàng hỗ trợ bạn 24/7.</p>
      </div>

      <div className="contact-grid">
        {/* CỘT 1: THÔNG TIN LIÊN HỆ */}
        <div className="contact-info">
          <div className="info-box">
            <h3>Thông tin cửa hàng</h3>
            <p className="info-item">
              <FaMapMarkerAlt className="icon" /> 
              <span>123 Đường Sách, Phường Bến Nghé, Quận 1, TP.HCM</span>
            </p>
            <p className="info-item">
              <FaPhoneAlt className="icon" /> 
              <span>090 123 4567</span>
            </p>
            <p className="info-item">
              <FaEnvelope className="icon" /> 
              <span>hotro@bookstore.vn</span>
            </p>
            <p className="info-item">
              <FaClock className="icon" /> 
              <span>8:00 - 22:00 (Tất cả các ngày trong tuần)</span>
            </p>
          </div>

          <div className="info-box">
            <h3>Kết nối với chúng tôi</h3>
            <div className="social-links">
              <a href="#" className="social-btn fb"><FaFacebook /></a>
              <a href="#" className="social-btn ins"><FaInstagram /></a>
              <a href="#" className="social-btn yt"><FaYoutube /></a>
            </div>
          </div>

          {/* Bản đồ (Dùng ảnh tĩnh hoặc iframe Google Maps) */}
          <div className="map-box">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4241683967466!2d106.698466614749!3d10.778786492319446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f361113b28d%3A0x6b772c728776606d!2zxJDGsOG7nW5nIFPDoWNoIFRQLiBI4buTIENow60gTWluaA!5e0!3m2!1svi!2s!4v1647246231012!5m2!1svi!2s" 
              width="100%" 
              height="250" 
              style={{border:0, borderRadius: '8px'}} 
              allowFullScreen="" 
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* CỘT 2: FORM GỬI TIN NHẮN */}
        <div className="contact-form-wrapper">
          <h3>Gửi thắc mắc cho chúng tôi</h3>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Họ và tên</label>
              <input type="text" placeholder="Nhập tên của bạn" required />
            </div>

            <div className="form-group-row">
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="email@example.com" required />
              </div>
              <div className="form-group">
                <label>Số điện thoại</label>
                <input type="tel" placeholder="090..." />
              </div>
            </div>

            <div className="form-group">
              <label>Nội dung cần hỗ trợ</label>
              <textarea placeholder="Bạn cần hỗ trợ vấn đề gì?" rows="5" required></textarea>
            </div>

            <button type="submit" className="btn-submit">Gửi tin nhắn</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;