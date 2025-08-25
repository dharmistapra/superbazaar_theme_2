import axiosInstance from "./apiClient";
export const getHomeBanners = async () => {
  try {
    const res = await axiosInstance.get(`/homebanner`);
    return res.data?.data || {};
  } catch (error) {
    return error;
  }
};

export const getHomeContent=async()=>{
    try{
const res = await axiosInstance.get(`/home-data`);
    return res.data?.data || {};
    }catch(error){
        return error
    }
}


export const getHomeProductlist=async(url)=>{
    try{
      const res = await axiosInstance.get(`/home-layout/collection/${url}?purchaseType=retail`);
    return res.data?.data || {};
    }catch(error){
        return error
    }
}