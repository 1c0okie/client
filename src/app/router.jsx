// src/app/router.jsx
import { createBrowserRouter } from 'react-router-dom';

// Import tạm các Layout (sẽ code ở Bước 4)
import AdminLayout from '../components/layout/AdminLayout/AdminLayout';
import ProductManagement from '../pages/admin/ProductManagement/ProductManagement';
import LoginPage from '../pages/auth/Login/LoginPage.jsx';
import RegisterPage from '../pages/auth/Register/RegisterPage.jsx';
import MainLayout from '../components/layout/MainLayout/MainLayout.jsx';
import HomePage from '../pages/main/Home/HomePage';
import BookDetailPage from '../pages/main/BookDetail/BookDetailPage.jsx';
import CartPage from '../pages/main/Cart/CartPage.jsx';
import ShopPage from '../pages/main/Shop/ShopPage.jsx';
import ProfilePage from '../pages/main/Account/Profile/ProfilePage';
import OrderHistoryPage from '../pages/main/Account/OrderHistory/OrderHistoryPage';
import AccountLayout from '../pages/main/Account/AccountLayout.jsx';
import CheckoutPage from '../pages/main/Checkout/CheckoutPage.jsx';
import SuccessPage from '../pages/main/Checkout/SuccessPage';
import OrderDetailPage from '../pages/main/Account/OrderDetailPage/OrderDetailPage.jsx';
import AboutPage from '../pages/main/About/AboutPage';
import ContactPage from '../pages/main/Contact/ContactPage.jsx';
import AuthorPage from '../pages/main/Author/AuthorPage.jsx';
// import AuthLayout from '../components/layout/AuthLayout';

// Mockup components để test router chạy được chưa
const Home = () => <div>Trang Chủ (Home)</div>;
const Login = () => <div>Trang Đăng Nhập (Login)</div>;
const BookDetail = () => <div>Chi tiết sách</div>;
const Dashboard = () => <div>Admin Dashboard</div>;

const router = createBrowserRouter([
  // 1. Route cho Khách hàng (Public)
  {
    path: '/',
    element: <MainLayout />, // Sẽ mở comment khi có Layout
    children: [
      
      { path: '', element: <HomePage /> },
      { path: 'book/:id', element: <BookDetailPage /> },
      { path: 'author/:name', element: <AuthorPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'shop', element: <ShopPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'profile', element: <ProfilePage /> },
      {
        path: 'account',
        element: <AccountLayout />,
        children: [
          // Vào /account tự nhảy vào profile
          { path: '', element: <ProfilePage /> }, // Mặc định
          { path: 'profile', element: <ProfilePage /> },
          { path: 'orders', element: <OrderHistoryPage /> },
          { path: 'orders/:id', element: <OrderDetailPage /> },
        ]
      },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'checkout/success', element: <SuccessPage /> },
    ]
  },
  
  // 2. Route cho Auth (Login/Register)
  {
    path: '/auth',
    // element: <AuthLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
    ]
  },

  // 3. Route cho Admin (Private)
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { path: 'dashboard', element: <div>Trang Dashboard Tổng quan (Đang làm...)</div> },
      { path: 'products', element: <ProductManagement /> },
      // Các trang khác tạm thời để trống
      { path: 'orders', element: <div>Quản lý Đơn hàng</div> },
      { path: 'users', element: <div>Quản lý Người dùng</div> },
    ]
  }
]);

export default router;