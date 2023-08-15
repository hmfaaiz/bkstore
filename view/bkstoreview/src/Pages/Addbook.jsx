import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Cookies from 'universal-cookie';
// const FormContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px;
//   max-width: 400px;
//   margin: 0 auto;
//   background-color:red;

//   @media (max-width: 768px) {
//     max-width: 100%;
//   }
// `;

const Body = styled.body`


min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  overflow: auto;
  background: linear-gradient(135deg, #71b7e6, #9b59b6);`;


const FormContainer = styled.div`
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



const InputBox = styled.div`
  margin-bottom: 15px;
  margin-right: 15px;
`;


const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
 
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const FormButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const FileUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`;

const ImageUploadLabel = styled.label`
  font-weight: bold;
  cursor: pointer;
`;

const ImageInput = styled.input`
  display: none;
`;




const ImagePreview = styled.img`
  max-width: 100%;
  height: auto;
  margin-top: 10px;
`;

const Addbook = ({ onAddBook }) => {
  const [isbn, setIsbn] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [pdf, setPdf] = useState(null);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };
  const handlePdfChange = (e) => {
    const selectedPdf = e.target.files[0];
    setPdf(selectedPdf);
  };


  const newBook = new FormData();
  newBook.append("isbn", isbn);
  newBook.append("title", title);
  newBook.append("author", author);
  newBook.append("image", image);
  newBook.append("pdf", pdf);


  const Submit = (e) => {
    console.log(newBook.isbn)
    e.preventDefault();
    axios('http://localhost:2000/api/book', {
      method: "POST",
      data: newBook,
      headers: {
        // "Content-Type": "application/json",
        "Content-Type": "multipart/form-data",
        // "Authorization":Cookies.get('token')
      }

    })
      .then((res) => {
        console.log(res)
        alert("SuccessfullyBok is added")
      })

      .catch((err) => {
        alert(err)
      })
  }




  return (
    <Body>
      <FormContainer>

        <Title>
          <h2>Add a New Book</h2>
          <TitleBefore />
        </Title>


        <form onSubmit={Submit}>


          <InputBox >
            <FormInput
              type="text"
              placeholder="ISBN"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              required
            />
          </InputBox >
          <InputBox>
            <FormInput
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </InputBox>

          <InputBox>
            <FormInput
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </InputBox>

          <InputBox>
            <FormTextarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}

            />
          </InputBox>
          <ImageUploadLabel>
            Upload Image
            <ImageInput
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </ImageUploadLabel>
          <ImageUploadLabel>
            Upload book (in pdf)
            <ImageInput
              type="file"
              accept=".pdf"
              onChange={handlePdfChange}
            />
          </ImageUploadLabel>
          <FileUploadContainer>
            {image && <ImagePreview src={URL.createObjectURL(image)} alt="Preview" />}
          </FileUploadContainer>
          <FormButton type="submit">Add Book</FormButton>


        </form>

      </FormContainer>

    </Body>
  );
};

export default Addbook;
