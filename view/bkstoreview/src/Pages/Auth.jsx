import React, { useEffect } from 'react'
import { useNavigate,useLocation } from 'react-router-dom';
const Auth = (props) => {
    const navigate = useNavigate('');
    const location = useLocation('');
    useEffect(() => {
        const isLogin = localStorage.getItem("login")

        console.log("auth", isLogin)
        if (isLogin === null || isLogin===false) {
            navigate('/')
        }
        else if(location.pathname==="/"){
            navigate('/home')
        }
     
        

    },[])

    return (
        <>
            <props.Component />
        </>
    )
}

export default Auth
