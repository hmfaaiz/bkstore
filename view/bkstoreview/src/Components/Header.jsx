import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { LogoutUser } from "../features/LoginSlice"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetBooksData } from "../features/BookSlice"
const StyledHeader = styled.header`
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 30px;
`;

const Button = styled.button`
  margin: 5px;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: #45a049;
  }
`;

const StyledMain = styled.main`
  margin: 25px;
`;

const TextInput = styled.input`
  flex: 1;
  border: none;
  padding: 8px;
  font-size: 14px;
  border-radius: 8px;
  outline: none;
`;


const Header = () => {
  const [userSearch, setUserSearch] = useState([]);
  const naviagte = useNavigate('');
  const dispatch = useDispatch()

  const Logout = () => {


    dispatch(LogoutUser())
    console.log("logout click", localStorage.getItem("login"))
    if (localStorage.getItem("login")) {
      naviagte('/home')
    }
    else {
      naviagte('/')
    }

  }
  useEffect(() => {
    dispatch(GetBooksData(userSearch))
    console.log("Stat2")

  },[userSearch])



  return (
    <div>
      <StyledHeader>
        <h1>Faaiz Book Store</h1>
        <TextInput onChange={(e) => setUserSearch(e.target.value)} placeholder="Search Author, Title, Isbn" />
        {/* <Button onClick={Search(userSearch)} >Search</Button> */}
        {/* <Button onClick={()=>props.search(userSearch)} >Search</Button> */}
        <Button onClick={Logout} >Logout</Button>

      </StyledHeader>
    </div>
  );
};

export default Header;
