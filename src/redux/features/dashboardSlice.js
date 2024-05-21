import { createSlice } from '@reduxjs/toolkit'
import {fetchDashboardApiResponse } from '../apiResponse';

  export const dashboardSlice = createSlice({
    name:"dashboard",
    initialState:{
        data:null,
        error:"",
        loading:false,
        isNavigate:false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardApiResponse.pending, (state, action) => {
                state.message = "";
                state.error = "";
                state.loading = true;
            })
            .addCase(fetchDashboardApiResponse.fulfilled, (state, action) => {
                if(action.payload?.response?.success){
                    state.data = action.payload?.response?.data;
                    state.message = action.payload?.response?.message;
                    state.error = "";
                    state.loading = false;
                }else{
                    state.loading = false;                   
                }
            })
            .addCase(fetchDashboardApiResponse.rejected, (state, action) => {
                state.message = "";
                state.error = action.error.message;
                state.loading = false;
            })
           
            
        
          
    }
  })
  
  
  export default dashboardSlice.reducer