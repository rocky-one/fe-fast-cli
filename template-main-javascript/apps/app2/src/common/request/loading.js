import { loading } from '@/components/loading';
import { generateReqKey, getParamsByMethod } from './helper';

export class AxiosLoading {
  bodyLoadingService;
  bodyLoadingServiceMap;
  localLoadingServiceMap;
  constructor() {
    this.bodyLoadingServiceMap = new Map();
    this.localLoadingServiceMap = new Map();
  }

  openLoading(config) {
    const { loadingOptions = {} } = config.requestOptions;
    if (loadingOptions.body || loadingOptions.target === document.body) {
      if (this.bodyLoadingServiceMap.size === 0) {
        this.bodyLoadingService = loading(loadingOptions);
      }
      const requestKey = generateReqKey(
        config.url,
        config.method,
        getParamsByMethod(config.method, config)
      );
      this.bodyLoadingServiceMap.set(requestKey, this.bodyLoadingService);
    } else if (loadingOptions.target) {
      const localService = loading(loadingOptions);
      const requestKey = generateReqKey(
        config.url,
        config.method,
        getParamsByMethod(config.method, config)
      );
      this.localLoadingServiceMap.set(requestKey, localService);
    }
  }

  closeLoading(config) {
    const requestKey = generateReqKey(
      config.url,
      config.method,
      getParamsByMethod(config.method, config)
    );
    if (this.bodyLoadingServiceMap.has(requestKey)) {
      if (this.bodyLoadingServiceMap.size === 1) {
        this.bodyLoadingServiceMap.get(requestKey)?.close();
      }
      this.bodyLoadingServiceMap.delete(requestKey);
    } else if (this.localLoadingServiceMap.has(requestKey)) {
      this.localLoadingServiceMap.get(requestKey)?.close();
      this.localLoadingServiceMap.delete(requestKey);
    }
  }
}
