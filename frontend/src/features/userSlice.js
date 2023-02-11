import { createSlice } from "@reduxjs/toolkit"; 

const initialState={
   currentUser:null
}

export const userSlice=createSlice({
    name:'user',
    initialState,
    reducers: {
         loginSuccess:(state,action)=>{
            state.currentUser=action.payload
         },
         loginFailure:(state,action)=>{
            state.currentUser=action.payload
         },
         logout:(state)=>{
            state.value=initialState
         }
    }
}
  
)

export const {loginSuccess,loginFailure,logout}=userSlice.actions
export default userSlice.reducer