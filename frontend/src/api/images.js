import axiosInstance from './../api/axiosUtils';

export const createImage = async (data, imageFile) => {
  const formaData = new FormData();
  formaData.append('title', data.title);
  formaData.append('description', data.description);
  formaData.append('image', imageFile);
  const { data: image } = await axiosInstance.post('/images', formaData, { headers: { 'Content-Type': 'multipart/form-data' } });
  return image;
};

export const fetchImageById = async (imageId) => {
  const { data: image } = await axiosInstance.get(`/images/${imageId}`);
  return image;
};

export const fetchAllImages = async () => {
  const { data: images } = await axiosInstance.get(`/images`);
  return images;
};

export const updateImageById = async (data) => {
  const id = data.id;
  const title = data.title;
  const description = data.description;
  const { data: image } = await axiosInstance.put(`/images/${id}`, { title, description });
  return image;
};

export const deleteImageById = async (imageId) => {
  const { data: image } = await axiosInstance.delete(`/images/${imageId}`);
  return image;
};
