
import { createSlice } from '@reduxjs/toolkit';
import Cookies from "universal-cookie";




const cookies = new Cookies();
const initialState = {}



const Signin = (obj) => {
    if (obj.username && obj.password) {
        fetch("http://localhost:2000/api/user/login", {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json',

            },
        })
            .then((data) => data.json())
            .then((res) => {
                console.log("Yes")

                if (res.user === false) {
                    alert("User not found")
                }
                else if (res.password === false) {
                    alert("Wrong Password")
                }
                else {
                    // alert("Welcome Back 1")
                    // setUser(res)
                    cookies.set("token", res)
                    localStorage.setItem("login", true)
                    return true
                    // naviagte('/home')
                }
                return false
            })
            .catch(() => {
                alert("Try again")
            })
    }
    else {
        alert("Fill all Data")
    }
}


const Signout = () => {
    console.log("reducer logout")
    cookies.remove("token")
    localStorage.removeItem("login")



}
const LoginSlice = createSlice({
    name: "LoginUser",
    initialState,
    reducers: {
        LoginUser: (state, action) => {
            Signin(action.payload)
        },
        LogoutUser: () => { Signout() }
    }
})

export const { LoginUser, LogoutUser } = LoginSlice.actions;
export default LoginSlice.reducer;