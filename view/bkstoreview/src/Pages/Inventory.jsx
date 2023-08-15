import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Cookies from 'universal-cookie';

const Body = styled.body`


min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  overflow: auto;
  background: linear-gradient(135deg, #71b7e6, #9b59b6);`;


const Container = styled.div`
  max-width: 700px;
  width: 100%;
  background-color: #fff;
  padding: 25px 30px;
  border-radius: 5px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: 500;
  position: relative;
  margin-bottom:14px;

`;

const TitleBefore = styled.span`
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3px;
  width: 30px;
  border-radius: 5px;
  background: linear-gradient(135deg, #71b7e6, #9b59b6);
`;






const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  background-color: #0570e2;
  color:white;
`;

const TableRow = styled.tr`

   
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  padding: 10px;
`;

const ImageCell = styled(TableCell)`
  max-width: 100px;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
`;

const Button = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  background-color: #0570e2;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

const ScrollableTableBody = styled.tbody`
   `;



const InventoryPage = () => {
  const cookies = new Cookies();
  const [data, setData] = useState([])



  const handleRemove = (id) => {

  };

  const handleUpdate = (id) => {

  };


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
        console.log(bookArray)

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
    <Body>
      <Container>
        <Title>
          <h2>Book Inventory</h2>
          <TitleBefore />
        </Title>

        <Table>
          <thead>
            <tr>
              <TableHeader>Image</TableHeader>
              <TableHeader>ISBN</TableHeader>
              <TableHeader>Title</TableHeader>
              <TableHeader>Author</TableHeader>
              <TableHeader>Description</TableHeader>

              <TableHeader>Actions</TableHeader>
            </tr>
          </thead>
          {/* <tbody> */}



          <ScrollableTableBody>

            {data.map((book) => (
              <TableRow >
                <ImageCell><Image src={`http://localhost:2000/${book.image}`}/></ImageCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>Dec</TableCell>

                <TableCell>
                  <Button >Update</Button>
                  <Button >Remove</Button>
                </TableCell>
              </TableRow>

            ))}

          </ScrollableTableBody>

          {/* </tbody> */}
        </Table>

      </Container>
    </Body>
  );
};

export default InventoryPage;
