import { createClientAxios, createServerAxios } from "./apiClient";
export const getHomeBanners = async () => {
  try {
    const axiosInstance = await createServerAxios();
    const res = await axiosInstance.get(`/public/banner`);
    return res.data?.data || {};
  } catch (error) {
    return error;
  }
};
export const getHomeContent = async () => {
  try {
    const axiosInstance = await createServerAxios();
    const res = await axiosInstance.get(`/public/home-data`);
    return res.data?.data || {};
  } catch (error) {
    return error;
  }
};
export const getHomeProductlist = async (url, purchaseType) => {
  try {
    const axiosInstance = await createServerAxios();
    const res = await axiosInstance.get(`/public/home/collection/${url}?purchaseType=${purchaseType}`);
    return res.data?.data || {};
  } catch (error) {
    return error;
  }
};
export const getTestimonal = async () => {
  try {
    const axiosInstance = await createServerAxios();
    const res = await axiosInstance.get(`/public/testimonials`);
    return res.data?.data || {};
  } catch (error) {
    return error;
  }
};
export const getCategorySlider = async () => {
  try {
    const axiosInstance = await createServerAxios();
    const res = await axiosInstance.get(`/public/category`);
    return res.data?.data || {};
  } catch (error) {
    return error;
  }
};
export const getPopups = async () => {
  try {
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.get(`/public/popups`);
    return res.data?.data || {};
  } catch (error) {
    return {}
  }
};

