import { api } from './';

export const getAllAdmins = async (page: number) => {
  const { data } = await api.get('/admins', {
    params: { page },
  });
  return data;
};

export const updateSelf = async (dataToUpdate: any) => {
  const { data } = await api.patch('/admins/me', dataToUpdate);
  return data;
};

export const deleteAdminById = async (adminId: string) => {
  const { data } = await api.delete(`/admins/admin/${adminId}`);
  return data;
};
