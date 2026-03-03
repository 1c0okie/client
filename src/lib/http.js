// src/lib/http.js
import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// 1. REQUEST INTERCEPTOR: Tự động gắn Token vào mọi request
http.interceptors.request.use(
  (config) => {
    // Lấy userInfo từ LocalStorage
    const userInfo = localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null;

    // Nếu có token, gắn vào header Authorization
    if (userInfo && userInfo.token) {
      config.headers.Authorization = `Bearer ${userInfo.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 2. RESPONSE INTERCEPTOR: Xử lý dữ liệu trả về hoặc lỗi chung
http.interceptors.response.use(
  (response) => {
    // Trả về thẳng data để đỡ phải gõ response.data ở component
    return response.data;
  },
  (error) => {
    // Nếu token hết hạn (Lỗi 401), có thể xử lý logout tự động ở đây (Nâng cao)
    if (error.response && error.response.status === 401) {
      // console.log("Hết phiên đăng nhập");
      // localStorage.removeItem('userInfo');
      // window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export default http;