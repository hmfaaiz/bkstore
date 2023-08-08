import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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


const Header = (props) => {
  const [userSearch, setUserSearch] = useState([]);

  

  return (
    <div>
      <StyledHeader>
        <h1>Faaiz Book Store</h1>
        <TextInput onChange={(e)=>setUserSearch(e.target.value)} placeholder="Search Author, Title, Isbn" />
        <Button onClick={()=>props.search(userSearch)} >Search</Button>
      
      </StyledHeader>
    </div>
  );
};

export default Header;
