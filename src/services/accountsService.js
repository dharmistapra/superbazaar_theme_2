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

export const getUserAddress = async ({id}) => {
  try {
    const axiosInstance = await createServerAxios(); 
    const res = await axiosInstance.get(`protected/user/address/${id}`);
    return res.data?.data || {};
  } catch (error) {
    return error;
  }
};