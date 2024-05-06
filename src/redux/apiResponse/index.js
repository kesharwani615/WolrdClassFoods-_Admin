import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";





const loginApiResponse =  createAsyncThunk("/user/login", async({formData,toast,isNavigate})=>{
    try{
        const response=await api.login(formData);
        toast.success(response?.data?.message,{position:"top-right"});
        return {response:response?.data,isNavigate}
    }catch(error){
        console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeee',`${error?.response?.data?.statusCode?.message} ${error?.response?.data?.message}`);
        toast.error(`${error?.response?.data?.statusCode?.message} ${error?.response?.data?.message}`,{position:"top-right"});
        return {error:error?.response?.data}
    }
});

const logoutApiResponse =  createAsyncThunk("/user/logout", async({formData,toast,isNavigate})=>{
    try{
        const response=await api.logout(formData);
        toast.success(response.data.message,{position:"top-right"});
        return {response:response?.data,isNavigate}
    }catch(error){
        toast.error(`${error?.response?.data?.statusCode?.message} ${error?.response?.data?.message}`,{position:"top-right"});
        return {error:error?.response?.data}
    }
});


const rolesApiResponse =  createAsyncThunk("/role/get-roles", async({toast})=>{
    console.log('roles 2');
    try{
        const response=await api.fetchRoles();
        toast.success(response.data.message,{position:"top-right"});
        return {response:response?.data}
    }catch(error){
        toast.error(`${error?.response?.data?.statusCode?.message} ${error?.response?.data?.message}`,{position:"top-right"});
        // return {error:err}
    }
});





export {
    loginApiResponse,
    logoutApiResponse,
    rolesApiResponse
}