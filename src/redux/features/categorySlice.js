import { createSlice } from '@reduxjs/toolkit'
import { addCategoryApiResponse,fetchCategoryApiResponse,updateCategoryApiResponse, deleteCategoryApiResponse } from '../apiResponse';

  export const categorySlice = createSlice({
    name:"category",
    initialState:{
        categoriesList:[],
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
        .addCase(addCategoryApiResponse.pending, (state, action) => {
            state.message = "";
            state.error = "";
            state.loading = true;
            state.isModalOpen = true;
        })
        .addCase(addCategoryApiResponse.fulfilled, (state, action) => {
            if(!!action.payload?.response?.success){
                state.categoriesList = [...state.categoriesList,action.payload?.response?.data];
                state.message = action.payload?.response?.message;
                state.error = "";
                state.loading = false;
                state.isModalOpen = false;
            } else {
                state.loading = false;
                state.isModalOpen = true;
            }
        })
        .addCase(addCategoryApiResponse.rejected, (state, action) => {
            state.message = "";
            state.error = action.error.message;
            state.loading = false;
            state.isModalOpen = true;
        })
           .addCase(fetchCategoryApiResponse.pending, (state, action) => {
                state.message = "";
                state.error = "";
                state.loading = true;
                state.isModalOpen = false;
            })
            .addCase(fetchCategoryApiResponse.fulfilled, (state, action) => {
                if(!!action.payload?.response?.success){
                    state.categoriesList = action.payload?.response?.data;
                    state.message = action.payload?.response?.message;
                    state.error = "";
                    state.loading = false;
                } else {
                    state.loading = false;
                }
            })
            .addCase(fetchCategoryApiResponse.rejected, (state, action) => {
                state.message = "";
                state.error = action.error.message;
                state.loading = false;
            })
          
           .addCase(updateCategoryApiResponse.pending, (state, action) => {
                state.message = "";
                state.error = "";
                state.loading = !true;
                state.isUpdateModalOpen = true;
                state.saveLoading = true;
            })
            .addCase(updateCategoryApiResponse.fulfilled, (state, action) => {
                if(!!action.payload?.response?.success){
                    state.categoriesList = state.categoriesList.map((x)=> {
                         if(x._id === action.payload?.response?.data?._id ){
                            x.categoryName = action?.payload?.response?.data?.categoryName
                            x.categoryDescription = action?.payload?.response?.data?.categoryDescription
                            x.categoryImage = action?.payload?.response?.data?.categoryImage
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
            .addCase(updateCategoryApiResponse.rejected, (state, action) => {
                state.message = "";
                state.error = action.error.message;
                state.loading = false;
                state.isUpdateModalOpen = true;
                state.saveLoading = false;
            })
           .addCase(deleteCategoryApiResponse.pending, (state, action) => {
                state.message = "";
                state.error = "";
                state.loading = !true;
                state.isDeleteModalOpen = true;
                state.saveLoading = true;
            })
            .addCase(deleteCategoryApiResponse.fulfilled, (state, action) => {
                if(!!action.payload?.response?.success){
                    state.categoriesList = state.categoriesList.filter((x)=> String(x._id) !== String(action.payload?.response?.data?._id))
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
            .addCase(deleteCategoryApiResponse.rejected, (state, action) => {
                state.message = "";
                state.error = action.error.message;
                state.loading = false;
                state.isDeleteModalOpen = true;
                state.saveLoading = false;
            })
            
        
          
    }
  })
  
  
  export default categorySlice.reducer