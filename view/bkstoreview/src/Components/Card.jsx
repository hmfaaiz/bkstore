import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Cookies from "universal-cookie";

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
  overflow: hidden;
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


const Cart = (props) => {
  const reviews = props.data.reviews
  const [myreview, setMyreview] = useState("...")

  const cookies = new Cookies();
  const [showFullComment, setShowFullComment] = useState(false);

  const commentText = "Lorem ipsum dolor sit amet, Laaaaaassls dddddddddddd ggg hh jdddddddddddda ddddddd dd ddd d  oconsectetur adipiscing elit. Sed condimentum justo vel purus consequat.";

  const toggleComment = () => {
    setShowFullComment(!showFullComment);
  };



  const AddReview = () => {
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
        alert("Successfully added")

      })

      .catch((err) => {
        alert(err)
      })

  };


  const EditReview=(i)=>{
    console.log(props.data.reviews[i],myreview)
    const obj = {
      reviews: myreview
    }
    let url=`http://localhost:2000/api/book/updatereview/${props.data.isbn}/${props.data.reviews[i].id}`

    axios(url,{
      method:'PUT',
      data:JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
        "Authorization": cookies.get("token"),
      },
    })
    .then((res)=>alert("Successfully Edited"))
    .catch((err)=>alert(err))

  }
  const DeleteReview=(i)=>{
    console.log(props.data.reviews[i],myreview)
   
    let url=`http://localhost:2000/api/book/deletereview/${props.data.isbn}/${props.data.reviews[i].id}`

    axios(url,{
      method:'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization": cookies.get("token"),
      },
    })
    .then((res)=>alert("Successfully Deleted"))
    .catch((err)=>alert(err))

  }

  //{showFullComment ? item.review : `${item.review.slice(0, 50)}...`}


  return (
    <>
      <Container>
        <BookDetailsContainer>
          <BookImage src="https://m.media-amazon.com/images/I/4112f+p3VKL._SY344_BO1,204,203,200_.jpg" alt="Book Cover" />
          <div>
            <BookTitle>{props.data.title}</BookTitle>
            <BookAuthor>Author : {props.data.author}</BookAuthor>
            <BookDescription>
              Lorem ipsum dolor sit amet, Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque eligendi quia, officiis placeat, dolore, similique libero voluptates
              psa iste provident! consectetur adipiscing elit. Sed condimentum justo vel purus consequat.
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

                        {showFullComment ? item.review : `${item.review.slice(0, 50)}...`}
                        {!showFullComment && (
                          <SeeMoreButton onClick={toggleComment}>See More</SeeMoreButton>
                        )}
                        {showFullComment && (
                          <SeeMoreButton onClick={toggleComment}>. Less</SeeMoreButton>
                        )}
                        {item.username == "faaiz" ?
                          (
                            <ModifyCont>
                              <EditButton onClick={()=>EditReview(i)}>Edit</EditButton>
                              <DeleteButton onClick={()=>DeleteReview(i)}>Delete</DeleteButton>

                            </ModifyCont> 
                            ):(
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
          <SendButton onClick={AddReview}>&gt; </SendButton>
        </InputContainer>
      </Container>

    </>
  );
};

export default Cart;
