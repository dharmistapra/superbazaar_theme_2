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
  finalFilters = {}
) => {
  try {
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
export const getProductdetail=async(url)=>{
  try {
    const res = await axiosInstance.get(`/product-detail/${url}`);
    
    return res.data;
  } catch (error) {
    console.error("Error fetching category filter   :", error);
    throw error;
  }
}
export const getProductStitching=async(url)=>{
  try {
    const res = await axiosInstance.get(`/product-stitching/${url}`);
    
    return res.data;
  } catch (error) {
    console.error("Error fetching category filter   :", error);
    throw error;
  }
}
export const getProductAttributes=async(url)=>{
  try {
    const res = await axiosInstance.get(`/product-attributes/${url}`);
    
    return res.data;
  } catch (error) {
    console.error("Error fetching category filter   :", error);
    throw error;
  }
}