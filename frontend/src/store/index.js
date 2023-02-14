import { configureStore } from "@reduxjs/toolkit";
import { addUser,removeUser,updateUser,userReducer } from "./slices/userSlice";
import { addAdmin,removeAdmin ,adminReducer } from "./slices/adminSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig={
    key:'root',
    version:1,
    storage
}

const reducer=combineReducers({
    user:userReducer,
    admin:adminReducer

})

const persistedReducer=persistReducer(persistConfig,reducer)

const store=configureStore({
    reducer:persistedReducer
})

export {addUser,removeUser,updateUser} 
export {addAdmin,removeAdmin}
export default store