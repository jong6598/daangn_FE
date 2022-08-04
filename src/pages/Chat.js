import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import instance from "../axiosConfig";
import { BsBackspace } from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";

import * as StompJS from "stompjs";
import * as SockJS from "sockjs-client";

const Chat = () => {
  const params = useParams();
  const navigate = useNavigate();
  const scrollref = useRef();

  const roomId = params.roomId;

  const [contents, setContents] = useState(null);
  const [message, setMessage] = useState('');
  const [number, setNumber] = useState(0);

  const myNickname = localStorage.getItem("nickname");
  const token = localStorage.getItem("TOKEN");

  const headers = { Authorization: token };

  let sock = new SockJS("http://43.200.6.110/socket");
  let client = StompJS.over(sock);

  const connect = () => {
    client.connect(headers, () => {
      client.subscribe(`/sub/room/${roomId}`, (data) => {
        const newMessage = JSON.parse(data.body);
        setContents(newMessage);
      });
    });
  };

  const disConnect = () => {
    client.disconnect(() => {
        client.unsubscribe()
    });
    navigate('/home');
  }

  useEffect(() => {
    connect();
  }, [])

  const getRoomData = async () => {
    const res = await instance.get(`/api/message/${roomId}`);
    return res.data;
  };

  const {data, refetch} = useInfiniteQuery(["chatinfo"], getRoomData, {
    refetchOnWindowFocus: false,
  });

  const handleEnter = (nickname, message) => {
    client.send(
      `/pub/message/${roomId}`,
      {},
      JSON.stringify({nickname, message})
    );
    setMessage("");
    setNumber(number+1);
  };

  const scrollToBottom = () => {
    scrollref.current.scrollTop = scrollref.current.scrollHeight;
  }

  useEffect(() => {
    refetch();
    scrollToBottom();
  }, [number, contents]);

  return (
    <MainDiv>
      <HeaderBox>
        <button onClick={() => navigate(-1)}>
          <BsBackspace onClick={() => {disConnect()}} />
        </button>
        <span>채팅방</span>
      </HeaderBox>
      <ChatBox ref={scrollref}>
        {data.pages[0] &&
          data.pages[0].map((d, idx) => (
            <React.Fragment key={idx}>
              {myNickname === d.nickname ? (
                <div className="myMsg">
                  <span className="Name">(me)</span>
                  {d.createdAt.substr(11, 8)}<span className="msg">{d.message}</span>
                </div>
              ) : (
                <div className="anotherMsg">
                  <span className="anotherName">{d.nickname}</span>
                  <span className="msg">{d.message}</span>{d.createdAt.substr(11, 8)}
                </div>
              )}
            </React.Fragment>
          ))}
      </ChatBox>
      <SendBox>
        <input
          type="text"
          value={message}
          autoComplete="off"
          placeholder=" 여기에 메세지를 입력하세요"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={() => handleEnter(myNickname, message)}>
          <AiOutlineSend />
        </button>
      </SendBox>
    </MainDiv>
  );
};

export default Chat;

const MainDiv = styled.div`
  width: 40rem;
  height: calc(100vh - 4px);
  position: relative;
  margin: 0rem auto;
  justify-content: center;
  overflow-y: auto;
  background-color: #ffecd7;
  border: 2px solid #e78111;
`;

const HeaderBox = styled.div`
  height: 15%;
  display: flex;
  font-size: 2rem;
  border-bottom: black;
  border-bottom: 2px solid #e78111;
  color: #e78111;
  button {
    background-color: transparent;
    border: 0;
    font-size: 2rem;
    margin-left: 1rem;
    color: #e78111;
  }
  span {
    margin: 2rem;
    padding-left: 12rem;
  }
`;

const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  max-width: 38rem;
  font-size: 1rem;
  height: 70%;
  overflow-y: auto;
  .myMsg {
    text-align: right;
  }
  .Name {
    display: block;
  }
  .anotherMsg {
    text-align: left;
    margin-bottom: 5px;
  }
  .msg {
    display: inline-block;
    border-radius: 1rem;
    padding: 0.5rem 1rem;
    margin-bottom: 1rem;
    margin-top: 0.3rem;
  }
  .anotherMsg > .msg {
    background-color: white;
    color: #e78111;
  }
  .myMsg > .msg {
    background-color: #e78111;
    color: white;
  }
  .anotherName {
    font-size: 12px;
    display: block;
  }
`;

const SendBox = styled.div`
  height: 15%;
  display: flex;
  width: 40rem;
  left: 0;
  right: 0;
  background-color: #ffecd7;
  border-top: 2px solid #e78111;
  bottom: 0;
  position: absolute;
  input {
    margin: 1rem;
    width: 35rem;
    border-radius: 1rem;
    border: 2px solid #e78111;
    font-size: 2rem;
  }
  button {
    width: 5rem;
    margin: 1.2rem;
    font-size: 3rem;
    background-color: transparent;
    border: 0;
    color: #e78111;
  }
`;
