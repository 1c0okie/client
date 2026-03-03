import { useState } from 'react';
import Modal from '../../../components/ui/Modal/Modal'; // <--- 1. Import Modal
import './ProductManagement.css';

const ProductManagement = () => {
  const [books, setBooks] = useState(BOOKS);
  
  // 2. Thêm state để quản lý Modal và ID sách đang chọn xóa
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);

  // 3. Hàm này chạy khi bấm nút "Xóa" ở dòng sản phẩm
  // Nhiệm vụ: Chỉ mở Modal và lưu ID, CHƯA xóa ngay
  const handleDeleteClick = (id) => {
    setSelectedBookId(id); // Lưu lại: "À, đang định xóa cuốn số 1"
    setIsModalOpen(true);  // Mở bảng hỏi
  };

  // 4. Hàm này chạy khi bấm nút "Xóa luôn" trong Modal
  // Nhiệm vụ: Xóa thật
  const handleConfirmDelete = () => {
    if (selectedBookId) {
      setBooks(books.filter(b => b.id !== selectedBookId));
      setIsModalOpen(false); // Đóng modal
      setSelectedBookId(null); // Reset ID
      // Có thể thêm Toast thông báo thành công ở đây
    }
  };

  return (
    <div className="product-management">
      <div className="page-header">
        <h2>Quản lý Sách</h2>
        <button className="btn-add-new">+ Thêm sách mới</button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Hình ảnh</th>
              <th>Tên sách</th>
              <th>Giá tiền</th>
              <th>Thể loại</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>#{book._id}</td>
                <td>
                  <img src={book.image} alt="" className="table-thumb"/>
                </td>
                <td className="fw-bold">{book.title}</td>
                <td>{book.price.toLocaleString('vi-VN')}₫</td>
                <td>
                  <span className="badge-category">{book.category}</span>
                </td>
                <td>
                  <button className="btn-action edit">Sửa</button>
                  
                  {/* Sửa sự kiện onClick ở đây */}
                  <button 
                    className="btn-action delete" 
                    onClick={() => handleDeleteClick(book._id)} 
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- VỊ TRÍ ĐẶT MODAL: Ở cuối cùng của JSX --- */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Xác nhận xóa sách"
        footer={
          <div style={{display: 'flex', gap: '10px', justifyContent: 'flex-end'}}>
             <button 
               onClick={() => setIsModalOpen(false)}
               style={{padding: '8px 16px', cursor: 'pointer', background: '#eee', border: 'none', borderRadius: '4px'}}
             >
               Hủy
             </button>
             <button 
               onClick={handleConfirmDelete}
               style={{padding: '8px 16px', cursor: 'pointer', background: '#e53e3e', color: 'white', border: 'none', borderRadius: '4px'}}
             >
               Xóa luôn
             </button>
          </div>
        }
      >
        <p>Bạn có chắc chắn muốn xóa cuốn sách này không? Hành động này không thể hoàn tác.</p>
      </Modal>

    </div>
  );
};

export default ProductManagement;