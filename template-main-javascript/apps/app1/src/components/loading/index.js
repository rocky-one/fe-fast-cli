import { ElLoading } from 'element-plus';

export const loading = (options) => {
  const loadService = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.3)',
    ...options
  });
  return {
    close: loadService.close
  };
};
