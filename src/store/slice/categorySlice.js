import { createSlice } from "@reduxjs/toolkit";
const initialState={
    data:[]
}
const CategorySlice=createSlice({
    name:"CategorySlice",
    initialState:initialState,
    reducers:{
        setCategoyData:(state,action)=>{
            state.data=action.payload
        }
    }

})
export const { setCategoyData } = CategorySlice.actions;
export default CategorySlice.reducer