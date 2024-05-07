import { createSlice } from '@reduxjs/toolkit'
import { rolesApiResponse,addRoleApiResponse, updateRoleApiResponse } from '../apiResponse';

  export const roleSlice = createSlice({
    name:"role",
    initialState:{
        roles:[],
        error:"",
        loading:false,
        isModalOpen:false,
        isNavigate:false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
           .addCase(rolesApiResponse.pending, (state, action) => {
                state.message = "";
                state.error = "";
                state.loading = true;
                state.isModalOpen = false;
            })
            .addCase(rolesApiResponse.fulfilled, (state, action) => {
                if(action.payload?.response?.statusCode === 200){
                    state.roles = action.payload?.response?.data;
                    state.message = action.payload?.response?.message;
                    state.error = "";
                    state.loading = false;
                    // state.isModalOpen = false;
                } else {
                    state.loading = false;
                    // state.isModalOpen = false;
                }
            })
            .addCase(rolesApiResponse.rejected, (state, action) => {
                state.message = "";
                console.log('errrrr',action?.error);
                state.error = action.error.message;
                state.loading = false;
            })
           .addCase(addRoleApiResponse.pending, (state, action) => {
                state.message = "";
                state.error = "";
                state.loading = true;
                state.isModalOpen = true;
            })
            .addCase(addRoleApiResponse.fulfilled, (state, action) => {
                console.log('action.payload?.response==========',action.payload);
                if(!!action.payload?.response?.success){
                    state.roles = [...state.roles,action.payload?.response?.data];
                    state.message = action.payload?.response?.message;
                    state.error = "";
                    state.loading = false;
                    state.isModalOpen = false;
                } else {
                    state.loading = false;
                    state.isModalOpen = true;
                }
            })
            .addCase(addRoleApiResponse.rejected, (state, action) => {
                state.message = "";
                console.log('errrrr',action?.error);
                state.error = action.error.message;
                state.loading = false;
                state.isModalOpen = true;
            })
           .addCase(updateRoleApiResponse.pending, (state, action) => {
                state.message = "";
                state.error = "";
                state.loading = true;
                state.isModalOpen = true;
            })
            .addCase(updateRoleApiResponse.fulfilled, (state, action) => {
                console.log('action.payload?.response===update=======',action.payload);
                if(!!action.payload?.response?.success){
                    state.roles = state.roles.map((x)=> {
                         if(x._id === action.payload.data._id ){
                            x.roleName = action?.payload?.data?.roleName
                            x.isActive = action?.payload.data?.isActive
                            x.createdAt = action?.payload?.data?.createdAt
                         }
                         return x;
                    })
                    state.message = action.payload?.response?.message;
                    state.error = "";
                    state.loading = false;
                    state.isModalOpen = false;
                } else {
                    state.loading = false;
                    state.isModalOpen = true;
                }
            })
            .addCase(updateRoleApiResponse.rejected, (state, action) => {
                state.message = "";
                console.log('errrrr',action?.error);
                state.error = action.error.message;
                state.loading = false;
                state.isModalOpen = true;
            })
            
        
          
    }
  })
  
  
  export default roleSlice.reducer