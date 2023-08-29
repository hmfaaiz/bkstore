import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
const { GetBookApi } = require("../Utils/api")
const { SearchBookApi } = require("../Utils/api")

const cookies = new Cookies();

export const GetBooksData = createAsyncThunk("GetBooksData", async (search='') => {
    console.log("search",search)
    try {
        const token = cookies.get("token")

        const headers = {
            "Content-Type": "application/json",
            "Authorization": token
        };

        let url;

        if (search) {
            url = `${SearchBookApi}/${search}`
        }
        else {
            url = `${GetBookApi}`
        }
        const res = await fetch(url, {
            method: "GET",
            headers: headers
        })

        const a = await res.json()
        const bookArray = Array.isArray(a) ? a : [a]
        console.log("bookArray", bookArray)
        return bookArray

    }

    catch (err) {
        console.log("err")

    }
    // const a=await res.json()

    // const bookArray = Array.isArray(a) ? a: [a]
    // console.log("bookArray",bookArray)
    // return bookArray
})



const BookSlice = createSlice({
    name: "Book",
    initialState: { dataBooks: null, isLoading: false, isError: false },

    extraReducers: (builder) => {
        builder.addCase(GetBooksData.pending, (state, action) => {
            state.isLoading = true;

        });
        builder.addCase(GetBooksData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.dataBooks = action.payload;
            console.log("Payload", action.payload)

        });

        builder.addCase(GetBooksData.rejected, (state, action) => {
            state.isError = true;

        });


    }


})





// export const  {setBooks} =BookSlice.actions
export default BookSlice.reducer;
