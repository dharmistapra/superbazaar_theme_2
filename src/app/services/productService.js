import cleanFilters from "../helper/FilterClean";
import axiosInstance from "./apiClient";


export const getCategoryBanners = async (category) => {
  try {
    const res = await axiosInstance.get(`/menu-pagewisebanner/${category}`);
    return res.data?.data || {};
  } catch (error) {
    return error;
  }
};

export const getCategoryProducts = async (
  category,
  pageNo = 1,
  perPage = 20,
  sortOption = "",
  filters = {}
) => {
  try {
      const finalFilters = cleanFilters(filters);
    const res = await axiosInstance.get(`/product/${category}`, {
      params: {
        perPage,
        pageNo,
        sortOption,
        ...finalFilters,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching category products:", error);
    throw error;
  }
};


export const getCategoryFilter = async (category) => {
  try {
    const res = await axiosInstance.get(`/filter/${category}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching category filter   :", error);
    throw error;
  }
};