import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";





const loginApiResponse =  createAsyncThunk("/user/login", async({formData,toast,isNavigate})=>{
    try{
        const response=await api.login(formData);
        toast.success(response.data.message,{position:"top-right"});
        return {response:response?.data,isNavigate}
    }catch(err){
        console.log('...............three',err?.response?.data?.statusCode?.message);
        toast.error(err?.response?.data?.statusCode?.message,{position:"top-right"});
        return {error:err?.response?.data}
    }
});

const logoutApiResponse =  createAsyncThunk("/user/logout", async({formData,toast,isNavigate})=>{
    console.log('logout 2');
    try{
        console.log('logout 3');
        const response=await api.logout(formData);
        console.log('logout 4');
        toast.success(response.data.message,{position:"top-right"});
        return {response:response?.data,isNavigate}
    }catch(err){
        console.log('logout 5');
        toast.error(err?.response?.data?.statusCode?.message,{position:"top-right"});
        return {error:err?.response?.data}
    }
});


const rolesApiResponse =  createAsyncThunk("/role/get-roles", async({toast})=>{
    console.log('logout 2');
    try{
        console.log('logout 3');
        const response=await api.fetchRoles();
        console.log('logout 4');
        toast.success(response.data.message,{position:"top-right"});
        return {response:response?.data,isNavigate}
    }catch(err){
        console.log('logout 5');
        toast.error(err?.response?.data?.statusCode?.message,{position:"top-right"});
        return {error:err?.response?.data}
    }
});





export {
    loginApiResponse,
    logoutApiResponse,
    rolesApiResponse
}