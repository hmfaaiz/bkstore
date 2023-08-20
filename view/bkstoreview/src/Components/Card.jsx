import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Cookies from "universal-cookie";
import FileDownload from "js-file-download";
import TextField from '@mui/material/TextField';
import { Dialog, Box, styled as mtstyled } from "@mui/material"
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 550px;
  margin: 10px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const BookDetailsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const BookImage = styled.img`
  width: 100px;
  height: 150px;
  object-fit: cover;
  margin-right: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const BookTitle = styled.h2`
  margin: 0 0 5px 0;
  font-size: 20px;
  color: #333;
`;

const BookAuthor = styled.p`
  margin: 0;
  font-size: 16px;
  color: #777;
`;

const BookDescription = styled.p`
  margin: 5px 0;
  font-size: 14px;
  color: #555;
`;

const CommentContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  border-top: 1px solid #ccc;
  padding-top: 10px;
 
`;

const CommentUserImage = styled.div`

  width: 39px;
  height: 100px;
  margin-right:3px;
 
`;
const UserImage = styled.img`
  width: 30px;
  height: 30px;
  margin-top:10px;
  object-fit: cover;
  border-radius: 50%;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CommentContent = styled.div`
  flex: 1;
  max-width: 90%; 
  word-wrap: break-word;
  
`;

const CommentUserName = styled.p`
  margin: 0;
  font-weight: bold;
  font-size: 14px;
  color: #333;
`;

const CommentTime = styled.p`
  margin: 0;
  font-size: 12px;
  color: #777;
`;

const CommentText = styled.div`
  margin: 5px 0;
  font-size: 14px;
  color: #555;

`;

const CommentTextArea = styled.input`
  width: 95%;
  min-height: 20px;
  resize: vertical;
  font-size: 12px;
  padding: 5px;
  border-radius:12px;
  border: 1px solid #acacac;
`;

const SeeMoreButton = styled.button`
  background: transparent;
  border: none;
  font-size: 12px;
  cursor: pointer;
  color: blue;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-top:5px;
`;

const TextInput = styled.input`
  flex: 1;
  border: none;
  padding: 8px;
  font-size: 14px;
  border-radius: 8px;
  outline: none;

`;

const SendButton = styled.button`
  background-color: #25d366;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ModifyCont = styled.div`
  margin-top:4px;
  
`

const EditButton = styled.button`
  background: transparent;
  border: none;
  font-size: 10px;
  font-weight:bold;
  cursor: pointer;
  color: #010101;
`;
const DeleteButton = styled.button`
  background: transparent;
  border: none;
  font-size: 10px;
  font-weight:bold;
  cursor: pointer;
  color: #ff0000;
  margin-left:5px;
