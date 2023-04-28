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

export const createAdmin = async (form: any) => {
  const { data } = await api.post(`/admins`, form);
  return data;
};

export const updateOtherAdmin = async (adminId: string, form: any) => {
  const { data } = await api.patch(`/admins/admin/${adminId}`, form);
  return data;
};

export const switchAdminRole = async ({
  adminId,
  roleId,
}: {
  adminId: string;
  roleId: string;
}) => {
  const { data } = await api.patch(`/admins/roles/admin/${adminId}`, {
    newRoleId: roleId,
  });
  return data;
};
