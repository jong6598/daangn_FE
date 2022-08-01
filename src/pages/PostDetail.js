import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../axiosConfig";
import styled from "styled-components";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AiOutlineHome } from "react-icons/ai";
import Footer from "../components/Footer";

const PostDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const storetoken = localStorage.getItem("TOKEN");
  const nickname = localStorage.getItem("nickname");
  const [liked, setLiked] = useState();
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries("post");
  }, [liked])

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
    if (postInfo.isLiked===false) {
      try{
        await instance.post(`/api/like/${params.postId}`)
        console.log(postInfo.isLiked) 
        setLiked(true)
      } catch(err){
        console.log(err);
      }
    } else if 
    (postInfo.isLiked===true){
      try {
        await instance.delete(`/api/like/${params.postId}`)
        console.log(postInfo.isLiked)
        setLiked(false)
      } catch(err){
        console.log(err);
        alert(err);
      }
    }
  }


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

  return (
    <MainDiv>
      <HomeBtn onClick={() => navigate("/home")}>
        <AiOutlineHome />
      </HomeBtn>
      {postInfo.nickname === nickname ? (
        <>
          <Ubtn onClick={() => navigate("/post")}>수정</Ubtn>
          <Dbtn onClick={contentDeleteBtn}>삭제</Dbtn>
        </>
      ) : null}
      <img src={postInfo.imageUrl} alt="" />
      <Userbox>
        <span>작성자:{postInfo.nickname}</span>
        <span>위치:{postInfo.area}</span>
      </Userbox>
      <Postbox>
        <span>{postInfo.title}</span>
        <span>{postInfo.category}</span>
        <span>{postInfo.after}</span>
        <span>{postInfo.price}</span>
        <span>{postInfo.content}</span>
      </Postbox>
      <HeartBtn onClick={toggleLike}> {postInfo.isLiked===true?(<img src="/image/heart.png" alt="heartlogo"/>):(<img src="/image/emptyheart.png" alt="emptyheartlogo"/>)} </HeartBtn>
      <Footer />
    </MainDiv>
  );
};

export default PostDetail;

const MainDiv = styled.div`
  width: 40rem;
  height: 100vh;
  margin: 0 auto;
  justify-content: center;
  background: #fffbf7;

  img {
    display: block;
    margin: 1.3rem auto 0;
    width: 100%;
    max-width: 25rem;
  }
`;

const HomeBtn = styled.button`
  font-size: 3rem;
  margin-left: -25rem;
  margin-top: 1rem;
  background-color: transparent;
  border: 0;
`;

const Ubtn = styled.button`
  display: flex;
  float: right;
  margin: 1rem 5rem 1rem 2rem;
  font-size: 2rem;
`;
const Dbtn = styled.button`
  display: flex;
  float: right;
  font-size: 2rem;
  margin-top: 1rem;
  margin-left: 2rem;
`;

const Userbox = styled.div`
  background: #ffecd7;
  height: 10%;
  display: flex;
  flex-direction: column;
  margin: 1.3rem auto 0;
  max-width: 30rem;
  text-align: center;

  img {
    width: 4rem;
    height: 4rem;
  }
`;
const Postbox = styled.div`
  background: #ffecd7;
  display: flex;
  flex-direction: column;
  margin: 1.3rem auto 0;
  max-width: 30rem;
  text-align: center;
`;

const HeartBtn = styled.button`
  max-width:3rem;
  border: 0;
  background-color: transparent;
  max-height: 6rem;
`