`;

const DialogueStyle = {
  height: '980%',
  width: '76%',
  maxWidth: '90%',
  maxHeight: '100%',
  marginTop: '17%',
  boxShadow: 'none',
  overflow: 'hidden',




}

const Cart = (props) => {
  console.log(props.data._id)
  const reviews = props.data.reviews
  const [myreview, setMyreview] = useState("")

  const cookies = new Cookies();
  const [showEditarea, setShowEditarea] = useState("");
  const [open, setOpen] = useState(true);
  const [pointerSee, setPointerSee] = useState();



  const toggleComment = (i) => {
    setPointerSee(i)
  };



  const AddReview = () => {
    console.log("myreview")
    const obj = {
      reviews: myreview
    }

    axios(`http://localhost:2000/api/book/addreview/${props.data.isbn}`, {
      method: 'POST',
      data: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
        "Authorization": cookies.get("token"),

      },
    })

      .then((res) => {


      })

      .catch((err) => {
        alert(err)
      })




  };


  const EditReview = (i) => {

    setOpen(false)
    const obj = {
      reviews: myreview
    }
    let url = `http://localhost:2000/api/book/updatereview/${props.data.isbn}/${props.data.reviews[i].id}`

    axios(url, {
      method: 'PUT',
      data: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
        "Authorization": cookies.get("token"),
      },
    })

      .catch((err) => alert(err))

  }
  const DeleteReview = (i) => {
    console.log(props.data.reviews[i], myreview)

    let url = `http://localhost:2000/api/book/deletereview/${props.data.isbn}/${props.data.reviews[i].id}`

    axios(url, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization": cookies.get("token"),
      },
    })

      .catch((err) => alert(err))

  }


  const EditButn = (i) => {
    setOpen(true)
    setMyreview(props.data.reviews[i].review)
    setShowEditarea(props.data.reviews[i].id)

  }

  const CloseEdit = () => {
    setOpen(false)

  }


  const Download = (e) => {
    console.log("Call", props.data._id)
    e.preventDefault();
    window.open(`http://localhost:2000/api/book/pdf/${props.data._id}`, "_blank");
  }


  return (
    <>
      <Container>
        <BookDetailsContainer>
          <BookImage src={`http://localhost:2000/${props.data.image}`} alt="Book Cover" />
          <div>
            <BookTitle>{props.data.title}</BookTitle>
            <BookAuthor>Author : {props.data.author}</BookAuthor>
            <BookDescription>
              Lorem ipsum dolor sit amet, Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque eligendi quia, officiis placeat, dolore, similique libero voluptates
              psa iste provident! consectetur adipiscing elit. Sed condimentum justo vel purus consequat.

              <button onClick={Download}>Open pdf</button>
            </BookDescription>
          </div>
        </BookDetailsContainer>
        {reviews.length > 0 ?

          (
            reviews.map((item, i) => {
              return (
                <>
                  <CommentContainer key={i}>
                    <CommentUserImage>
                      <UserImage src="https://www.milkround.com/advice/wp-content/uploads/how-to-take-a-good-linkedin-photo.jpg" alt="User" />
                    </CommentUserImage>
                    <CommentContent>

                      <CommentUserName>@{item.username}</CommentUserName>
                      <CommentTime>2 hours ago</CommentTime>
                      <CommentText>

                        {pointerSee == i ? item.review : `${item.review.slice(0, 50)}...`}
                        {pointerSee == i?(
                          <SeeMoreButton onClick={() => toggleComment()}>&nbsp; Less</SeeMoreButton>
                        ):
                        (

                        <SeeMoreButton onClick={() => toggleComment(i)}>See more</SeeMoreButton>

                        )
                      }

                        {item.username == "faaiz" ?
                          (
                            <ModifyCont>
                              <EditButton onClick={() => EditButn(i)}>Edit</EditButton>
                              <DeleteButton onClick={() => DeleteReview(i)}>Delete</DeleteButton>

                              {showEditarea == props.data.reviews[i].id ?
                                (
                                  <Box>
                                    <Dialog open={open} PaperProps={{ DialogueStyle }} >
                                      <DialogContent>
                                        <TextField onChange={(e) => setMyreview(e.target.value)} value={myreview} variant="standard" />
                                      </DialogContent>

                                      <DialogActions>

                                        {myreview != "" ? (
                                          <Button onClick={() => EditReview(i)}>Send</Button>

                                        ) : (
                                          <p></p>

                                        )
                                        }
                                        <Button onClick={CloseEdit}>Cancel</Button>
                                      </DialogActions>
                                    </Dialog>
                                  </Box>


                                ) : (<p></p>)
                              }


                            </ModifyCont>
                          ) : (
                            <p></p>
                          )

                        }


                      </CommentText>
                    </CommentContent>
                  </CommentContainer>
                </>

              )

            })


          )
          : (
            <p>No review</p>
          )

        }
        <InputContainer>
          <TextInput onChange={(e) => setMyreview(e.target.value)} placeholder="Add your comment here..." />
          {myreview != "" ? (
            <SendButton onClick={AddReview}>&gt; </SendButton>

          ) : (
            <p></p>

          )
          }

        </InputContainer>
      </Container>

    </>
  );
};

export default Cart;
