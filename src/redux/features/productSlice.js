import { createSlice } from '@reduxjs/toolkit'
import { fetchAllProductsApiResponse,addProductApiResponse, updateProductApiResponse, deleteProductApiResponse, fetchProductByIdApiResponse } from '../apiResponse';

  export const productSlice = createSlice({
    name:"product",
    initialState:{
        productsList:[],
        product:null,
        error:"",
        loading:false,
        isModalOpen:false,
        isUpdateModalOpen:false,
        isDeleteModalOpen:false,
        isNavigate:false,
        saveLoading:false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(addProductApiResponse.pending, (state, action) => {
            state.message = "";
            state.error = "";
            state.loading = true;
            state.isModalOpen = true;
        })
        .addCase(addProductApiResponse.fulfilled, (state, action) => {
            if(!!action.payload?.response?.success){
                state.productsList = [...state.productsList,action.payload?.response?.data];
                state.message = action.payload?.response?.message;
                state.error = "";
                state.loading = false;
                state.isModalOpen = false;
            } else {
                state.loading = false;
                state.isModalOpen = true;
            }
        })
        .addCase(addProductApiResponse.rejected, (state, action) => {
            state.message = "";
            state.error = action.error.message;
            state.loading = false;
            state.isModalOpen = true;
        })
           .addCase(fetchAllProductsApiResponse.pending, (state, action) => {
                state.message = "";
                state.error = "";
                state.loading = true;
                state.isModalOpen = false;
            })
            .addCase(fetchAllProductsApiResponse.fulfilled, (state, action) => {
                if(!!action.payload?.response?.success){
                    state.productsList = action.payload?.response?.data;
                    state.message = action.payload?.response?.message;
                    state.error = "";
                    state.loading = false;
                } else {
                    state.loading = false;
                }
            })
            .addCase(fetchAllProductsApiResponse.rejected, (state, action) => {
                state.message = "";
                state.error = action.error.message;
                state.loading = false;
            })
          
           .addCase(updateProductApiResponse.pending, (state, action) => {
                state.message = "";
                state.error = "";
                state.loading = !true;
                state.isUpdateModalOpen = true;
                state.saveLoading = true;
            })
            .addCase(updateProductApiResponse.fulfilled, (state, action) => {
                if(!!action.payload?.response?.success){
                    state.productsList = state.productsList.map((x)=> {
                         if(x._id === action.payload?.response?.data?._id ){
                            x.subCategoryId = action?.payload?.response?.data?.subCategoryId
                            x.productName = action?.payload?.response?.data?.productName
                            x.productDescription = action?.payload?.response?.data?.productDescription
                            x.productImage = action?.payload?.response?.data?.productImage
                            x.storage = action?.payload?.response?.data?.storage
                            x.packSize = action?.payload?.response?.data?.packSize
                            x.cartonSize = action?.payload?.response?.data?.cartonSize
                            x.isActive = action?.payload?.response?.data?.isActive
                            x.createdAt = action?.payload?.response?.data?.createdAt
                         }
                         return x;
                    })
                    state.message = action.payload?.response?.message;
                    state.error = "";
                    state.loading = false;
                    state.isUpdateModalOpen = false;
                } else {
                    state.loading = false;
                    state.isUpdateModalOpen = true;
                }
                state.saveLoading = false;
            })
            .addCase(updateProductApiResponse.rejected, (state, action) => {
                state.message = "";
                state.error = action.error.message;
                state.loading = false;
                state.isUpdateModalOpen = true;
                state.saveLoading = false;
            })
           .addCase(deleteProductApiResponse.pending, (state, action) => {
                state.message = "";
                state.error = "";
                state.loading = !true;
                state.isDeleteModalOpen = true;
                state.saveLoading = true;
            })
            .addCase(deleteProductApiResponse.fulfilled, (state, action) => {
                if(!!action.payload?.response?.success){
                    state.productsList = state.productsList.filter((x)=> String(x._id) !== String(action.payload?.response?.data?._id))
                    state.message = action.payload?.response?.message;
                    state.error = "";
                    state.loading = false;
                    state.isDeleteModalOpen = false;
                } else {
                    state.loading = false;
                    state.isDeleteModalOpen = true;
                }
                state.saveLoading = false;
            })
            .addCase(deleteProductApiResponse.rejected, (state, action) => {
                state.message = "";
                state.error = action.error.message;
                state.loading = false;
                state.isDeleteModalOpen = true;
                state.saveLoading = false;
            })
            .addCase(fetchProductByIdApiResponse.pending, (state, action) => {
                state.message = "";
                state.error = "";
                state.loading = true;
                state.isModalOpen = false;
            })
            .addCase(fetchProductByIdApiResponse.fulfilled, (state, action) => {
                if(!!action.payload?.response?.success){
                    state.product = action.payload?.response?.data;
                    state.message = action.payload?.response?.message;
                    state.error = "";
                    state.loading = false;
                } else {
                    state.loading = false;
                }
            })
            .addCase(fetchProductByIdApiResponse.rejected, (state, action) => {
                state.message = "";
                state.error = action.error.message;
                state.loading = false;
            })

    
          
    }
  })
  
  
  export default productSlice.reducer