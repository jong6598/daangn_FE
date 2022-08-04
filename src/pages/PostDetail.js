import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import instance from "../axiosConfig";
import styled from "styled-components";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AiOutlineHome } from "react-icons/ai";
import Footer from "../components/Footer";
import { FaCarrot } from "react-icons/fa";
import { BiChat } from "react-icons/bi";
import { Link } from "react-router-dom";

const PostDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const postArea = useSelector((state) => state.area);
  const postCategory = useSelector((state) => state.category);
  const storetoken = localStorage.getItem("TOKEN");
  const nickname = localStorage.getItem("nickname");
  const [liked, setLiked] = useState();
  const queryClient = useQueryClient();

  const postId = { postId: params.postId };

  const getPost = async () => {
    const res = await instance.get(`/api/post/${params.postId}`);
    console.log(res.data);
    return res.data;
  };

  const postInfo = useQuery(["post"], getPost, {
    refetchOnWindowFocus: false,
  }).data.post;

  console.log(postInfo);

  const toggleLike = async () => {
    if (postInfo.isLiked === false) {
      try {
        await instance.post(`/api/like/${params.postId}`);
        console.log(postInfo.isLiked);
        setLiked(true);
      } catch (err) {
        console.log(err);
      }
    } else if (postInfo.isLiked === true) {
      try {
        await instance.delete(`/api/like/${params.postId}`);
        console.log(postInfo.isLiked);
        setLiked(false);
      } catch (err) {
        console.log(err);
        alert(err);
      }
    }
  };

  const contentDeleteBtn = async () => {
    const result = window.confirm("게시글을 삭제하시겠습니까?");
    if (result) {
      if (storetoken !== null) {
        try {
          await instance.delete(`/api/post/${params.postId}`);
          return navigate("/home");
        } catch (err) {
          console.log(err);
          alert(err);
        }
      } else {
        alert("err");
        return navigate("/login");
      }
    }
  };

  const chatStart = async () => {
    try {
      const res = await instance.post("/api/room", postId);
      const roomId = res.data.roomId;
      alert("새로 만든 채팅방으로 이동합니다.");
      return navigate(`/chat/${roomId}`);
    } catch (err) {
      if (err.response.data.message === "방이 이미 존재합니다") {
        const roomId = err.response.data.roomId;
        alert("기존에 있던 채팅방으로 이동합니다.");
        return navigate(`/chat/${roomId}`);
      }
    }
  };

  useEffect(() => {
    queryClient.invalidateQueries("post");
  }, [postInfo, liked]);

  return (
    <MainDiv>
      <HeaderBox>
        <HomeBtn onClick={() => navigate("/home")}>
          <AiOutlineHome />
        </HomeBtn>
        {postInfo.nickname !== nickname ? (
        <>
          <ChatBtn
            onClick={() => {
              chatStart();
            }}
          >
            <BiChat />
            <p>작성자와 대화하기</p>
          </ChatBtn>
        </>
      ) : null}
      </HeaderBox>
      <InfoBox>
        {postInfo.nickname === nickname ? (
          <Btnbox>
            <Ubtn onClick={() => navigate(`/post/${params.postId}/edit`)}>
              수정
            </Ubtn>
            <Dbtn onClick={contentDeleteBtn}>삭제</Dbtn>
          </Btnbox>
        ) : null}
        <img src={postInfo.imageUrl} alt="" />
        <ProfileBox>
          <FaCarrot />
          <NicknameBox>
            <span>작성자:{postInfo.nickname}</span>
            <span>위치:{postArea[postInfo.area]}</span>
          </NicknameBox>
          <HeartBtn onClick={toggleLike}>
            {" "}
            {postInfo.isLiked === true ? (
              <img src="/image/heart.png" alt="heartlogo" />
            ) : (
              <img src="/image/emptyheart.png" alt="emptyheartlogo" />
            )}{" "}
          </HeartBtn>
        </ProfileBox>
        <Postbox>
          <span>{postInfo.title}</span>
          <Category>
            <span>카테고리: {postCategory[postInfo.category]} /</span>
            <span>작성시간: {postInfo.after}</span>
          </Category>
          <span>가격: {postInfo.price}</span>
          <span>내용: {postInfo.content}</span>
        </Postbox>
      </InfoBox>
      <Footer />
    </MainDiv>
  );
};

