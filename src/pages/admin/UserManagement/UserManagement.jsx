import { useEffect } from 'react';
import { useUserAdminStore } from '../../../features/user/user.store'; // Chỉnh lại đường dẫn nếu cần
import { FaTrash, FaUserShield, FaUser } from 'react-icons/fa';
import './UserManagement.css';

const UserManagement = () => {
  const { usersList, getUsersAdmin, updateRoleAdmin, deleteUserAdmin, isLoading } = useUserAdminStore();

  useEffect(() => {
    getUsersAdmin();
  }, [getUsersAdmin]);

  const handleRoleChange = (id, currentIsAdmin) => {
    const action = currentIsAdmin ? 'gỡ quyền Admin của' : 'cấp quyền Admin cho';
    if (window.confirm(`Bạn có chắc muốn ${action} người dùng này?`)) {
      updateRoleAdmin(id, !currentIsAdmin);
    }
  };

  return (
    <div className="admin-users-page container">
      <div className="admin-header">
        <h2>Quản lý Thành viên</h2>
        <p>Tổng số: {usersList?.length || 0} tài khoản</p>
      </div>

      {isLoading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>TÊN NGƯỜI DÙNG</th>
                <th>EMAIL</th>
                <th>VAI TRÒ</th>
                <th>THAO TÁC</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((user) => (
                <tr key={user._id}>
                  <td className="user-id">...{user._id.substring(user._id.length - 5)}</td>
                  <td><strong>{user.name}</strong></td>
                  <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                  <td>
                    <span className={`role-badge ${user.isAdmin ? 'role-admin' : 'role-user'}`}>
                      {user.isAdmin ? <FaUserShield /> : <FaUser />} 
                      {user.isAdmin ? ' Quản trị viên' : ' Khách hàng'}
                    </span>
                  </td>
                  <td className="action-cell">
                    <button 
                      className="btn-edit-role" 
                      onClick={() => handleRoleChange(user._id, user.isAdmin)}
                      title="Đổi quyền"
                    >
                      Đổi Quyền
                    </button>
                    <button 
                      className="btn-delete" 
                      onClick={() => deleteUserAdmin(user._id)}
                      title="Xóa tài khoản"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserManagement;