import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../axiosConfig";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineHome} from "react-icons/ai";

const PostDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const storuser = JSON.parse(localStorage.getItem("user"));

  const getPost = async () => {
    const res = await instance.get(`/posts/${params.postId}`);
    console.log(res.data);
    return res.data;
  };

  const postInfo = useQuery(["post"], getPost, {
    refetchOnWindowFocus: false,
  }).data;

  console.log(postInfo);

  const contentDeleteBtn = async () => {
    if (storuser !== null) {
      try {
        // await instance.delete(`/api/post/${params.postId}`);
        await instance.delete(`/posts/${params.postId}`);
        return navigate("/home");
      } catch (err) {
        console.log(err);
        alert(err);
      }
    } else {
      alert("err");
      return navigate("/login");
    }
  };

  // const contentUpdateBtn = () =>{
  //   if (storuser !== null ) {
  //       // await instance.put(`api/post/${params.postId}`)
  //       // try{await instance.put(`api/post/${params.postId}`)
  //       return  navigate(`/postedit`)
  //   } else {
  //   alert("로그인을 해주세요");
  //   return navigate("/login");
  //   }
  // };

  return (
    <MainDiv>
      
      <HomeBtn onClick={() => navigate("/home")}>
        <AiOutlineHome />
      </HomeBtn>
      
      <Ubtn onClick={() => navigate("/postedit")}>수정</Ubtn>
      <Dbtn onClick={contentDeleteBtn}>삭제</Dbtn>
      <img src={postInfo.imageUrl} alt="" />
      <Userbox>
        {/* ,작성자 이름, district */}
        {/* <img src="/image/logo.png" alt="logo" /> */}
        <span>작성자:{postInfo.nickname}</span>
        <span>위치:{postInfo.Area}</span>
      </Userbox>
      <Postbox>
        <span>{postInfo.title}</span>
        <span>{postInfo.category}</span>
        <span>{postInfo.after}</span>
        <span>{postInfo.price}</span>
        <span>{postInfo.content}</span>
      </Postbox>
      <button>하트</button>
      푸터 넣기!!!
    </MainDiv>
  );
};

export default PostDetail;

const MainDiv = styled.div`
  width: 40rem;
  height: 100vh;
  margin: 0 auto;
  justify-content: center;
  background-color: violet;

  img {
    display: block;
    margin: 1.3rem auto 0;
    width: 100%;
    max-width: 30rem;
  }
`;

const HomeBtn = styled.button`
    font-size: 3rem;
    margin-left: -9rem;
    margin-top: 1rem;
    background-color: transparent;
    border:0;
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
  margin-top: 1rem ;
  margin-left: 2rem;
`;

const Userbox = styled.div`
  background-color: purple;
  height: 13%;
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
  background-color: purple;
  display: flex;
  flex-direction: column;
  margin: 1.3rem auto 0;
  max-width: 30rem;
  text-align: center;
`;
