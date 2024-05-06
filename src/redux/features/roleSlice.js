import { createSlice } from '@reduxjs/toolkit'
import { rolesApiResponse } from '../apiResponse';

  export const roleSlice = createSlice({
    name:"role",
    initialState:{
        roles:[],
        error:"",
        loading:false,
        isNavigate:false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
           .addCase(rolesApiResponse.pending, (state, action) => {
                state.message = "";
                state.error = "";
                state.loading = true;
            })
            .addCase(rolesApiResponse.fulfilled, (state, action) => {
                console.log('action.payload?.response==========',action.payload);
                if(action.payload?.response?.statusCode === 200){
                    state.roles = action.payload?.response?.data;
                    state.message = action.payload?.response?.message;
                    state.error = "";
                    state.loading = false;
                } else {
                    state.loading = false;
                }
            })
            .addCase(rolesApiResponse.rejected, (state, action) => {
                state.message = "";
                console.log('errrrr',action?.error);
                state.error = action.error.message;
                state.loading = false;
            })
            
        
          
    }
  })
  
  
  export default roleSlice.reducer