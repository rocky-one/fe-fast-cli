import axios from 'axios';
import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { useEnv } from '@/hooks';
import { useUserStore } from '@/stores';
import { AxiosCancel } from './cancel';
import { MethodEnum } from '@/enums';

export interface RequestConfig {}

const defaultConfig: RequestConfig = {};

const { VITE_API_URL } = useEnv();

export const axiosCancel = new AxiosCancel();

const service: AxiosInstance = axios.create({
  baseURL: VITE_API_URL,
  timeout: 10 * 1000,
  headers: { 'Content-Type': 'application/json;charset=UTF-8' }
});

service.interceptors.request.use((config: any) => {
  const { userInfo } = useUserStore();
  axiosCancel.addPending(config);
  if (userInfo.token) {
    config.headers.Authorization = userInfo.token;
  }
  return config;
});

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const data = response.data;
    axiosCancel.removePending(response.config);
    return data;
  },
  (err) => {
    if (err?.config) {
      axiosCancel.removePending(err.config);
    }
    return Promise.reject(err?.response);
  }
);

const baseRequest = <T = any>(method: MethodEnum, url: string, data?: any, config?: RequestConfig): Promise<T> => {
  const options = Object.assign({}, defaultConfig, config);
  return new Promise((resolve, reject) => {
    service({ method, url, ...data, requestOptions: options })
      .then((res) => {
        resolve(res as unknown as Promise<T>);
      })
      .catch((e: Error | AxiosError) => {
        reject(e);
      })
      .finally(() => {});
  });
};

export const request = {
  get<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return baseRequest(MethodEnum.GET, url, { params: data }, config);
  },
  post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return baseRequest(MethodEnum.POST, url, { data }, config);
  },
  put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return baseRequest(MethodEnum.PUT, url, { data }, config);
  },
  delete<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return baseRequest(MethodEnum.DELETE, url, { params: data }, config);
  }
};
