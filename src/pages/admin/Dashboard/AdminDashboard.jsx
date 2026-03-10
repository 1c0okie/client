import { useEffect } from 'react';
import { useOrderStore } from '../../../features/order/order.store';
import { FaMoneyBillWave, FaBoxOpen, FaUsers, FaShoppingCart } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { dashboardData, getDashboardStatsAdmin, isLoading } = useOrderStore();

  useEffect(() => {
    getDashboardStatsAdmin();
  }, [getDashboardStatsAdmin]);

  if (isLoading || !dashboardData) {
    return <div className="loading">Đang tải dữ liệu thống kê...</div>;
  }

  return (
    <div className="admin-dashboard container">
      <h2 className="dashboard-title">Tổng quan Hệ thống</h2>

      {/* 4 THẺ THỐNG KÊ (CARDS) */}
      <div className="stat-cards">
        <div className="stat-card revenue">
          <div className="icon"><FaMoneyBillWave /></div>
          <div className="info">
            <p>Tổng Doanh Thu</p>
            <h3>{dashboardData.totalRevenue.toLocaleString('vi-VN')}₫</h3>
          </div>
        </div>

        <div className="stat-card orders">
          <div className="icon"><FaShoppingCart /></div>
          <div className="info">
            <p>Tổng Đơn Hàng</p>
            <h3>{dashboardData.totalOrders}</h3>
          </div>
        </div>

        <div className="stat-card products">
          <div className="icon"><FaBoxOpen /></div>
          <div className="info">
            <p>Tổng Sách (Kho)</p>
            <h3>{dashboardData.totalProducts}</h3>
          </div>
        </div>

        <div className="stat-card users">
          <div className="icon"><FaUsers /></div>
          <div className="info">
            <p>Khách Hàng</p>
            <h3>{dashboardData.totalUsers}</h3>
          </div>
        </div>
      </div>

      {/* BIỂU ĐỒ THỐNG KÊ ĐƠN HÀNG */}
      <div className="dashboard-charts">
        <div className="chart-container">
          <h3>Thống kê Trạng thái Đơn hàng</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={dashboardData.orderStats} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip cursor={{fill: '#f5f5f5'}} />
              <Legend />
              <Bar dataKey="count" name="Số lượng đơn" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;