
import { createSlice } from "@reduxjs/toolkit";


const userSlice= createSlice({
    name:'user',
    initialState:[],
    reducers:{
        addUser(state,action){
           state.push(action.payload)
        },
        // updateUser(state,action){
        //     return [{...state,image:action.payload}]
        // },
        removeUser(state,action){
            return []
        }
    }
})

export const {addUser,removeUser,updateUser} =userSlice.actions
export const userReducer=userSlice.reducer