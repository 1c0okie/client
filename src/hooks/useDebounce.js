// src/hooks/useDebounce.js
import { useState, useEffect } from 'react';

// Hook này nhận vào 1 giá trị và thời gian chờ (delay)
export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Thiết lập một bộ hẹn giờ
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Dọn dẹp bộ hẹn giờ nếu người dùng gõ tiếp trước khi hết giờ (Reset đồng hồ)
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};
