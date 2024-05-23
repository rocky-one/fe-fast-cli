import { request } from '@/common/request';

export const loginApi = async (name, password) => {
  return await request.post('/user/login', { name, password });
};

export const getUserInfoApi = async (id) => {
  return await request.get('/user/info', { id });
};
