import axiosInstance from './axiosInstance';

/** Get available resume templates */
export const getTemplates = () =>
  axiosInstance.get('/api/templates');
