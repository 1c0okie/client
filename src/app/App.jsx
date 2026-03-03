// src/app/App.jsx
import { RouterProvider } from 'react-router-dom';
import router from './router';
import './App.css'
function App() {
  return (
    // Sau này sẽ bọc thêm AuthProvider, ToastProvider ở đây
    <RouterProvider router={router} />
  );
}

export default App;