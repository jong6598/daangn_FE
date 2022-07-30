import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BsChat, BsChatFill } from "react-icons/bs";
import { BsPerson, BsPersonFill } from "react-icons/bs";

const Footer = ({ theme }) => {
  return (
    <FooterComponent theme={theme}>
      <ChatBox>
        <Link to="/chat">
          {theme === "chat" ? <BsChatFill /> : <BsChat />}
          <p>채팅</p>
        </Link>
      </ChatBox>
      <HomeBox>
        <Link to="/home">
          <img src="/image/logo.png" alt="logo" />
        </Link>
      </HomeBox>
      <MypageBox>
        <Link to="/mypage">
          {theme === "mypage" ? <BsPersonFill /> : <BsPerson />}
          <p>나의 당근</p>
        </Link>
      </MypageBox>
    </FooterComponent>
  );
};

export default Footer;

const FooterComponent = styled.footer`
  font-size: 1.5rem;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40rem;
  height: 7rem;
  background: #ffecd7;
  bottom: 0;
  font-weight: 700;
  gap: 5rem;
  img {
    width: 6rem;
    height: 6rem;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  p {
    margin: 0;
  }
`;

const ChatBox = styled.div`
  color: #e78111;
  width: 7rem;
  svg {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

const HomeBox = styled.div`
    width: 7rem;
`;

const MypageBox = styled.div`
  width: 7rem;
  color: #e78111;
  svg {
    width: 3rem;
    height: 3rem;
  }
`;
