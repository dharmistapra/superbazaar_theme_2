import { createClientAxios } from "./apiClient";

export const getBrandListing = async (perPage,pageNo,search) => {
  try {
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.get(`/brands?perPage=${perPage}&pageNo=${pageNo}&search=${search}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching product detail:", error);
    throw error;
  }
};

export const getBrandCatalogueListing = async (data) => {
  try {
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.post(`/brand-catalogue`,data);
    return res.data;
  } catch (error) {
    console.error("Error fetching product detail:", error);
    throw error;
  }
};