import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaMapMarkerAlt, FaPhoneAlt, FaUser, FaRegClock } from 'react-icons/fa';
import http from '../../../../lib/http'; // Sử dụng axios instance đã cấu hình
import './OrderDetailPage.css';

const OrderDetailPage = () => {
  const { id } = useParams(); 
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleCancelOrder = async (orderId) => {
  if (window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?")) {
    try {
      // Gọi API hủy đơn
      await http.put(`/orders/${orderId}/cancel`);
      alert("Đã hủy đơn hàng thành công");
      getMyOrdersList(); // Load lại danh sách đơn hàng
    } catch (error) {
      alert(error.response?.data?.message || "Không thể hủy đơn hàng");
    }
  }
};

  // 1. Gọi API lấy chi tiết đơn hàng
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await http.get(`/orders/${id}`);
        setOrder(data);
        setLoading(false);
      } catch (err) {
        console.error("Lỗi lấy chi tiết đơn hàng:", err);
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  // Hàm xử lý trạng thái
  const getStatus = (order) => {
    if (order.isDelivered) return { class: 'success', text: 'Giao hàng thành công' };
    if (order.isPaid) return { class: 'pending', text: 'Chờ giao hàng' };
    return { class: 'warning', text: 'Đang xử lý' };
  };

  if (loading) return <div className="container" style={{padding: '100px', textAlign: 'center'}}>Đang tải thông tin đơn hàng...</div>;
  if (!order) return <div className="container" style={{padding: '100px', textAlign: 'center'}}>Không tìm thấy đơn hàng.</div>;

  const statusInfo = getStatus(order);

  return (
    <div className="order-detail-page">
      {/* Header: Nút quay lại + Trạng thái */}
      <div className="detail-header">
        <Link to="/profile" className="back-link">
          <FaArrowLeft /> Quay lại hồ sơ
        </Link>
        <div className="order-meta">
          <span>Mã đơn: #{order._id.substring(order._id.length - 8).toUpperCase()}</span>
          <span className="split">|</span>
          <span className={`status-badge status-${statusInfo.class}`}>{statusInfo.text}</span>
        </div>
      </div>

      <div className="detail-grid">
        {/* CỘT TRÁI: THÔNG TIN VÀ SẢN PHẨM */}
        <div className="detail-main">
            {/* Thông tin người nhận */}
            <div className="detail-section info-section">
                <h3><FaMapMarkerAlt /> Địa chỉ nhận hàng</h3>
                <div className="info-content">
                    <p><strong><FaUser /> {order.user?.name}</strong></p>
                    <p><FaPhoneAlt /> {order.shippingAddress.phone}</p>
                    <p>{order.shippingAddress.address}, {order.shippingAddress.city}</p>
                    <p className="order-time"><FaRegClock /> Ngày đặt: {new Date(order.createdAt).toLocaleString('vi-VN')}</p>
                </div>
            </div>

            {/* Danh sách sản phẩm */}
            <div className="detail-section items-section">
                <h3>Sản phẩm</h3>
                {order.orderItems.map((item) => (
                <div key={item._id} className="detail-item">
                    <img src={item.image} alt={item.title} />
                    <div className="item-info">
                    <Link to={`/book/${item.product}`} className="item-title">{item.title}</Link>
                    <p className="item-meta">Số lượng: x{item.qty}</p>
                    <p className="item-price-each">Đơn giá: {item.price.toLocaleString('vi-VN')}₫</p>
                    </div>
                    <div className="item-price-total">
                    {(item.price * item.qty).toLocaleString('vi-VN')}₫
                    </div>
                </div>
                ))}
            </div>
        </div>

        {/* CỘT PHẢI: TỔNG KẾT THANH TOÁN */}
        <div className="detail-sidebar">
            <div className="detail-section summary-section">
                <h3>Tổng cộng</h3>
                <div className="summary-row">
                    <span>Tạm tính:</span>
                    <span>{order.itemsPrice.toLocaleString('vi-VN')}₫</span>
                </div>
                <div className="summary-row">
                    <span>Phí vận chuyển:</span>
                    <span>{order.shippingPrice === 0 ? 'Miễn phí' : order.shippingPrice.toLocaleString('vi-VN') + '₫'}</span>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-row total">
                    <span>Tổng số tiền:</span>
                    <span className="final-price">{order.totalPrice.toLocaleString('vi-VN')}₫</span>
                </div>
                <div className="payment-method">
                    <p>Phương thức thanh toán: <strong>{order.paymentMethod}</strong></p>
                </div>
            </div>
            
            <div className="detail-actions">
                <button className="btn-rebuy">Mua lại đơn này</button>
                <button className="btn-contact">Liên hệ hỗ trợ</button>
            </div>
                  
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;