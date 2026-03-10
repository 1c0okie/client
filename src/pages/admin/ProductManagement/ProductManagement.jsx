import { useState, useEffect } from 'react';
import { useBookStore } from '../../../features/books/book.store';
import { FaEdit, FaTrash, FaPlus, FaTimes } from 'react-icons/fa';
import './ProductManagement.css'; // File CSS ở bước 4

const ProductManagement = () => {
  const { books, getBooksList, createBookAdmin, deleteBookAdmin, updateBookAdmin, isLoading } = useBookStore();
  
  // State quản lý Modal Sửa sách
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({});

  useEffect(() => {
    getBooksList();
  }, [getBooksList]);

  // Xử lý XÓA
  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa cuốn sách này vĩnh viễn?')) {
      deleteBookAdmin(id);
    }
  };

  // Xử lý TẠO MỚI
  const handleCreate = () => {
    if (window.confirm('Tạo một cuốn sách mẫu trống? Bạn có thể sửa nội dung sau.')) {
      createBookAdmin();
    }
  };

  // MỞ MODAL SỬA
const openEditModal = (book) => {
  setEditFormData({
    ...book,
    category: book.categoryId, // Ép dùng ID của danh mục để gửi xuống Backend
  }); 
  setIsModalOpen(true);
};  

  // XỬ LÝ KHI GÕ VÀO FORM SỬA
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  // LƯU CẬP NHẬT SÁCH
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const success = await updateBookAdmin(editFormData._id, editFormData);
    if (success) {
      setIsModalOpen(false); // Đóng modal nếu thành công
    }
  };

  return (
    <div className="admin-products-page container">
      <div className="admin-header">
        <h2>Quản lý Kho Sách</h2>
        <button className="btn-create" onClick={handleCreate}>
          <FaPlus /> Thêm sách mới
        </button>
      </div>

      {isLoading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>HÌNH ẢNH</th>
                <th>TÊN SÁCH</th>
                <th>GIÁ BÁN</th>
                <th>DANH MỤC</th>
                <th>TỒN KHO</th>
                <th>THAO TÁC</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  <td>
                    <img src={book.image} alt={book.title} className="product-img-mini" />
                  </td>
                  <td><strong>{book.title}</strong><br/><small>{book.author}</small></td>
                  <td className="price-text">{book.price.toLocaleString('vi-VN')}₫</td>
                  <td>{book.categoryName}</td>
                  <td>
                    <span className={book.stockQuantity > 0 ? 'stock-ok' : 'stock-out'}>
                      {book.stockQuantity > 0 ? `${book.stockQuantity} cuốn` : 'Hết hàng'}
                    </span>
                  </td>
                  <td className="action-cell">
                    <button className="btn-edit" onClick={() => openEditModal(book)}>
                      <FaEdit />
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(book._id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL SỬA SÁCH */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setIsModalOpen(false)}><FaTimes /></button>
            <h3>Chỉnh sửa thông tin sách</h3>
            <form onSubmit={handleUpdateSubmit} className="edit-product-form">
              <div className="form-group">
                <label>Tên sách:</label>
                <input type="text" name="title" value={editFormData.title || ''} onChange={handleInputChange} required />
              </div>
              <div className="form-group-row">
                <div className="form-group">
                  <label>Tác giả:</label>
                  <input type="text" name="author" value={editFormData.author || ''} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Danh mục:</label>
                  <input type="text" name="category" value={editFormData.category || ''} onChange={handleInputChange} />
                </div>
              </div>
              <div className="form-group-row">
                <div className="form-group">
                  <label>Giá bán (VNĐ):</label>
                  <input type="number" name="price" value={editFormData.price || 0} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Tồn kho (Cuốn):</label>
                  <input type="number" name="stockQuantity" value={editFormData.stockQuantity || 0} onChange={handleInputChange} required />
                </div>
              </div>
              <div className="form-group">
                <label>Link Ảnh (URL):</label>
                <input type="text" name="image" value={editFormData.image || ''} onChange={handleInputChange} />
                {/* Preview ảnh nhỏ nếu có link */}
                {editFormData.image && <img src={editFormData.image} alt="preview" className="img-preview" />}
              </div>
              <div className="form-group">
                <label>Mô tả sách:</label>
                <textarea name="description" rows="4" value={editFormData.description || ''} onChange={handleInputChange}></textarea>
              </div>
              <button type="submit" className="btn-save">Lưu Cập Nhật</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;