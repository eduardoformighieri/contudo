import { api } from './';

export const getAllCategories = async () => {
  const { data } = await api.get('/report-categories');
  return data;
};

export const getAllPriorities = async () => {
  const { data } = await api.get('/report-priorities');
  return data;
};

export const getAllStatuses = async () => {
  const { data } = await api.get('/report-statuses');
  return data;
};

export const getAllAdminRoles = async () => {
  const { data } = await api.get('/admin-roles');
  return data;
};
