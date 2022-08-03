import React from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { FaCarrot } from "react-icons/fa";

import instance from "../axiosConfig";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const MyChatRoom = () => {
  const getChatRoom = async () => {
    const res = await instance.get("/api/myrooms");
    return res.data;
  };

  const roomInfo = useQuery(["chatRoomList"], getChatRoom, {
    refetchOnWindowFocus: false,
  });

  const myNickname = localStorage.getItem("nickname");

  console.log(roomInfo.data);

  return (
    <MainDiv>
      {roomInfo &&
        roomInfo.data.map((data, idx) => (
          <React.Fragment key={idx}>
            <Link to={`/chatroom/${data.postId}`}>
              <ChatBox>
                <ProfileAndUserInfoBox>
                  <FaCarrot />
                  <UserInfoBox>
                    {myNickname === data.buyerNickname ? (
                      <h2>{data.sellerNickname}</h2>
                    ) : (
                      <h2>{data.buyerNickname}</h2>
                    )}
                    <h3>
                      {data.messageList &&
                        data.messageList[data.messageList.length - 1]}
                    </h3>
                  </UserInfoBox>
                </ProfileAndUserInfoBox>
                <ImageBox>
                  <img src="/image/logo.png" alt="productimage" />
                </ImageBox>
              </ChatBox>
            </Link>
          </React.Fragment>
        ))}
      <Footer theme={"chat"} />
    </MainDiv>
  );
};

export default MyChatRoom;

const MainDiv = styled.div`
  width: 40rem;
  height: calc(100vh - 7rem);
  margin: 0rem auto 7rem;
  justify-content: center;
  overflow-y: auto;
`;

const ChatBox = styled.div`
  display: flex;
  width: 100%;
  height: 8rem;
  justify-content: space-between;
  border-bottom: 1px solid #f1f1f1;
  cursor: pointer;
`;

const ProfileAndUserInfoBox = styled.div`
  display: flex;
  height: 8rem;
  width: 20rem;
  align-items: center;
  justify-content: left;
  svg {
    margin-left: 3rem;
    margin-right: 2rem;
    padding: 0.5rem;
    border: 1px solid #e78111;
    border-radius: 5rem;
    color: #e78111;
    width: 4rem;
    height: 4rem;
  }
`;

const UserInfoBox = styled.div`
  h2 {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  h3 {
    font-size: 0.8rem;
    font-weight: 600;
  }
`;

const ImageBox = styled.div`
  width: 11rem;
  height: 8rem;
  position: relative;
  background: #ffecd7;
  img {
    position: absolute;
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 5px;
  }
`;
