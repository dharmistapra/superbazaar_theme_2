import { createServerAxios } from "./apiClient";

export const getMenu = async () => {
  try {
    const axiosInstance = await createServerAxios();
    const res = await axiosInstance.get(`/categorymenu`);
    console.log("get menu", res);

    return res.data?.data || {};
  } catch (error) {
    return error;
  }
};


export const getCurrency = async () => {
  try {
    const axiosInstance = await createServerAxios();
    const res = await axiosInstance.get(`/currency`);
    return res.data?.data || {};
  } catch (error) {
    return error;
  }
};