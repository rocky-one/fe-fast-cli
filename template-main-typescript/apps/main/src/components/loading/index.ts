import { ElLoading } from 'element-plus';
import type { LoadingOptions } from 'element-plus';

export type LoadService = {
  close: () => void;
};

export const loading = (options: LoadingOptions = {}): LoadService => {
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
