import { useState } from 'react';

const useTimeout = () => {
  const [timeOutId, setTimeoutId] = useState<number | null>(null);

  const timeOut = (callback: () => void, miliseconds: number) => {
    if (timeOutId) {
      window.clearTimeout(timeOutId);
    }
    setTimeoutId(window.setTimeout(callback, miliseconds));
  };

  return {
    timeOut,
  };
};

export default useTimeout;
