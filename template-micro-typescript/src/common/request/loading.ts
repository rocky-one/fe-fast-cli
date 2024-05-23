import { loading } from '@/components/loading';
import { generateReqKey, getParamsByMethod } from './helper';
import type { LoadService } from '@/components/loading';
import type { AxiosRequestConfig } from 'axios';
import { RequestConfig } from './core';
import { MethodEnum } from '@/enums';

export class AxiosLoading {
  bodyLoadingService!: LoadService;
  bodyLoadingServiceMap: Map<string, LoadService>;
  localLoadingServiceMap: Map<string, LoadService>;
  constructor() {
    this.bodyLoadingServiceMap = new Map();
    this.localLoadingServiceMap = new Map();
  }

  openLoading(config: AxiosRequestConfig & { requestOptions: RequestConfig }) {
    const { loadingOptions = {} } = config.requestOptions;
    if (loadingOptions.body || loadingOptions.target === document.body) {
      if (this.bodyLoadingServiceMap.size === 0) {
        this.bodyLoadingService = loading(loadingOptions);
      }
      const requestKey = generateReqKey(
        config.url!,
        config.method as MethodEnum,
        getParamsByMethod(config.method as MethodEnum, config)
      );
      this.bodyLoadingServiceMap.set(requestKey, this.bodyLoadingService);
    } else if (loadingOptions.target) {
      const localService = loading(loadingOptions);
      const requestKey = generateReqKey(
        config.url!,
        config.method as MethodEnum,
        getParamsByMethod(config.method as MethodEnum, config)
      );
      this.localLoadingServiceMap.set(requestKey, localService);
    }
  }

  closeLoading(config: AxiosRequestConfig) {
    const requestKey = generateReqKey(
      config.url!,
      config.method as MethodEnum,
      getParamsByMethod(config.method as MethodEnum, config)
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
