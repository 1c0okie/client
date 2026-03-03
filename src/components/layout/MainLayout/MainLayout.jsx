// src/components/layout/MainLayout/MainLayout.jsx
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CartDrawer from '../CartDrawer/CartDrawer'; // <--- Import
import Toast from '../../ui/Toast/Toast';
import ScrollToTop from '../../common/ScrollToTop/ScrollToTop';
const MainLayout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ScrollToTop />
      {/* Luôn hiển thị Header */}
      <Header />
      <Toast/>
      <CartDrawer />
      {/* Phần thân thay đổi (Outlet) */}
      <main style={{ flex: 1, padding: '80px 20px 20px 20px' }}>
        {/* <Outlet /> là cái "lỗ" để router nhét nội dung trang con vào (Home, BookDetail...) */}
        <Outlet />
      </main>

      {/* Luôn hiển thị Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;