import { useQuery } from "@tanstack/react-query";
import { getAllByText } from "@testing-library/react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import instance from "../axiosConfig";
import styled from "styled-components";

// import * as StompJS from "@stomp/stompjs";
import * as StompJS from "stompjs";
import * as SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

const ChatRoom = () => {
  const params = useParams();
  const postId = { postId: params.postId };
  const token = localStorage.getItem("TOKEN");

  const createRoom = async () => {
    try {
      const res = await instance.post("/api/room", postId);
      return res;
    } catch (err) {
      console.log("에러", err);
      if (err.response.data.message === "이미 방이 존재합니다") {
        const res = await instance.get(`/api/room/${params.postId}`);
        return res;
      }
    }
  };

  const chatData = useQuery(["chatdata"], createRoom, {
    refetchOnWindowFocus: false,
  });

  let sock = new SockJS("http://43.200.6.110/socket");
  let client = StompJS.over(sock);

//   const client = new StompJS.Client({
  //     brokerURL: "ws://43.200.6.110/socket",
  //     connectHeaders: {
  //       Authorization: token,
  //     },
  //     debug: (str) => {
  //       console.log(str);
  //     },
  //   });

  //   client.onConnect = (frame) => {
  //     console.log(frame);
  //   };

  //   client.onStompError = (frame) => {
  //     console.log("Broker reported error: " + frame.headers["message"]);
  //     console.log("Additional details: " + frame.body);
  //   };

  //   const onClickConnect = () => {
  //     client.activate();
  //   }

  //   const onClickDisConnect = () => {
  //     client.deactivate();
  //   }

  return (
    <MainDiv>
      <div
        style={{
          cursor: "pointer",
          background: "#333",
          padding: "3rem",
          border: "1px solid #333",
        }}
        // onClick={() => {
        //   onClickConnect();
        // }}
      >
        소켓 연결하기
      </div>
      <div
        style={{
          cursor: "pointer",
          background: "#f1f1f1",
          padding: "3rem",
          border: "1px solid #333",
        }}
        // onClick={() => {
        //   onClickDisConnect();
        // }}
      >
        소켓 연결끊기
      </div>
    </MainDiv>
  );
};

export default ChatRoom;

const MainDiv = styled.div`
  width: 40rem;
  height: calc(100vh - 7rem);
  margin: 0rem auto 7rem;
  justify-content: center;
  overflow-y: auto;
`;
