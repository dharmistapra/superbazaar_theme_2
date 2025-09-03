import { createClientAxios, createServerAxios } from "./apiClient";

export const getCataloguedetail = async (url) => {
  try {
    const axiosInstance = await createServerAxios();
    const res = await axiosInstance.get(`/catalogueproduct/${url}`);

    return res.data;
  } catch (error) {
    console.error("Error fetching product detail:", error);
    throw error;
  }
};
export const getCatalogueStitching = async (url) => {
  try {
    const axiosInstance = await createServerAxios();
    const res = await axiosInstance.get(`/catalogue-stitching/${url}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching product stitching:", error);
    throw error;
  }
};
export const getRelatedCatalogue = async (url) => {
  try {
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.get(`/catalogue-realted/${url}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching product detail:", error);
    throw error;
  }
};

export const getAllCatalogue = async (page, category, perPage = 20, sortOption) => {
  try {
    const url = `/wholesale?page=${page}&perPage=20${category}&sortOption=${sortOption}`
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.get(url);
    return res.data;
  } catch (error) {
    console.error("Error fetching product detail:", error);
    throw error;
  }
};


