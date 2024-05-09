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
    try{
        const response=await api.fetchRoles();
        toast.success(response.data.message,{position:"top-right"});
        return {response:response?.data}
    }catch(error){
        toast.error(`${error?.response?.data?.statusCode?.message} ${error?.response?.data?.message}`,{position:"top-right"});
        throw error
    }
});


const addRoleApiResponse =  createAsyncThunk("/role/register/", async({formData,toast})=>{
    try{
        const response=await api.addRole(formData);
        toast.success(response.data.message,{position:"top-right"});
        return {response:response?.data}
    }catch(error){
        toast.error(`${error?.response?.data?.statusCode?.message} ${error?.response?.data?.message}`,{position:"top-right"});
        throw error
    }
});

const updateRoleApiResponse =  createAsyncThunk("/role/update/id", async({formData,toast})=>{
    try{
        const response=await api.updateRole(formData);
        toast.success(response.data.message,{position:"top-right"});
        return {response:response?.data}
    }catch(error){
        toast.error(`${error?.response?.data?.statusCode?.message} ${error?.response?.data?.message}`,{position:"top-right"});
        throw error
    }
});

const deleteRoleApiResponse =  createAsyncThunk("/role/delete/id", async({formData,toast})=>{
    try{
        const response=await api.deleteRole(formData);
        toast.success(response.data.message,{position:"top-right"});
        return {response:response?.data}
    }catch(error){
        toast.error(`${error?.response?.data?.statusCode?.message} ${error?.response?.data?.message}`,{position:"top-right"});
        throw error
    }
});


const addCategoryApiResponse =  createAsyncThunk("/category/register/", async({formData,toast})=>{
    try{
        const response=await api.addCategory(formData);
        toast.success(response.data.message,{position:"top-right"});
        return {response:response?.data}
    }catch(error){
        toast.error(`${error?.response?.data?.statusCode?.message} ${error?.response?.data?.message}`,{position:"top-right"});
        throw error
    }
});

const fetchCategoryApiResponse =  createAsyncThunk("/category/get-categories/", async({search,toast})=>{
    try{
        const response=await api.fetchAllCategory(search);
        toast.success(response.data.message,{position:"top-right"});
        return {response:response?.data}
    }catch(error){
        toast.error(`${error?.response?.data?.statusCode?.message} ${error?.response?.data?.message}`,{position:"top-right"});
        throw error
    }
});

const updateCategoryApiResponse =  createAsyncThunk("/category/update/", async({formData,toast})=>{
    try{
        const response= await api.updateCategory(formData);
        toast.success(response.data.message,{position:"top-right"});
        return {response:response?.data}
    }catch(error){
        console.log('...............rr',`${error?.response?.data?.statusCode?.message} ${error?.response?.data?.message}`);
        toast.error(`${error?.response?.data?.statusCode?.message} ${error?.response?.data?.message}`,{position:"top-right"});
        throw error
    }
});


const fetchContactApiResponse =  createAsyncThunk("/contact/get-all-contacts/", async({search,toast})=>{
    try{
        const response=await api.fetchContact(search);
        toast.success(response.data.message,{position:"top-right"});
        return {response:response?.data}
    }catch(error){
        toast.error(`${error?.response?.data?.statusCode?.message} ${error?.response?.data?.message}`,{position:"top-right"});
        throw error
    }
});





export {
    loginApiResponse,
    logoutApiResponse,
    rolesApiResponse,
    addRoleApiResponse,
    updateRoleApiResponse,
    deleteRoleApiResponse,
    addCategoryApiResponse,
    fetchCategoryApiResponse,
    updateCategoryApiResponse,
    fetchContactApiResponse
}