export default PostDetail;

const MainDiv = styled.div`
  position: relative;
  width: 40rem;
  height: calc(100vh - 13rem);
  margin: 0 auto 7rem;
  justify-content: center;
  background: #fffbf7;
  /* background: #333; */
  img {
    display: block;
    margin: 0rem auto 0;
    width: 100%;
    max-width: 25rem;
  }
`;

const HeaderBox = styled.div`
  width: 40rem;
  height: 6rem;
  display: flex;
  position: fixed;
  background: #ffecd7;
  justify-content: space-between;
`;

const InfoBox = styled.div`
  overflow-y: auto;
  padding-bottom: 8rem;
  padding-top: 6.5rem;

`;

const HomeBtn = styled.button`
  font-size: 3rem;
  margin-left: 2rem;
  display: flex;
  text-align: left;
  margin-top: 1.3rem;
  background-color: transparent;
  border: 0;
  color: #e78111;
`;

const Btnbox = styled.div`
  background: #fffbf7;
  display: flex;
  padding-left: 27rem;
  flex-direction: row;
`;

const Ubtn = styled.button`
  display: flex;
  text-align: right;
  font-size: 1.8rem;
  background-color: #e78111;
  border-radius: 0.5rem;
  border-color: #e78111;
  border-width: 0.2rem;
  color: white;
`;
const Dbtn = styled.button`
  display: flex;
  text-align: right;
  font-size: 1.8rem;
  margin-left: 1rem;
  background-color: #e78111;
  border-radius: 0.5rem;
  border-color: #e78111;
  border-width: 0.2rem;
  color: white;
`;

const ProfileBox = styled.div`
  width: calc(100% - 6rem);
  margin: 2rem auto 0;
  cursor: pointer;
  height: 7rem;
  display: flex;
  flex-direction: row;
  text-align: left;
  svg {
    width: 5rem;
    height: 5rem;
    color: #e78111;
    padding: 0.3rem;
    margin: 0 1rem;
    border-radius: 5rem;
    border: 2px solid #e78111;
  }
`;

const NicknameBox = styled.div`
  display: flex;
  text-align: left;
  flex-direction: column;
  padding: 1rem 1rem;
  margin-right: 1rem;
  span {
    margin: 0.2rem;
    font-size: 1.2rem;
    font-weight: 500;
  }
`;

const Postbox = styled.div`
  background: #ffecd7;
  display: flex;
  flex-direction: column;
  margin: 1.3rem auto 0;
  max-width: 30rem;
  text-align: left;
  span {
    margin: 0.7rem;
    font-size: 1.2rem;
    font-weight: 350;
  }
`;

const HeartBtn = styled.button`
  max-width: 3rem;
  margin-left: 8rem;
  border: 0;
  background-color: transparent;
  max-height: 6rem;
`;

const Category = styled.div`
  display: flex;
  flex-direction: row;
  span {
    margin: 0.3rem;
    font-size: 1rem;
    color: gray;
    font-weight: 500;
    padding-left: 0.5rem;
  }
`;
const ChatBtn = styled.div`
  cursor: pointer;
  border-radius: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 2rem;
  svg {
    width: 3rem;
    height: 3rem;
    border-radius: 5rem;
    font-size: 4rem;
    color: #e78111;
  }
  p {
    color: #e78111;
  }
`;

const TestDiv = styled.div`
  width: 10rem;
  height: 3rem;
  background: #333;
  color: white;
`;
