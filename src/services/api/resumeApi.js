import axiosInstance from './axiosInstance';

/** Create a new resume with just a title */
export const createResume = (title) =>
  axiosInstance.post('/api/resume/create', { title });

/** Fetch all resumes for the authenticated user */
export const getUserResumes = () =>
  axiosInstance.get('/api/resume/fetch');

/** Get a single resume by ID */
export const getResumeById = (id) =>
  axiosInstance.get(`/api/resume/${id}`);

/** Update an existing resume (full body) */
export const updateResume = (id, data) =>
  axiosInstance.put(`/api/resume/${id}`, data);

/** Delete a resume */
export const deleteResume = (id) =>
  axiosInstance.delete(`/api/resume/${id}`);

/** Upload resume thumbnail + profile image */
export const uploadResumeImages = (id, thumbnail, profileImage) => {
  const formData = new FormData();
  if (thumbnail) formData.append('thumbnail', thumbnail);
  if (profileImage) formData.append('profileImage', profileImage);
  return axiosInstance.put(`/api/resume/${id}/upload-image`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
