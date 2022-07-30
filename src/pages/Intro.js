import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";



const Intro = () => {
  const navigater = useNavigate();

  return (
    <>
      <IntroBox>
        <img src="/image/logo.png" alt="logo" />
        <p>당신 근처의 당근마켓</p>
        <p>내 동네를 설정하고</p>
        <p>당근마켓을 시작해보세요.</p>
      </IntroBox>
      <JoinBox>
        <button onClick={() => navigater("/join")}>시작하기</button>
      </JoinBox>
      <LoginBox>
        <p>이미 계정이 있나요?</p>
        <button onClick={() => navigater("/login")}>로그인</button>
      </LoginBox>
    </>
  );
};

export default Intro;

const IntroBox = styled.div`
  margin: 15vh auto;
  width: 40vw;
  img {
    width: 15rem;
    height: 15rem;
  }
`;

const JoinBox = styled.div`
  button{
    cursor: pointer;
    padding: 1rem 10rem;
    font-size: 1.5rem;
    color: white;
    background-color: #e78111;
    outline: 0;
    border:0;
    border-radius: 0.7rem;
  }
`


const LoginBox = styled.div`
  align-items: center;
  display:flex;
  flex-direction:row;
  justify-content: center;
  button {
    margin-left: 0.5rem;
    background-color: white;
    outline: 0;
    border: 0;
    font-size: 1rem;
    color: #e78111;
    cursor: pointer;
  }
`;

