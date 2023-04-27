import { api } from './';

export const signIn = async (formData: any) => {
  const { data } = await api.post(`/auth/login`, formData);
  return data;
};

export const getLoggedUserData = async (token: string) => {
  const { data } = await api.get(`/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
