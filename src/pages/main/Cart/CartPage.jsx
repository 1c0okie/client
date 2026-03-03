// src/pages/main/Cart/CartPage.jsx
import { Link } from 'react-router-dom';
import { useCartStore } from '../../../features/cart/cart.store';
import './CartPage.css'; // Tạo file CSS ở bước sau
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const navigate = useNavigate();
  // Lấy dữ liệu và các hàm từ Store
  const { items, removeFromCart, increaseQuantity, decreaseQuantity } = useCartStore();

  // Tính tổng tiền
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  // Giao diện khi giỏ hàng trống
  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <img 
          src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" 
          alt="Empty Cart" 
          width="150" 
        />
        <h2>Giỏ hàng của bạn đang trống!</h2>
        <p>Hãy chọn thêm sách vào giỏ hàng nhé.</p>
        <Link to="/" className="btn-go-shopping">Tiếp tục mua sắm</Link>
      </div>
    );
  }

  return (
    <div className="cart-page container">
      <h2 className="cart-title">Giỏ hàng ({items.length} sản phẩm)</h2>

      <div className="cart-layout">
        {/* CỘT TRÁI: DANH SÁCH */}
        <div className="cart-list">
          {items.map((item) => (
            <div key={item._id} className="cart-item">
              <div className="cart-item-img">
                <img src={item.image} alt={item.title} />
              </div>
              
              <div className="cart-item-info">
                <Link to={`/book/${item._id}`} className="item-title">{item.title}</Link>
                <div className="item-price">{item.price.toLocaleString('vi-VN')}₫</div>
              </div>

              <div className="cart-item-actions">
                {/* Bộ điều khiển số lượng */}
                <div className="qty-control">
                  <button onClick={() => decreaseQuantity(item._id)} disabled={item.quantity <= 1}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item._id)}>+</button>
                </div>
                
                {/* Nút xóa */}
                <button className="btn-remove" onClick={() => removeFromCart(item._id)}>
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CỘT PHẢI: TÍNH TIỀN */}
        <div className="cart-summary">
          <h3>Thanh toán</h3>
          <div className="summary-row">
            <span>Tạm tính:</span>
            <span>{totalPrice.toLocaleString('vi-VN')}₫</span>
          </div>
          <div className="summary-row">
            <span>Thành tiền:</span>
            <span className="final-price">{totalPrice.toLocaleString('vi-VN')}₫</span>
          </div>
          <div className="summary-note">
            (Đã bao gồm VAT nếu có)
          </div>
          
          <button className="btn-checkout" onClick={() => navigate('/checkout')}>
            Tiến hành đặt hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;