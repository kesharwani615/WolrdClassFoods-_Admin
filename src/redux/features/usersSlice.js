import { createSlice } from '@reduxjs/toolkit'
import { fetchUsersApiResponse, updateUserStatusApiResponse, deleteUserApiResponse,changePasswordUserApiResponse } from '../apiResponse';

  export const usersSlice = createSlice({
    name:"users",
    initialState:{
        users:[],
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
           .addCase(fetchUsersApiResponse.pending, (state, action) => {
                state.message = "";
                state.error = "";
                state.loading = true;
                state.isModalOpen = false;
            })
            .addCase(fetchUsersApiResponse.fulfilled, (state, action) => {
                if(action.payload?.response?.success){
                    state.users = action.payload?.response?.data;
                    state.message = action.payload?.response?.message;
                    state.error = "";
                    state.loading = false;
                } else {
                    state.loading = false;
                }
            })
            .addCase(fetchUsersApiResponse.rejected, (state, action) => {
                state.message = "";
                state.error = action.error.message;
                state.loading = false;
            })
           .addCase(changePasswordUserApiResponse.pending, (state, action) => {
                state.message = "";
                state.error = "";
                state.loading = true;
                state.isModalOpen = true;
            })
            .addCase(changePasswordUserApiResponse.fulfilled, (state, action) => {
                if(!!action.payload?.response?.success){
                    state.message = action.payload?.response?.message;
                    state.error = "";
                    state.loading = false;
                    state.isModalOpen = false;
                } else {
                    state.loading = false;
                    state.isModalOpen = true;
                }
            })
            .addCase(changePasswordUserApiResponse.rejected, (state, action) => {
                state.message = "";
                state.error = action.error.message;
                state.loading = false;
                state.isModalOpen = true;
            })
           .addCase(updateUserStatusApiResponse.pending, (state, action) => {
                state.message = "";
                state.error = "";
                state.loading = !true;
                state.isUpdateModalOpen = true;
                state.saveLoading = true;
            })
            .addCase(updateUserStatusApiResponse.fulfilled, (state, action) => {
                if(!!action.payload?.response?.success){
                    state.users = state.users.map((x)=> {
                         if(x._id === action.payload?.response?.data?._id ){
                            x.isActive = action?.payload?.response?.data?.isActive
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
            .addCase(updateUserStatusApiResponse.rejected, (state, action) => {
                state.message = "";
                state.error = action.error.message;
                state.loading = false;
                state.isUpdateModalOpen = true;
                state.saveLoading = false;
            })
           .addCase(deleteUserApiResponse.pending, (state, action) => {
                state.message = "";
                state.error = "";
                state.loading = !true;
                state.isDeleteModalOpen = true;
                state.saveLoading = true;
            })
            .addCase(deleteUserApiResponse.fulfilled, (state, action) => {
                if(!!action.payload?.response?.success){
                    state.users = state.users.filter((x)=> String(x._id) !== String(action.payload?.response?.data?._id))
                    state.message = action.payload?.response?.message;
                    state.error = "";
                    state.loading = false;
                    state.isDeleteModalOpen = false;
                } else {
                    state.loading = false;
                    state.isDeleteModalOpen = true;
                }
                state.saveLoading = false
            })
            .addCase(deleteUserApiResponse.rejected, (state, action) => {
                state.message = "";
                state.error = action.error.message;
                state.loading = false;
                state.isDeleteModalOpen = true;
                state.saveLoading = false
            })
            
        
          
    }
  })
  
  
  export default usersSlice.reducer