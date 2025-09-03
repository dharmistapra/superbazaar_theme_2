import { createClientAxios } from "./apiClient";

export const getPolicies = async () => {
  try {
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.get(`/cms`);
    return res.data;
  } catch (error) {
    console.error("Error fetching product detail:", error);
    throw error;
  }
};

export const getPoliciesDetail = async (url) => {
  try {
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.get(`/cms/${url}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching product detail:", error);
    throw error;
  }
};

export const getSocialIcon = async () => {
  try {
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.get(`/socialmedia`);
    return res.data;
  } catch (error) {
    console.error("Error fetching product detail:", error);
    throw error;
  }
};
