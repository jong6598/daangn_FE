import React from "react";
import styled from "styled-components";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaCarrot } from "react-icons/fa";

import instance from "../axiosConfig";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const MyChatRoom = () => {
  const queryClient = useQueryClient();
  const regex = /(http(s))?:\/\/([a-z0-9-]+\.)+[a-z0-9]{2,4}.*$/;

  const getChatRoom = async () => {
    const res = await instance.get("/api/myrooms");
    return res.data;
  };

  const roomInfo = useQuery(["chatRoomList"], getChatRoom, {
    refetchOnWindowFocus: false,
  });

  const myNickname = localStorage.getItem("nickname");

  const chatDelete = async (roomId) => {
    await instance.delete(`/api/room/${roomId}`);
    queryClient.invalidateQueries('chatRoomList');
  }
  
  return (
    <MainDiv>
      <HeaderBox>
        <p>채팅목록</p>
      </HeaderBox>
      {roomInfo &&
        roomInfo.data.map((data, idx) => (
          <React.Fragment key={idx}>
            <ChatBox>
              <ProfileAndUserInfoBox>
                <FaCarrot />
                <Link to={`/chat/${data.id}`}>
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
                </Link>
                <DeleteBtn onClick={() => {chatDelete(`${data.id}`)}}>삭제</DeleteBtn>
              </ProfileAndUserInfoBox>
              <ImageBox>
                {data.imageUrl && regex.test(data.imageUrl) ? (
                  <img src={data.imageUrl} alt="postimage" />
                    ) : (
                  <img src="/image/logo.png" alt="postimage" />
                  )}
              </ImageBox>
            </ChatBox>
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
  margin: 0 auto;
  justify-content: center;
  overflow-y: auto;
  background: #fffbf7;
`;

const HeaderBox = styled.div`
  display: flex;
  align-items: center;
  width: 40rem;
  height: 4rem;
  background: #ffecd7;
  p {
    margin-left: 2rem;
    font-weight: 700;
  }
`;

const ChatBox = styled.div`
  display: flex;
  width: 100%;
  height: 8rem;
  justify-content: space-between;
  border-bottom: 1px solid #f1f1f1;
`;

const ProfileAndUserInfoBox = styled.div`
  display: flex;
  height: 8rem;
  width: 25rem;
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

const DeleteBtn = styled.div`
  margin-left: 1rem;
  padding: 0.2rem;
  font-weight: 700;
  width: 3rem;
  border-radius: 5px;
  background: #f1f1f1;
  cursor: pointer;
`;

const ImageBox = styled.div`
  width: 9rem;
  height: 6rem;
  position: relative;
  background: #ffecd7;
  margin: 1rem 1rem 0 0;
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
