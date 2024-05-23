import type { AxiosRequestConfig } from 'axios';
import { generateReqKey, getParamsByMethod } from './helper';
import { MethodEnum } from '@/enums';

export class AxiosCancel {
  pendingMap: Map<string, AbortController>;
  constructor() {
    this.pendingMap = new Map<string, AbortController>();
  }

  addPending(config: AxiosRequestConfig) {
    this.removePending(config);
    const requestKey = generateReqKey(
      config.url!,
      config.method as MethodEnum,
      getParamsByMethod(config.method as MethodEnum, config)
    );
    if (!this.pendingMap.has(requestKey)) {
      const controller = new AbortController();
      config.signal = controller.signal;
      this.pendingMap.set(requestKey, controller);
    } else {
      config.signal = (this.pendingMap.get(requestKey) as AbortController).signal;
    }
  }

  removePending(config: AxiosRequestConfig) {
    const requestKey = generateReqKey(
      config.url!,
      config.method as MethodEnum,
      getParamsByMethod(config.method as MethodEnum, config)
    );
    if (this.pendingMap.has(requestKey)) {
      this.pendingMap.delete(requestKey);
    }
  }

  cancelPending(url: string, method: MethodEnum, params: any) {
    const requestKey = generateReqKey(url, method, params);
    if (this.pendingMap.has(requestKey)) {
      (this.pendingMap.get(requestKey) as AbortController).abort();
      this.pendingMap.delete(requestKey);
    }
  }
}
