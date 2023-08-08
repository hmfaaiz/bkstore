import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

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

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  margin-top: 20px;
`;


const InputBox = styled.div`
  margin-bottom: 15px;
  margin-right: 15px;
  
  
 
`;

const Label = styled.span`
  display: block;
  font-weight: 500;
  margin-bottom: 5px;
`;

const Input = styled.input`
  height: 45px;
  width: 100%;
  outline: none;
  font-size: 16px;
  border-radius: 5px;
  padding-left: 15px;
  border: 1px solid #ccc;
  border-bottom-width: 2px;
  transition: all 0.3s ease;
`;


const ButtonContainer = styled.div`
  height: 45px;
   margin: 35px 0;
`;
const Button = styled.button`
  height: 100%;
   width: 100%;
   border-radius: 5px;
   border: none;
   color: #fff;
   font-size: 18px;
   font-weight: 500;
   letter-spacing: 1px;
   cursor: pointer;
   transition: all 0.3s ease;
   background: linear-gradient(135deg, #71b7e6, #9b59b6);
 
`;



const StyledLink = styled(Link)`
  text-decoration: none;
  color: #ffffff;
  `;

const Register = () => {

    const [myusername, setUsername] = useState('');
    const [mypassword, setPassword] = useState('');
    const naviagte = useNavigate('');


    const signup = (e) => {
        e.preventDefault()
        console.log("Hello")
        const obj = {
            username: myusername,
            password: mypassword

        }
        console.log(obj)

        if (obj.username && obj.password) {
            fetch("http://localhost:2000/api/user/register", {
                method: "POST",
                body: JSON.stringify(obj),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((data) => data.json())
                .then((res) => {
                    alert(JSON.stringify(res))
                    naviagte('/')
                })
                .catch(() => {
                    alert("Try again")
                })


        }
        else {
            alert("Fill all Data")
        }



    }


    return (
        <Body>
            <Container>
                <Title>
                    <h1>User Registration</h1>
                    <TitleBefore />
                </Title>
                <Content>
                    <InputBox>
                        <Label>Username</Label>
                        <Input type='text' value={myusername} onChange={(e) => setUsername(e.target.value)} />
                    </InputBox>

                   

                    <InputBox>
                        <Label>Password</Label>
                        <Input type='password' id='password' value={mypassword} onChange={(e) => setPassword(e.target.value)} />
                    </InputBox>

                    <ButtonContainer>
                        <Button onClick={signup} id="submitform">
                            Register
                        </Button>
                    </ButtonContainer>

                    <ButtonContainer>
                        <Button>
                            <StyledLink to="/">Login</StyledLink>
                        </Button>

                    </ButtonContainer>

                </Content>



            </Container>
        </Body>

    )
}

export default Register
