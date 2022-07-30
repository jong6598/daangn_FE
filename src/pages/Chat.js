import React from "react";
import styled from "styled-components";
import Footer from "../components/Footer";

const Chat = () => {
  return (
    <MainDiv>
      <Footer theme={"chat"} />
    </MainDiv>
  );
};

export default Chat;

const MainDiv = styled.div`
  width: 40rem;
  height: calc(100vh - 7rem);
  margin: 0rem auto 7rem;
  justify-content: center;
  background-color: violet;
`;
