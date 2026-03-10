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
import OrderManagement from '../pages/admin/OrderManagement/OrderManagement.jsx'; // Đổi tên import
// import AuthLayout from '../components/layout/AuthLayout';
import Dashboard from '../pages/admin/Dashboard/AdminDashboard.jsx'; // Trang Dashboard Admin (đang làm)
import UserManagement from '../pages/admin/UserManagement/UserManagement.jsx'; // Trang Quản lý Người dùng Admin (đang làm)

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
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'products', element: <ProductManagement /> },
      // Các trang khác tạm thời để trống
      { path: 'orders', element: <OrderManagement /> },
      { path: 'users', element: <UserManagement /> },
    ]
  }
]);

export default router;