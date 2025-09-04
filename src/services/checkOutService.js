import  { createClientAxios } from "./apiClient";
export const getPyamentMethod = async (values) => {
  try {
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.get(`/payment/method`);
    return res.data || {};
  } catch (error) {
    return error;
  }
};
export const getShippingMethod = async (query) => {
  try {
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.get(`/protected/shippingmethod?${query}`);
    return res.data || {};
  } catch (error) {
    return error;
  }
};

export const postOrder = async (values) => {
  try {
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.post(`/protected/orders`,values);
    return res.data || {};
  } catch (error) {
    return error;
  }
};

