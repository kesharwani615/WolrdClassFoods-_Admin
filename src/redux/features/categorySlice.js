import { createSlice } from '@reduxjs/toolkit'
import { addCategoryApiResponse } from '../apiResponse';

  export const roleSlice = createSlice({
    name:"role",
    initialState:{
        category:[],
        error:"",
        loading:false,
        isModalOpen:false,
        isUpdateModalOpen:false,
        isDeleteModalOpen:false,
        isNavigate:false
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
                state.category = [...state.category,action.payload?.response?.data];
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






        //    .addCase(rolesApiResponse.pending, (state, action) => {
        //         state.message = "";
        //         state.error = "";
        //         state.loading = true;
        //         state.isModalOpen = false;
        //     })
        //     .addCase(rolesApiResponse.fulfilled, (state, action) => {
        //         if(action.payload?.response?.statusCode === 200){
        //             state.roles = action.payload?.response?.data;
        //             state.message = action.payload?.response?.message;
        //             state.error = "";
        //             state.loading = false;
        //         } else {
        //             state.loading = false;
        //         }
        //     })
        //     .addCase(rolesApiResponse.rejected, (state, action) => {
        //         state.message = "";
        //         state.error = action.error.message;
        //         state.loading = false;
        //     })
          
        //    .addCase(updateRoleApiResponse.pending, (state, action) => {
        //         state.message = "";
        //         state.error = "";
        //         state.loading = true;
        //         state.isUpdateModalOpen = true;
        //     })
        //     .addCase(updateRoleApiResponse.fulfilled, (state, action) => {
        //         if(!!action.payload?.response?.success){
        //             state.roles = state.roles.map((x)=> {
        //                  if(x._id === action.payload?.response?.data._id ){
        //                     x.roleName = action?.payload?.response?.data?.roleName
        //                     x.isActive = action?.payload?.response?.data?.isActive
        //                     x.createdAt = action?.payload?.response?.data?.createdAt
        //                  }
        //                  return x;
        //             })
        //             state.message = action.payload?.response?.message;
        //             state.error = "";
        //             state.loading = false;
        //             state.isUpdateModalOpen = false;
        //         } else {
        //             state.loading = false;
        //             state.isUpdateModalOpen = true;
        //         }
        //     })
        //     .addCase(updateRoleApiResponse.rejected, (state, action) => {
        //         state.message = "";
        //         state.error = action.error.message;
        //         state.loading = false;
        //         state.isUpdateModalOpen = true;
        //     })
        //    .addCase(deleteRoleApiResponse.pending, (state, action) => {
        //         state.message = "";
        //         state.error = "";
        //         state.loading = true;
        //         state.isDeleteModalOpen = true;
        //     })
        //     .addCase(deleteRoleApiResponse.fulfilled, (state, action) => {
        //         if(!!action.payload?.response?.success){
        //             state.roles = state.roles.filter((x)=> String(x._id) !== String(action.payload?.response?.data._id))
        //             state.message = action.payload?.response?.message;
        //             state.error = "";
        //             state.loading = false;
        //             state.isDeleteModalOpen = false;
        //         } else {
        //             state.loading = false;
        //             state.isDeleteModalOpen = true;
        //         }
        //     })
        //     .addCase(deleteRoleApiResponse.rejected, (state, action) => {
        //         state.message = "";
        //         state.error = action.error.message;
        //         state.loading = false;
        //         state.isDeleteModalOpen = true;
        //     })
            
        
          
    }
  })
  
  
  export default roleSlice.reducer