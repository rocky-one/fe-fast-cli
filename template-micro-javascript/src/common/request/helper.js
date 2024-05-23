import { MethodEnum } from '@/constant';

export const generateReqKey = (url, method, params) => {
  const methodUpper = method.toUpperCase();
  return [url || '', methodUpper || '', JSON.stringify(params)].join('&');
};

export const getParamsByMethod = (method, config) => {
  const methodUpper = method.toUpperCase();
  if (methodUpper === MethodEnum.GET || methodUpper === MethodEnum.DELETE) {
    return config.params;
  }
  return config.data;
};
