// src/components/layout/CartDrawer/CartDrawer.jsx
import { Link } from 'react-router-dom';
import { useCartStore } from '../../../features/cart/cart.store';
import './CartDrawer.css';

const CartDrawer = () => {
  const { items, isOpen, closeCart, removeFromCart } = useCartStore();

  // Tính tổng tiền
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  if (!isOpen) return null; // Nếu đang đóng thì không render gì cả

  return (
    <>
      {/* Lớp màn đen mờ che phía sau */}
      <div className="drawer-overlay" onClick={closeCart}></div>

      {/* Cái ngăn kéo chính */}
      <div className="drawer-panel">
        <div className="drawer-header">
          <h3>Giỏ hàng ({items.length})</h3>
          <button onClick={closeCart} className="btn-close">✕</button>
        </div>

        <div className="drawer-body">
          {items.length === 0 ? (
            <p className="empty-msg">Chưa có sản phẩm nào.</p>
          ) : (
            items.map((item) => (
              <div key={item._id} className="drawer-item">
                <img src={item.image} alt="" />
                <div className="item-info">
                  <h4>{item.title}</h4>
                  <p>{item.quantity} x {item.price.toLocaleString('vi-VN')}₫</p>
                </div>
                <button onClick={() => removeFromCart(item._id)} className="btn-remove-sm">Xóa</button>
              </div>
            ))
          )}
        </div>

        <div className="drawer-footer">
          <div className="total-row">
            <span>Tổng cộng:</span>
            <strong>{totalPrice.toLocaleString('vi-VN')}₫</strong>
          </div>
          <Link to="/cart" className="btn-view-cart" onClick={closeCart}>
            Xem chi tiết giỏ hàng
          </Link>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;