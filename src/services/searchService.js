import { createClientAxios } from "./apiClient";

export const getsearchData = async (url) => {
  try {
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.get(`/search?${url}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching product detail:", error);
    throw error;
  }
};
