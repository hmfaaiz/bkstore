import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
const { AddReviewApi } = require("../Utils/api")


const cookies = new Cookies();

export const AddReviewData = createAsyncThunk("AddReviewData", async (props) => {
    console.log(AddReviewApi)
    console.log(JSON.stringify(props.obj))

    
    try {
        const token = cookies.get("token")
        const obj=props.obj
        const data= JSON.stringify(obj)
        console.log(data)

        const headers = {
            "Content-Type": "application/json",
            "Authorization": token
       
        };
     
        const addreview = await fetch(`${AddReviewApi}/${props.isbn}`, {
            method: "POST",
            body:data,
            headers: headers
        })

        .then((res) => {
            console.log("Addreview",res)
        })
  
        .catch((err) => {
          alert(err)
        })
  

        

    }

    catch (err) {
        console.log("err")

    }
   
})



const ReviewSlice = createSlice({
    name: "Review",
    initialState: { dataReview: null, isLoading: false, isError: false },

    extraReducers: (builder) => {
        builder.addCase(AddReviewData.pending, (state, action) => {
            state.isLoading = true;

        });
        builder.addCase(AddReviewData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.dataReview = action.payload;
            console.log("Payload", action.payload)

        });

        builder.addCase(AddReviewData.rejected, (state, action) => {
            state.isError = true;

        });


    }


})





// export const  {setBooks} =BookSlice.actions
export default ReviewSlice.reducer;
