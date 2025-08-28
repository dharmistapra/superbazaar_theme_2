import { createClientAxios, createServerAxios } from "./apiClient";
export const getUserInfo = async (id) => {
  try {
    const axiosInstance = await createServerAxios(); 
    const res = await axiosInstance.get(`protected/user/profile/${id}`);
    return res.data?.data || {};
  } catch (error) {
    console.log(error)
    return error;
  }
};
export const updateUserInfo = async (id,values) => {
  try {
    const axiosInstance = await createClientAxios(); 
    const res = await axiosInstance.put(`protected/user-update/${id}`,values);
    return res.data || {};
  } catch (error) {
    return error;
  }
};
export const getUserAddress = async (id) => {
  try {
    const axiosInstance = await createClientAxios(); 
    const res = await axiosInstance.get(`protected/user/address/${id}`);
    return res.data?.data || {};
  } catch (error) {
    return error;
  }
};
export const postuserAddress = async (values) => {
  try {
    const axiosInstance = await createClientAxios(); 
    const res = await axiosInstance.post(`protected/shipping/address`,values);
    return res.data || {};
  } catch (error) {
    return error;
  }
};
export const deleteUserAddress = async (id) => {
  try {
    const axiosInstance = await createClientAxios(); 
    const res = await axiosInstance.delete(`protected/shipping/address/${id}`);
    return res.data || {};
  } catch (error) {
    return error;
  }
};
export const postuserOrderHistory = async (values) => {
  try {
    const axiosInstance = await createClientAxios(); 
    const res = await axiosInstance.post(`protected/order/pagination`,values);
    return res.data || {};
  } catch (error) {
    return error;
  }
};
export const getUserWishlist= async (id) => {
  try {
    const axiosInstance = await createClientAxios(); 
    const res = await axiosInstance.get(`protected/wish-list`);
    return res.data || [];
  } catch (error) {
    return error;
  }
};