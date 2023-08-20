import { configureStore } from "@reduxjs/toolkit";
import LoginUser  from "./features/LoginSlice";

export const Store=configureStore({
    reducer:{
        Log:LoginUser,
   
    }
})