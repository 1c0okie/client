// src/components/layout/Banner/Banner.jsx
import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Cần cài react-icons
import './HeroBanner.css';

// Dữ liệu giả lập (Sau này lấy từ Database của Admin)
const BANNERS = [
  {
    id: 1,
    image: "/default.png",
    alt: "Thư viện sách khổng lồ",
    link: "/shop"
  },
  {
    id: 2,
    image: "/banner2.jpg",
    alt: "Không gian đọc sách chill",
    link: "/shop"
  },
  {
    id: 3,
    image: "/banner3.jpg",
    alt: "Khuyến mãi sách mới",
    link: "/shop"
  },
  {
    id: 4,
    image: "/banner4.jpg",
    alt: "Khuyến mãi sách mới",
    link: "/shop"
  }
];

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);
  const length = BANNERS.length;

  // Tự động chuyển slide sau 3 giây
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 10000); // 3000ms = 3s

    // Dọn dẹp timer khi component bị hủy hoặc user bấm nút (để tránh lỗi nhảy loạn xạ)
    return () => clearInterval(timer);
  }, [length]);

  // Logic nút Next
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  // Logic nút Prev
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(BANNERS) || BANNERS.length <= 0) {
    return null;
  }

  return (
    <div className="banner-slider">
      {/* Nút Trái */}
      <button className="banner-btn left" onClick={prevSlide}>
        <FaChevronLeft />
      </button>

      {/* Nút Phải */}
      <button className="banner-btn right" onClick={nextSlide}>
        <FaChevronRight />
      </button>

      {/* Container chứa ảnh (dùng flex để xếp ngang) */}
      <div 
        className="banner-wrapper"
        style={{ transform: `translateX(-${current * 100}%)` }} // Kỹ thuật trượt
      >
        {BANNERS.map((banner, index) => (
          <div 
            className="banner-slide" 
            key={index}
            onClick={() => window.location.href = banner.link} // Bấm vào banner thì chuyển trang
          >
            <img src={banner.image} alt={banner.alt} />
          </div>
        ))}
      </div>

      {/* Dấu chấm tròn bên dưới (Indicators) */}
      <div className="banner-dots">
        {BANNERS.map((_, index) => (
          <div 
            key={index} 
            className={`dot ${index === current ? 'active' : ''}`}
            onClick={() => setCurrent(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;