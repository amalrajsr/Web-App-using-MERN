
import { createSlice } from "@reduxjs/toolkit";


const adminSlice= createSlice({
    name:'user',
    initialState:[],
    reducers:{
        addAdmin(state,action){
           state.push(action.payload)
        },
        removeAdmin(state,action){
            return []
        }
    }
})

export const {addAdmin,removeAdmin} = adminSlice.actions
export const adminReducer= adminSlice.reducer