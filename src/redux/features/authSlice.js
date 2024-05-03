import { createSlice } from '@reduxjs/toolkit'
import { loginApiResponse, logoutApiResponse } from '../apiResponse';

  export const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        error:"",
        loading:false,
        isNavigate:false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginApiResponse.pending, (state, action) => {
                state.message = "";
                state.error = "";
                state.loading = true;
            })
            .addCase(loginApiResponse.fulfilled, (state, action) => {
                if(action.payload?.response?.statusCode === 200){
                    state.user = action.payload?.response?.data;
                    console.log('/////////////ee',action.payload.isNavigate);
                    localStorage.setItem("world_class_user",JSON.stringify(action?.payload?.response?.data));
                    state.message = action.payload?.response?.message;
                    state.error = "";
                    state.loading = false;
                    state.isNavigate = action.payload.isNavigate;
                }else{
                    localStorage.setItem("world_class_user",null);
                    state.loading = false;
                    console.log('else');
                    // window.location.href = 'http://127.0.0.1:5173/#/login'
                    // window.location.replace('http://127.0.0.1:5173/#/login')
                }
            })
            .addCase(loginApiResponse.rejected, (state, action) => {
                state.message = "";
                console.log('errrrr',action.error);
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(logoutApiResponse.pending, (state, action) => {
                state.message = "";
                state.error = "";
                state.loading = true;
            })
            .addCase(logoutApiResponse.fulfilled, (state, action) => {
                if(action.payload?.response?.statusCode === 200){
                    state.user = action.payload?.response?.data;
                    console.log('///logoutttt',action.payload.isNavigate);
                    localStorage.removeItem("world_class_user");
                    state.message = action.payload?.response?.message;
                    state.error = "";
                    state.loading = false;
                    state.isNavigate = action.payload.isNavigate;
                } else{
                    state.loading = false;
                }
            })
            .addCase(logoutApiResponse.rejected, (state, action) => {
                state.message = "";
                console.log('errrrr',action.error);
                state.error = action.error.message;
                state.loading = false;
            })
            
        
          
    }
  })
  
  
  export default authSlice.reducer