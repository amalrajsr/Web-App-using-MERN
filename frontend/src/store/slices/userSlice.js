
import { createSlice } from "@reduxjs/toolkit";


const userSlice= createSlice({
    name:'user',
    initialState:{},
    reducers:{
        addUser(state,action){
           state.value=action.payload
        },
        updateUser(state,action){
    
        return {...state,image:action.payload}
        },
        removeUser(state){
            return {}
        }
    }
})

export const {addUser,removeUser,updateUser} =userSlice.actions
export const userReducer=userSlice.reducer