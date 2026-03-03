// src/pages/main/Checkout/CheckoutPage.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CheckoutPage.css';

// Import các Store
import { useCartStore } from '../../../features/cart/cart.store';
import { useOrderStore } from '../../../features/order/order.store';
import { useAuthStore } from '../../../features/auth/auth.store';

const CheckoutPage = () => {
  const navigate = useNavigate();
  // 🔥 1. Thêm State này để đánh dấu đã mua thành công
  const [isSuccess, setIsSuccess] = useState(false);
  
  // 1. Lấy dữ liệu từ Store
  const { items, clearCart, totalPrice } = useCartStore(); // Giả sử store có totalPrice, nếu không thì dùng reduce
  const { createOrder, isLoading } = useOrderStore();
  const { userInfo } = useAuthStore();

  // Tính lại tổng tiền nếu store không trả về (Fallback)
  const finalTotal = totalPrice || items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // 2. State quản lý form
  const [info, setInfo] = useState({
    fullname: userInfo?.name || '', // Tự điền tên nếu có
    phone: '',
    address: '',
    city: '', // Backend yêu cầu trường này
    note: ''
  });

  // 3. Bảo vệ Route: Chưa đăng nhập hoặc Giỏ rỗng -> Đá về trang khác
  useEffect(() => {
    if (!userInfo) {
      // Lưu lại URL để sau khi login thì quay lại đây (Logic nâng cao, tạm thời đá về login)
      navigate('/auth/login'); 
    } else if (items.length === 0 && !isSuccess) {
      navigate('/shop');
    }
  }, [userInfo, items, navigate]);

  // 4. Xử lý Đặt hàng
  const handleOrder = async (e) => {
    e.preventDefault();

    // Mapping dữ liệu Cart -> Order Model của Backend
    const orderItems = items.map(item => ({
      product: item._id, // Quan trọng: Lấy _id Mongo
      title: item.title,
      image: item.image,
      price: item.price,
      qty: item.quantity,
    }));

    const orderData = {
      orderItems: orderItems,
      shippingAddress: {
        address: info.address,
        city: info.city,
        phone: info.phone,
      },
      paymentMethod: 'COD', // Mặc định
      itemsPrice: finalTotal,
      shippingPrice: 0, 
      totalPrice: finalTotal,
    };

    // Gọi API
    const result = await createOrder(orderData);

    if (result) {
      setIsSuccess(true);
      clearCart(); // Xóa giỏ
      setTimeout(() => {
        navigate('/checkout/success'); 
      }, 100);
    } else {
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  if (items.length === 0) {
    return (
      <div className="container" style={{padding: '50px', textAlign: 'center'}}>
        <h2>Giỏ hàng trống!</h2>
        <Link to="/" className="btn-back">Quay lại mua sắm</Link>
      </div>
    );
  }

  return (
    <div className="checkout-page container">
      <form className="checkout-container" onSubmit={handleOrder}>
        {/* CỘT TRÁI: THÔNG TIN */}
        <div className="checkout-col-left">
          <h3 className="section-title">Thông tin giao hàng</h3>
          
          <div className="form-group">
             <label>Họ và tên</label>
             <input 
                required 
                type="text" 
                placeholder="Nguyễn Văn A" 
                value={info.fullname}
                onChange={e => setInfo({...info, fullname: e.target.value})} 
             />
          </div>
          
          <div className="form-group">
             <label>Số điện thoại</label>
             <input 
                required 
                type="text" 
                placeholder="0901234567" 
                value={info.phone}
                onChange={e => setInfo({...info, phone: e.target.value})} 
             />
          </div>

          {/* Thêm trường Thành phố cho khớp Backend */}
          <div className="form-group">
             <label>Tỉnh / Thành phố</label>
             <input 
                required 
                type="text" 
                placeholder="Hà Nội, TP.HCM..." 
                value={info.city}
                onChange={e => setInfo({...info, city: e.target.value})} 
             />
          </div>

          <div className="form-group">
             <label>Địa chỉ nhận hàng</label>
             <input 
                required 
                type="text" 
                placeholder="Số nhà, đường, phường, quận..." 
                value={info.address}
                onChange={e => setInfo({...info, address: e.target.value})} 
             />
          </div>

          <div className="form-group">
             <label>Ghi chú (Tùy chọn)</label>
             <textarea 
                placeholder="Ví dụ: Giao giờ hành chính..." 
                value={info.note}
                onChange={e => setInfo({...info, note: e.target.value})} 
             />
          </div>

          <h3 className="section-title" style={{marginTop: '30px'}}>Phương thức thanh toán</h3>
          <div className="payment-methods">
            <label className="payment-option">
              <input type="radio" name="payment" defaultChecked />
              <span>Thanh toán khi nhận hàng (COD)</span>
            </label>
            <label className="payment-option">
              <input type="radio" name="payment" disabled />
              <span style={{color: '#999'}}>Chuyển khoản ngân hàng (Đang bảo trì)</span>
            </label>
          </div>
        </div>

        {/* CỘT PHẢI: TÓM TẮT ĐƠN HÀNG */}
        <div className="checkout-col-right">
          <div className="order-summary-box">
             <h3>Đơn hàng ({items.length} sản phẩm)</h3>
             <div className="order-items">
                {items.map(item => (
                  <div key={item._id || item._id} className="summary-item">
                    <span className="item-name">
                        <span className="qty-badge">{item.quantity}x</span> {item.title}
                    </span>
                    <span>{(item.price * item.quantity).toLocaleString('vi-VN')}₫</span>
                  </div>
                ))}
             </div>
             
             <div className="summary-divider"></div>
             
             <div className="summary-row">
               <span>Tạm tính</span>
               <span>{finalTotal.toLocaleString('vi-VN')}₫</span>
             </div>
             <div className="summary-row">
               <span>Phí vận chuyển</span>
               <span>Miễn phí</span>
             </div>
             
             <div className="summary-divider"></div>
             
             <div className="summary-row total">
               <span>Tổng cộng</span>
               <span>{finalTotal.toLocaleString('vi-VN')}₫</span>
             </div>

             <button type="submit" className="btn-place-order" disabled={isLoading}>
               {isLoading ? 'ĐANG XỬ LÝ...' : 'ĐẶT HÀNG'}
             </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;