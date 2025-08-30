import  { createClientAxios } from "./apiClient";
export const addToCartProduct = async (values) => {
  try {
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.post(`/protected/cart-item`,values);
    return res.data || {};
  } catch (error) {
    return error;
  }
};
export const getCartItems=async(id)=>{
  try{
   
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.get(`/protected/cart-item/${id}`,);  
    return res.data
  }catch(error){
    return error.response?.data?.message
  }
}
export const putCartProduct = async (values) => {
  try {
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.put(`/protected/cart-item`,values);
    return res.data || {};
  } catch (error) {
    return error;
  }
};
export const deleteCartProduct = async (id) => {
  try {
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.delete(`/protected/deletecart-item/${id}`,);
    return res.data || {};
  } catch (error) {
    return error;
  }
};
export const updateCartQuantity = async (item, newQty,userId) => {
  try {
    console.log(item,newQty,userId)
    const finalCartData = {
      cartItem_id: item.id,
      quantity: newQty,
    };
    await putCartProduct(finalCartData);
    const freshCart = await getCartItems(userId);
    return freshCart; 
  } catch (err) {
    console.error("Error updating quantity:", err);
    return err;
  }
};