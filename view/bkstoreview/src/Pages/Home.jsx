import React, { useState,useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Header from "../Components/Header.jsx";
import Card from "../Components/Card.jsx";
import Cards from "../Components/Cards.jsx";


const Home = () => {
    const searchRef=useRef(null)
    const search=(userSearch)=>{
        searchRef.current.searchData(userSearch)
    }



    return (
        <>
    
            <Header search={search} />
          
            <Cards ref={searchRef}/>

        </>
    );
};

export default Home;
