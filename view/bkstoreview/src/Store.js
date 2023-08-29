import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import LoginUser  from "./features/LoginSlice";
import BookSlice  from "./features/BookSlice";
import ReviewSlice  from "./features/CommentSlice";


const rootReducer=combineReducers({
    Review:ReviewSlice,
    Book:BookSlice,
    Log:LoginUser
})

export const Store=configureStore({
    reducer:rootReducer
    // reducer:{
    //     Log:LoginUser
    // }
   
})