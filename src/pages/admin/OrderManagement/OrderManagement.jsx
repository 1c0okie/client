import { useState, useEffect, useMemo } from 'react';
import { useOrderStore } from '../../../features/order/order.store';
import { FaEye, FaPrint } from 'react-icons/fa';
import './OrderManagement.css';

const OrderManagement = () => {
  const { allOrders, getAllOrdersAdmin, updateOrderStatusAdmin, isLoading } = useOrderStore();
  const [activeTab, setActiveTab] = useState('all');

  // Danh sách các tab để Admin dễ lọc đơn hàng
  const tabs = [
    { id: 'all', label: 'Tất cả' },
    { id: 'Pending', label: 'Chờ xác nhận' },
    { id: 'Processing', label: 'Chờ lấy hàng' },
    { id: 'Shipping', label: 'Đang giao' },
    { id: 'Delivered', label: 'Đã giao' },
    { id: 'Cancelled', label: 'Đã hủy' },
  ];

  useEffect(() => {
    // Gọi API lấy tất cả đơn hàng khi vừa vào trang
    getAllOrdersAdmin();
  }, [getAllOrdersAdmin]);

  // Logic lọc đơn hàng theo tab
  const filteredOrders = useMemo(() => {
    if (!allOrders) return [];
    if (activeTab === 'all') return allOrders;
    return allOrders.filter(order => order.status === activeTab);
  }, [allOrders, activeTab]);

  // Xử lý đổi trạng thái đơn
  const handleStatusChange = (orderId, currentStatus, e) => {
    const newStatus = e.target.value;
    if (newStatus !== currentStatus) {
      if (window.confirm(`Xác nhận cập nhật trạng thái đơn hàng thành: ${newStatus}?`)) {
        updateOrderStatusAdmin(orderId, newStatus);
      }
    }
  };

  return (
    <div className="admin-orders-page container">
      <div className="admin-header">
        <h2>Quản lý Đơn hàng</h2>
        <div className="header-actions">
          <button className="btn-export"><FaPrint /> Xuất báo cáo</button>
        </div>
      </div>

      {/* THANH TABS LỌC ĐƠN HÀNG */}
      <div className="admin-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            {/* Hiển thị số lượng đơn (Badge) trên từng tab */}
            {tab.id !== 'all' && allOrders && (
              <span className="tab-badge">
                {allOrders.filter(o => o.status === tab.id).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* BẢNG DANH SÁCH */}
      <div className="admin-table-container">
        {isLoading ? (
          <div className="loading-text">Đang tải dữ liệu...</div>
        ) : filteredOrders.length === 0 ? (
          <div className="empty-text">Không có đơn hàng nào trong mục này.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>MÃ ĐƠN</th>
                <th>KHÁCH HÀNG</th>
                <th>NGÀY ĐẶT</th>
                <th>TỔNG TIỀN</th>
                <th>TRẠNG THÁI</th>
                <th>THAO TÁC (CẬP NHẬT)</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id}>
                  <td className="order-id">#{order._id.substring(order._id.length - 6).toUpperCase()}</td>
                  <td>
                    <strong>{order.user?.name || 'User ẩn danh'}</strong>
                  </td>
                  <td>{new Date(order.createdAt).toLocaleDateString('vi-VN')}</td>
                  <td className="order-price">{order.totalPrice.toLocaleString('vi-VN')}₫</td>
                  
                  <td>
                    <span className={`status-badge status-${order.status.toLowerCase()}`}>
                      {tabs.find(t => t.id === order.status)?.label || order.status}
                    </span>
                  </td>
                  
                  <td className="action-cell">
                    <select 
                      value={order.status} 
                      onChange={(e) => handleStatusChange(order._id, order.status, e)}
                      disabled={order.status === 'Cancelled' || order.status === 'Delivered'}
                      className={`status-select select-${order.status.toLowerCase()}`}
                    >
                      <option value="Pending">Chờ xác nhận</option>
                      <option value="Processing">Chờ lấy hàng</option>
                      <option value="Shipping">Đang giao hàng</option>
                      <option value="Delivered">Đã giao</option>
                      <option value="Cancelled">Đã hủy</option>
                    </select>
                    
                    <button className="btn-view" title="Xem chi tiết">
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;