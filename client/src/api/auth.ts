import { api } from './';

export const signIn = async (formData: any) => {
  const { data } = await api.post('/auth/login', formData);
  return data;
};

export const getLoggedUserData = async () => {
  const { data } = await api.get('/auth/me');
  return data;
};
