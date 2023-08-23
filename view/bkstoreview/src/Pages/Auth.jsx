import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from "universal-cookie";


const Auth = (props) => {
    const cookies = new Cookies();
    const navigate = useNavigate('');
    const location = useLocation('');
    const token = cookies.get("token")
    useEffect(() => {
        const isLogin = localStorage.getItem("login")
        console.log("auth", isLogin,token)

        if ((token === undefined) || (isLogin === null || isLogin === "false")) {
            console.log("aaa122", isLogin)
            navigate('/')
        }
        else if (location.pathname === "/") {
            console.log("aaa", isLogin, token)
            navigate('/home')
        }



    }, [])

    return (
        <>
            <props.Component />
        </>
    )
}

export default Auth
