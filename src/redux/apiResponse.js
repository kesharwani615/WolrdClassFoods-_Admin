import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./api";





const useApiResponse =  createAsyncThunk(Date.now().toString(), async({method,formData,toast,navigate})=>{
    try{
        const response=await api[method](formData);
        toast.success(response.data.message,{position:"top-right"});
        return {response:response?.data}
    }catch(err){
        console.log('...............three',err?.response?.data?.statusCode?.message);
        toast.error(err?.response?.data?.statusCode?.message,{position:"top-right"});
        return {error:err?.response?.data}
    }
});





export {
    useApiResponse
}