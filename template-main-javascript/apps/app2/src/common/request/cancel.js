import { generateReqKey, getParamsByMethod } from './helper';

export class AxiosCancel {
  pendingMap = new Map();
  constructor() {
  }

  addPending(config) {
    this.removePending(config);
    const requestKey = generateReqKey(
      config.url,
      config.method,
      getParamsByMethod(config.method, config)
    );
    if (!this.pendingMap.has(requestKey)) {
      const controller = new AbortController();
      config.signal = controller.signal;
      this.pendingMap.set(requestKey, controller);
    } else {
      config.signal = this.pendingMap.get(requestKey).signal;
    }
  }

  removePending(config) {
    if (!config) return;
    const requestKey = generateReqKey(
      config.url,
      config.method,
      getParamsByMethod(config.method, config)
    );
    if (this.pendingMap.has(requestKey)) {
      this.pendingMap.delete(requestKey);
    }
  }

  cancelPending(url, method, params) {
    const requestKey = generateReqKey(url, method, params);
    if (this.pendingMap.has(requestKey)) {
      this.pendingMap.get(requestKey).abort();
      this.pendingMap.delete(requestKey);
    }
  }
}
