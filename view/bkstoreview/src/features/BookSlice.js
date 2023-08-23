import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
const {GetBooksApi} =require("../Utils/api.js")

const cookies = new Cookies();

export const GetBooksData=createAsyncThunk("GetBooksData",async()=>{
    const token=cookies.get("token")
    console.log("token")
    const headers={
        "Content-Type":"application/json",
        "Authorization":token
    };
    const res=await fetch(`http://localhost:2000/api/book`,{
        method:"GET",
        headers:headers
    })
    const a=await res.json()
    const bookArray = Array.isArray(a) ? a: [a]
    console.log("bookArray",bookArray)
    return bookArray
})



const BookSlice = createSlice({
    name: "Book",
    initialState : {dataBooks:null,isLoading:false,isError:false},
 
    extraReducers:(builder)=>{
        builder.addCase(GetBooksData.pending,(state,action)=>{
            state.isLoading=true;
            
        });
        builder.addCase(GetBooksData.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.dataBooks=action.payload;
            console.log("Payloadf",typeof(state.dataBooks))
        });
      
        builder.addCase(GetBooksData.rejected,(state,action)=>{
            state.isError=true;
            
        });


    }


})





// export const  {setBooks} =BookSlice.actions
export default BookSlice.reducer;
