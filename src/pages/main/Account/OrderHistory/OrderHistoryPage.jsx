import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrderStore } from '../../../../features/order/order.store';
import http from '../../../../lib/http'; // 1. ĐÃ THÊM IMPORT HTTP
import './OrderHistoryPage.css';

// Hàm phụ trợ để dịch status từ tiếng Anh sang tiếng Việt
const translateStatus = (status) => {
  switch (status) {
    case 'Pending': return 'Chờ xác nhận';
    case 'Processing': return 'Chờ lấy hàng';
    case 'Shipping': return 'Đang giao hàng';
    case 'Delivered': return 'Giao hàng thành công';
    case 'Cancelled': return 'Đã hủy';
    default: return 'Chờ xác nhận';
  }
};

const OrderHistoryPage = () => {
  const navigate = useNavigate();
  const { myOrders, getMyOrdersList, isLoading } = useOrderStore();
  
  // State để quản lý tab đang chọn
  const [activeTab, setActiveTab] = useState('pending');

  // 2. ĐÃ THÊM TAB "TẤT CẢ" VÀO ĐẦU MẢNG
  const tabs = [
    { id: 'pending', label: 'Chờ xác nhận' },
    { id: 'processing', label: 'Chờ lấy hàng' },
    { id: 'shipping', label: 'Đang giao hàng' },
    { id: 'delivered', label: 'Đã giao' },
    { id: 'cancelled', label: 'Đã hủy' },
  ];

  useEffect(() => {
    getMyOrdersList();
  }, [getMyOrdersList]);

  // Logic lọc đơn hàng theo Tab
  const filteredOrders = useMemo(() => {
    if (!myOrders) return [];
    return myOrders.filter(order => {
      const currentStatus = order.status || 'Pending';

      switch (activeTab) {
        case 'pending': return currentStatus === 'Pending';
        case 'processing': return currentStatus === 'Processing';
        case 'shipping': return currentStatus === 'Shipping';
        case 'delivered': return currentStatus === 'Delivered';
        case 'cancelled': return currentStatus === 'Cancelled';
        default: return "pending"; // Tab 'all'
      }
    });
  }, [myOrders, activeTab]);

  // Hàm Hủy đơn
  const handleCancelOrder = async (orderId) => {
    if (window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?")) {
      try {
        await http.put(`/orders/${orderId}/cancel`);
        alert("Đã hủy đơn hàng thành công");
        getMyOrdersList(); // Load lại danh sách đơn hàng
      } catch (error) {
        alert(error.response?.data?.message || "Không thể hủy đơn hàng");
      }
    }
  };

  return (
    <div className="order-history-container">
      {/* THANH TABS NAVIGATION */}
      <div className="order-tabs">
        {tabs.map(tab => (
          <div 
            key={tab.id} 
            className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </div>
        ))}
      </div>

      {/* DANH SÁCH ĐƠN HÀNG */}
      <div className="order-content">
        {isLoading ? (
          <div className="loading-state">Đang tải đơn hàng...</div>
        ) : filteredOrders.length > 0 ? (
          <div className="order-list-real">
            {filteredOrders.map(order => (
              <div key={order._id} className="order-item-card">
                
                <div className="order-card-header">
                  <span className="shop-name">📚 BookStore</span>
                  {/* 3. ĐÃ SỬA HIỂN THỊ STATUS CHUẨN XÁC */}
                  <span className={`status-text ${order.status === 'Cancelled' ? 'text-cancelled' : ''}`}>
                    {translateStatus(order.status)}
                  </span>
                </div>
                
                <hr />
                {order.orderItems.map(item => (
                  <div key={item._id} className="product-info">
                    <img src={item.image} alt={item.title} />
                    <div className="details">
                      <h4>{item.title}</h4>
                      <p>Số lượng: x{item.qty}</p>
                    </div>
                    <div className="price">{item.price.toLocaleString()}₫</div>
                  </div>
                ))}
                <hr />
                
                <div className="order-card-footer">
                  <div className="total-price">
                    Thành tiền: <span>{order.totalPrice.toLocaleString()}₫</span>
                  </div>
                  <div className="actions">
                    {/* Chỉ hiện nút Hủy nếu đơn hàng đang ở trạng thái Pending */}
                    {order.status === 'Pending' && (
                      <button 
                        className="btn-cancel" 
                        onClick={() => handleCancelOrder(order._id)}
                        style={{ backgroundColor: '#fff', color: '#555', border: '1px solid #ccc', marginRight: '10px', padding: '8px 16px', cursor: 'pointer' }}
                      >
                        Hủy đơn hàng
                      </button>
                    )}
                    
                    <button 
                      onClick={() => navigate(`/account/orders/${order._id}`)}
                      style={{ backgroundColor: '#ee4d2d', color: '#fff', border: 'none', padding: '8px 16px', cursor: 'pointer' }}
                    >
                      Xem chi tiết
                    </button>
                  </div>
                </div>
                
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/5fafbb923393a712b96488592e8f766d.png" alt="empty" />
            </div>
            <p>Bạn chưa có đơn hàng nào</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;