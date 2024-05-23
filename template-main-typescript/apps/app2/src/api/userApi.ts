import { request } from '@/common/request';

export const loginApi = async (name: string, password: string) => {
  return await request.post('/user/login', { name, password });
};

export const getUserInfoApi = async (id: string) => {
  return await request.get('/user/info', { id });
};
