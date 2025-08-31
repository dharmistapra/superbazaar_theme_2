import { createServerAxios } from "./apiClient";

export const getHomeBanners = async () => {
  try {
    const axiosInstance = await createServerAxios(); 
    const res = await axiosInstance.get(`/homebanner`);
    return res.data?.data || {};
  } catch (error) {
    return error;
  }
};

export const getHomeContent = async () => {
  try {
    const axiosInstance = await createServerAxios();
    const res = await axiosInstance.get(`/home-data`);
    return res.data?.data || {};
  } catch (error) {
    return error;
  }
};

export const getHomeProductlist = async (url,purchaseType) => {
  try {
    const axiosInstance = await createServerAxios();
    const res = await axiosInstance.get(`/home-layout/collection/${url}?purchaseType=${purchaseType}`);
    return res.data?.data || {};
  } catch (error) {
    return error;
  }
};

export const getTestimonal = async () => {
  try {
    const axiosInstance = await createServerAxios();
    const res = await axiosInstance.get(`/testimonials`);
    return res.data?.data || {};
  } catch (error) {
    return error;
  }
};
