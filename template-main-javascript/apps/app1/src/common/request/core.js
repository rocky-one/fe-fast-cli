import axios from 'axios';
import { useEnv } from '@/hooks';
import { useUserStore } from '@/stores';
import { AxiosCancel } from './cancel';
import { AxiosLoading } from './loading';
import { MethodEnum } from '@/constant';

const defaultConfig = {
  loadingOptions: {}
};

const { VITE_API_URL } = useEnv();

export const axiosCancel = new AxiosCancel();
const axiosLoading = new AxiosLoading();

const service = axios.create({
  baseURL: VITE_API_URL,
  timeout: 10 * 1000,
  headers: { 'Content-Type': 'application/json;charset=UTF-8' }
});

service.interceptors.request.use((config) => {
  const { userInfo } = useUserStore();
  axiosCancel.addPending(config);
  axiosLoading.openLoading(config);
  if (userInfo.token) {
    config.headers.Authorization = userInfo.token;
  }
  return config;
});

service.interceptors.response.use(
  (response) => {
    const data = response.data;
    axiosCancel.removePending(response.config);
    axiosLoading.closeLoading(response.config);
    return data;
  },
  (err) => {
    if (err?.config) {
      axiosCancel.removePending(err.config);
      axiosLoading.closeLoading(err.config);
    }
    return Promise.reject(err?.response);
  }
);

const baseRequest = (method, url, data, config) => {
  const options = Object.assign({}, defaultConfig, config);
  return new Promise((resolve, reject) => {
    service({ method, url, ...data, requestOptions: options })
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      })
      .finally(() => {});
  });
};

export const request = {
  get(url, data, config) {
    return baseRequest(MethodEnum.GET, url, { params: data }, config);
  },
  post(url, data, config) {
    return baseRequest(MethodEnum.POST, url, { data }, config);
  },
  put(url, data, config) {
    return baseRequest(MethodEnum.PUT, url, { data }, config);
  },
  delete(url, data, config) {
    return baseRequest(MethodEnum.DELETE, url, { params: data }, config);
  }
};
