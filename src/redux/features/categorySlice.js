import { createSlice } from '@reduxjs/toolkit'
import { addCategoryApiResponse,fetchCategoryApiResponse,updateCategoryApiResponse, deleteCategoryApiResponse,fetchSubCategoryApiResponse,addSubCategoryApiResponse, updateSubCategoryApiResponse, deleteSubCategoryApiResponse, fetchSubCategoryByIdApiResponse } from '../apiResponse';

  export const categorySlice = createSlice({
    name:"category",
    initialState:{
        categoriesList:[],
        subCategoriesList:[],
        subCategory:null,
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

    //sub categories route slice
    .addCase(addSubCategoryApiResponse.pending, (state, action) => {
        state.message = "";
        state.error = "";
        state.loading = true;
        state.isModalOpen = true;
    })
    .addCase(addSubCategoryApiResponse.fulfilled, (state, action) => {
        if(!!action.payload?.response?.success){
            state.subCategoriesList = [...state.subCategoriesList,action.payload?.response?.data];
            state.message = action.payload?.response?.message;
            state.error = "";
            state.loading = false;
            state.isModalOpen = false;
        } else {
            state.loading = false;
            state.isModalOpen = true;
        }
    })
    .addCase(addSubCategoryApiResponse.rejected, (state, action) => {
        state.message = "";
        state.error = action.error.message;
        state.loading = false;
        state.isModalOpen = true;
    })
       .addCase(fetchSubCategoryApiResponse.pending, (state, action) => {
            state.message = "";
            state.error = "";
            state.loading = true;
            state.isModalOpen = false;
        })
        .addCase(fetchSubCategoryApiResponse.fulfilled, (state, action) => {
            if(!!action.payload?.response?.success){
                state.subCategoriesList = action.payload?.response?.data;
                state.message = action.payload?.response?.message;
                state.error = "";
                state.loading = false;
            } else {
                state.loading = false;
            }
        })
        .addCase(fetchSubCategoryApiResponse.rejected, (state, action) => {
            state.message = "";
            state.error = action.error.message;
            state.loading = false;
        })
      
       .addCase(updateSubCategoryApiResponse.pending, (state, action) => {
            state.message = "";
            state.error = "";
            state.loading = !true;
            state.isUpdateModalOpen = true;
            state.saveLoading = true;
        })
        .addCase(updateSubCategoryApiResponse.fulfilled, (state, action) => {
            if(!!action.payload?.response?.success){
                state.subCategoriesList = state.subCategoriesList.map((x)=> {
                     if(x._id === action.payload?.response?.data?._id ){
                        x.categoryId = action?.payload?.response?.data?.categoryId
                        x.subCategoryName = action?.payload?.response?.data?.subCategoryName
                        x.subCategoryDescription = action?.payload?.response?.data?.subCategoryDescription
                        x.subCategoryImage = action?.payload?.response?.data?.subCategoryImage
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
        .addCase(updateSubCategoryApiResponse.rejected, (state, action) => {
            state.message = "";
            state.error = action.error.message;
            state.loading = false;
            state.isUpdateModalOpen = true;
            state.saveLoading = false;
        })
       .addCase(deleteSubCategoryApiResponse.pending, (state, action) => {
            state.message = "";
            state.error = "";
            state.loading = !true;
            state.isDeleteModalOpen = true;
            state.saveLoading = true;
        })
        .addCase(deleteSubCategoryApiResponse.fulfilled, (state, action) => {
            if(!!action.payload?.response?.success){
                state.subCategoriesList = state.subCategoriesList.filter((x)=> String(x._id) !== String(action.payload?.response?.data?._id))
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
        .addCase(deleteSubCategoryApiResponse.rejected, (state, action) => {
            state.message = "";
            state.error = action.error.message;
            state.loading = false;
            state.isDeleteModalOpen = true;
            state.saveLoading = false;
        })
            
    //fetch singel sub category
    .addCase(fetchSubCategoryByIdApiResponse.pending, (state, action) => {
        state.message = "";
        state.error = "";
        state.loading = true;
        state.isModalOpen = false;
    })
    .addCase(fetchSubCategoryByIdApiResponse.fulfilled, (state, action) => {
        if(!!action.payload?.response?.success){
            state.subCategory = action.payload?.response?.data;
            state.message = action.payload?.response?.message;
            state.error = "";
            state.loading = false;
        } else {
            state.loading = false;
        }
    })
    .addCase(fetchSubCategoryByIdApiResponse.rejected, (state, action) => {
        state.message = "";
        state.error = action.error.message;
        state.loading = false;
    })
          
    }
  })
  
  
  export default categorySlice.reducer