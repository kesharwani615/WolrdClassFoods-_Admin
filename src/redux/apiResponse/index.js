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

const fetchCategoryApiResponse =  createAsyncThunk("/category/get-categories/", async({search="",toast=null})=>{
    try{
        const response=await api.fetchAllCategory(search);
        if(toast){
            toast.success(response.data.message,{position:"top-right"});
        }
        return {response:response?.data}
    }catch(error){
        if(toast){
            toast.error(`${error?.response?.data?.statusCode?.message} ${error?.response?.data?.message}`,{position:"top-right"});
        }
        throw error
    }
});

const updateCategoryApiResponse =  createAsyncThunk("/category/update/", async({formData,toast})=>{
    try{
        const response= await api.updateCategory(formData);
        toast.success(response.data.message,{position:"top-right"});
        return {response:response?.data}
    }catch(error){
        toast.error(`${error?.response?.data?.statusCode?.message} ${error?.response?.data?.message}`,{position:"top-right"});
        throw error
    }
});

const deleteCategoryApiResponse =  createAsyncThunk("/category/delete/id/", async({formData,toast})=>{
    try{
        const response=await api.deleteCategory(formData);
        toast.success(response.data.message,{position:"top-right"});
        return {response:response?.data}
    }catch(error){
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

const fetchContactByIdApiResponse =  createAsyncThunk("/contact/get-contactById/", async({formData,toast})=>{
    try{
        const response=await api.fetchContactById(formData);
        toast.success(response.data.message,{position:"top-right"});
        return {response:response?.data}
    }catch(error){
        toast.error(`${error?.response?.data?.statusCode?.message} ${error?.response?.data?.message}`,{position:"top-right"});
        throw error
    }
});


// sub categories routes
const fetchSubCategoryApiResponse =  createAsyncThunk("/sub_category/get-sub-categories/", async({search="",toast=null})=>{
    try{
        const response=await api.fetchAllSubCategory(search);
        if(toast){
            toast.success(response.data.message,{position:"top-right"});
        }
        return {response:response?.data}
    }catch(error){
        if(toast){
            toast.error(`${error?.response?.data?.statusCode?.message} ${error?.response?.data?.message}`,{position:"top-right"});
        }
        throw error
    }
});

const addSubCategoryApiResponse =  createAsyncThunk("/sub_category/register/", async({formData,toast})=>{
    try{
        const response=await api.addSubCategory(formData);
        toast.success(response.data.message,{position:"top-right"});
        return {response:response?.data}
    }catch(error){
        toast.error(`${error?.response?.data?.statusCode?.message} ${error?.response?.data?.message}`,{position:"top-right"});
        throw error
    }
});

const updateSubCategoryApiResponse =  createAsyncThunk("/sub_category/update/", async({formData,toast})=>{
    try{
        const response= await api.updateSubCategory(formData);
        toast.success(response.data.message,{position:"top-right"});
        return {response:response?.data}
    }catch(error){
        toast.error(`${error?.response?.data?.statusCode?.message} ${error?.response?.data?.message}`,{position:"top-right"});
        throw error
    }
});

const deleteSubCategoryApiResponse =  createAsyncThunk("/sub_category/delete/id/", async({formData,toast})=>{
    try{
        const response=await api.deleteSubCategory(formData);
        toast.success(response.data.message,{position:"top-right"});
        return {response:response?.data}
    }catch(error){
        toast.error(`${error?.response?.data?.statusCode?.message} ${error?.response?.data?.message}`,{position:"top-right"});
        throw error
    }
});

const fetchSubCategoryByIdApiResponse =  createAsyncThunk("/sub_/category/get-sub-category/", async({formData,toast})=>{
    try{
        const response=await api.fetchSubCategoryById(formData);
        toast.success(response.data.message,{position:"top-right"});
        return {response:response?.data}
    }catch(error){
        toast.error(`${error?.response?.data?.statusCode?.message} ${error?.response?.data?.message}`,{position:"top-right"});
        throw error
    }
});

const fetchAllProductsApiResponse =  createAsyncThunk("/fetch/All/Products/", async({search,toast})=>{
    try{
        const response=await api.fetchAllProducts(search);
        toast.success(response.data.message,{position:"top-right"});
        return {response:response?.data}
    }catch(error){
        toast.error(`${error?.response?.data?.statusCode?.message} ${error?.response?.data?.message}`,{position:"top-right"});
        throw error
    }
});

const addProductApiResponse =  createAsyncThunk("/product/register/", async({formData,toast})=>{
    try{
        const response=await api.addProduct(formData);
        toast.success(response.data.message,{position:"top-right"});
        return {response:response?.data}
    }catch(error){
        toast.error(`${error?.response?.data?.statusCode?.message} ${error?.response?.data?.message}`,{position:"top-right"});
        throw error
    }
});

const updateProductApiResponse =  createAsyncThunk("/product/update/", async({formData,toast})=>{
    try{
        const response= await api.updateproduct(formData);
        toast.success(response.data.message,{position:"top-right"});
        return {response:response?.data}
    }catch(error){
        toast.error(`${error?.response?.data?.statusCode?.message} ${error?.response?.data?.message}`,{position:"top-right"});
        throw error
    }
});

const deleteProductApiResponse =  createAsyncThunk("/product/delete/id/", async({formData,toast})=>{
    try{
        const response=await api.deleteProduct(formData);
        toast.success(response.data.message,{position:"top-right"});
        return {response:response?.data}
    }catch(error){
        toast.error(`${error?.response?.data?.statusCode?.message} ${error?.response?.data?.message}`,{position:"top-right"});
        throw error
    }
});

const fetchProductByIdApiResponse =  createAsyncThunk("/product//get-by-id/", async({formData,toast})=>{
    try{
        const response=await api.fetchProductById(formData);
        toast.success(response.data.message,{position:"top-right"});
        return {response:response?.data}
    }catch(error){
        toast.error(`${error?.response?.data?.statusCode?.message} ${error?.response?.data?.message}`,{position:"top-right"});
        throw error
    }
});

const fetchDashboardApiResponse =  createAsyncThunk("/user/dashboard/", async({toast})=>{
    try{
        const response=await api.fetchDashboard();
        if(toast){
            toast.success(response.data.message,{position:"top-right"});
            return {response:response?.data}
        }
    }catch(error){
        if(toast){
            toast.error(`${error?.response?.data?.statusCode?.message} ${error?.response?.data?.message}`,{position:"top-right"});
        }
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
    deleteCategoryApiResponse,
    fetchContactApiResponse,
    fetchContactByIdApiResponse,
    fetchSubCategoryApiResponse,
    addSubCategoryApiResponse,
    updateSubCategoryApiResponse,
    deleteSubCategoryApiResponse,
    fetchSubCategoryByIdApiResponse,
    fetchAllProductsApiResponse,
    addProductApiResponse,
    updateProductApiResponse,
    deleteProductApiResponse,
    fetchProductByIdApiResponse,
    fetchDashboardApiResponse
}