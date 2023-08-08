import React, { useEffect, useState,forwardRef,useImperativeHandle } from 'react';
import styled from 'styled-components';
import Card from "../Components/Card.jsx";
import axios from 'axios';
import Cookies from "universal-cookie";


const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content:center; 
  align-items:center;
   
`;



const Cards = (props,ref) => {
  const cookies = new Cookies();
  const [data, setData] = useState([])
  
  const SearchData = (userSearch) => {

    axios(`http://localhost:2000/api/book/search/${userSearch}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": cookies.get("token"),

      },
    })

      .then((res) => {
        const bookArray = Array.isArray(res.data) ? res.data : [res.data];

        setData(bookArray)
       
      })

      .catch((err) => {
        alert(err)
      })

  }


   useImperativeHandle(ref, () => ({
        searchData: SearchData
    }));

  const GetData = () => {
    axios("http://localhost:2000/api/book", {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": cookies.get("token"),

      },
    })

      .then((res) => {
        const bookArray = Array.isArray(res.data) ? res.data : [res.data];

        setData(bookArray)
       
      })

      .catch((err) => {
        alert(err)
      })

  }



  useEffect(() => {
    GetData()

  }, [])

  return (
    <div>
      {data?
        (
          data.map((item,i) => (
            <Card data={item} key={i}/>
          ))) :
        (<p>Please wait</p>)
      }
    </div>
  )

};

export default forwardRef(Cards);
