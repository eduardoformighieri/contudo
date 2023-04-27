import { api } from './';

export const getAllReports = async (page: number) => {
  const { data } = await api.get('/reports', {
    params: { page },
  });
  return data;
};

export const getReportById = async (reportId: string) => {
  const { data } = await api.get(`/reports/${reportId}`);
  return data;
};

export const createReport = async (report: any) => {
  const { data } = await api.post('/reports/guest', report);
  return data;
};

export const getReportBySecretKey = async (secretKey: string) => {
  const { data } = await api.get(`/reports/guest/${secretKey}`);
  return data;
};
