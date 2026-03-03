import { Link } from 'react-router-dom';
import { FaBookOpen, FaTruck, FaHeadset, FaAward } from 'react-icons/fa';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* 1. HERO SECTION: Banner giới thiệu */}
      <div className="about-hero">
        <div className="container hero-content">
          <h1>Kết nối tri thức,<br /> kiến tạo tương lai</h1>
          <p>Chào mừng bạn đến với BookStore - Nơi hội tụ những cuốn sách giá trị nhất dành cho mọi lứa tuổi.</p>
        </div>
      </div>

      <div className="container">
        {/* 2. CÂU CHUYỆN (OUR STORY) */}
        <div className="about-section story-section">
          <div className="story-img">
            <img 
              src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800" 
              alt="Our Story" 
            />
          </div>
          <div className="story-text">
            <h2 className="section-title">Câu chuyện của chúng tôi</h2>
            <p>
              Được thành lập vào năm 2024, BookStore bắt đầu từ một tiệm sách nhỏ tại Hà Nội với niềm đam mê cháy bỏng về văn hóa đọc. Chúng tôi tin rằng, mỗi cuốn sách là một cánh cửa mở ra thế giới mới.
            </p>
            <p>
              Trải qua hành trình phát triển, BookStore hiện là một trong những nhà sách trực tuyến hàng đầu, cung cấp hơn 50,000 đầu sách từ Văn học, Kinh tế, Kỹ năng sống đến Sách ngoại văn.
            </p>
            <div className="stats-grid">
              <div className="stat-item">
                <strong>50k+</strong>
                <span>Đầu sách</span>
              </div>
              <div className="stat-item">
                <strong>10k+</strong>
                <span>Khách hàng</span>
              </div>
              <div className="stat-item">
                <strong>99%</strong>
                <span>Hài lòng</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. GIÁ TRỊ CỐT LÕI (WHY CHOOSE US) */}
        <div className="about-section values-section">
          <h2 className="section-title center">Tại sao chọn BookStore?</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="icon-box"><FaBookOpen /></div>
              <h3>Sách chính hãng</h3>
              <p>Cam kết sách thật 100%, hợp tác với các nhà xuất bản uy tín nhất Việt Nam.</p>
            </div>
            <div className="value-card">
              <div className="icon-box"><FaTruck /></div>
              <h3>Giao hàng nhanh</h3>
              <p>Đóng gói cẩn thận, giao hàng hỏa tốc trong 2h nội thành và 2-3 ngày toàn quốc.</p>
            </div>
            <div className="value-card">
              <div className="icon-box"><FaAward /></div>
              <h3>Giá cả hợp lý</h3>
              <p>Luôn có chương trình khuyến mãi, giảm giá và tích điểm cho thành viên thân thiết.</p>
            </div>
            <div className="value-card">
              <div className="icon-box"><FaHeadset /></div>
              <h3>Hỗ trợ 24/7</h3>
              <p>Đội ngũ tư vấn nhiệt tình, sẵn sàng giải đáp mọi thắc mắc của bạn đọc.</p>
            </div>
          </div>
        </div>

        {/* 4. ĐỘI NGŨ (MEET THE TEAM) */}
        <div className="about-section team-section">
          <h2 className="section-title center">Đội ngũ sáng lập</h2>
          <div className="team-grid">
            <div className="team-member">
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400" alt="CEO" />
              <h4>Nguyễn Nhật Minh</h4>
              <span>Founder & CEO</span>
            </div>
            <div className="team-member">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" alt="Manager" />
              <h4>Trần Thu Hà</h4>
              <span>Quản lý vận hành</span>
            </div>
            <div className="team-member">
              <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400" alt="Editor" />
              <h4>Lê Văn Nam</h4>
              <span>Trưởng ban biên tập</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. CTA (Call To Action) */}
      <div className="about-cta">
        <h2>Bạn đã sẵn sàng khám phá tri thức?</h2>
        <Link to="/shop" className="btn-cta">Mua sách ngay</Link>
      </div>
    </div>
  );
};

export default AboutPage;