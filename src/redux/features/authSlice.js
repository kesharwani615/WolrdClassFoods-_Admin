import { createSlice } from '@reduxjs/toolkit'
import { useApiResponse } from '../apiResponse';

  export const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        error:"",
        loading:false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(useApiResponse.pending, (state, action) => {
                state.message = "";
                state.error = "";
                state.loading = true;
            })
            .addCase(useApiResponse.fulfilled, (state, action) => {
                if(action.payload?.response?.statusCode === 200){
                    state.user = action.payload?.response?.data;
                    console.log('/////////////ee',action.payload.response.data);
                    localStorage.setItem("world_class_user",JSON.stringify(action?.payload?.response?.data));
                    state.message = action.payload?.response?.message;
                    state.error = "";
                    state.loading = false;
                }else{
                    localStorage.setItem("world_class_user",null);
                    console.log('else');
                    // window.location.href = 'http://127.0.0.1:5173/#/login'
                    // window.location.replace('http://127.0.0.1:5173/#/login')
                }
            })
            .addCase(useApiResponse.rejected, (state, action) => {
                state.message = "";
                console.log('errrrr',action.error);
                state.error = action.error.message;
                state.loading = false;
            })
            
        
          
    }
  })
  
  
  export default authSlice.reducer