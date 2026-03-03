// src/components/ui/Toast/Toast.jsx
import { useToastStore } from '../../../features/ui/toast.store';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';

import './Toast.css';

const Toast = () => {
  const { toastData, hideToast } = useToastStore();

  // Nếu không có dữ liệu thì không render gì cả
  if (!toastData) return null;

  return (
    <div className="toast-notification">
      <div className="toast-icon">
        <FaCheckCircle />
      </div>
      
      <div className="toast-img">
        <img src={toastData.image} alt="" />
      </div>

      <div className="toast-content">
        <p className="toast-title">{toastData.title}</p>
        <p className="toast-message">{toastData.message}</p>
      </div>

      <button className="toast-close" onClick={hideToast}>
        <FaTimes />
      </button>
    </div>
  );
};

export default Toast;   