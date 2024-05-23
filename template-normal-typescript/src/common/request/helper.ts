import { MethodEnum } from '@/enums';

export const generateReqKey = (url: string, method: MethodEnum, params: any): string => {
  const methodUpper = method.toUpperCase();
  return [url || '', methodUpper || '', JSON.stringify(params)].join('&');
};

export const getParamsByMethod = (method: MethodEnum, config: any): any => {
  const methodUpper = method.toUpperCase();
  if (methodUpper === MethodEnum.GET || methodUpper === MethodEnum.DELETE) {
    return config.params;
  }
  return config.data;
};
