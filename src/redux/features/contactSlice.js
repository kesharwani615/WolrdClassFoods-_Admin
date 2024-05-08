import { createSlice } from '@reduxjs/toolkit'
import { fetchContactApiResponse } from '../apiResponse';

  export const contactSlice = createSlice({
    name:"contactUs",
    initialState:{
        contactList:[],
        error:"",
        loading:false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchContactApiResponse.pending, (state, action) => {
            state.message = "";
            state.error = "";
            state.loading = true;
        })
        .addCase(fetchContactApiResponse.fulfilled, (state, action) => {
            if(!!action.payload?.response?.success){
                state.contactList = action.payload?.response?.data;
                state.message = action.payload?.response?.message;
                state.error = "";
            }
            state.loading = false;
        })
        .addCase(fetchContactApiResponse.rejected, (state, action) => {
            state.message = "";
            state.error = action.error.message;
            state.loading = false;
        })




  
    }
  })
  
  
  export default contactSlice.reducer