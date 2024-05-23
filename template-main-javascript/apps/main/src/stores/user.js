import { ref } from 'vue';
import { defineStore } from 'pinia';
import { loginApi } from '@/api/userApi';

export const useUserStore = defineStore('user', () => {
  const userInfo = ref({
    id: '',
    token: ''
  });

  const login = async (name, password) => {
    const res = await loginApi(name, password);
    userInfo.value.id = res.id;
    userInfo.value.token = res.token;
  };

  return { login, userInfo };
});
