import { createClientAxios } from "./apiClient";
export const getWebSetting = async () => {
  try {
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.get(`websetting`);

    return res.data?.data || {};
  } catch (error) {
    return error;
  }
};