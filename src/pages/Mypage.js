import React from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { FaCarrot } from "react-icons/fa";
import { IoIosPaper } from "react-icons/io";
import { AiFillHeart } from "react-icons/ai";

import Footer from "../components/Footer";
import PostBox from "../components/PostBox";

import instance from "../axiosConfig";

const Mypage = () => {
  //FIXME: 로그인한 계정의 포스트 들고오는 로직으로 바꾸기
  const getPosts = async () => {
    const res = await instance.get("/posts");
    return res.data;
  };

  const posts = useQuery(["my_post_list"], getPosts, {
    refetchOnWindowFocus: false,
  }).data;

  return (
    <MainDiv>
      <HeadBox>
        <p>나의 당근</p>
      </HeadBox>
      <ProfileBox>
        <FaCarrot />
        <NicknameBox>
          <p>닉네임</p>
        </NicknameBox>
      </ProfileBox>
      <SellAndLikeList>
        <div>
          <IoIosPaper />
          <p>판매내역</p>
        </div>
        <div>
          <AiFillHeart />
          <p>관심목록</p>
        </div>
      </SellAndLikeList>
      <PostBox  posts={posts}/>
      <Footer theme={"mypage"} />
    </MainDiv>
  );
};

export default Mypage;

const MainDiv = styled.div`
  width: 40rem;
  background: #fffbf7;
  height: calc(100vh - 7rem);
  margin: 0rem auto 7rem;
  justify-content: center;
`;

const HeadBox = styled.div`
  text-align: left;
  padding: 1rem;
  background: #ffecd7;
  border-bottom: 1px solid #f1f1f1;
  p {
    font-size: 1rem;
    font-weight: 700;
    margin: 0;
  }
`;

const ProfileBox = styled.div`
  width: calc(100% - 6rem);
  margin: 2rem auto 0;
  height: 7rem;
  display: flex;
  flex-direction: row;
  align-items: center;
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
  flex: 1;
  text-align: left;
  padding: 0 1rem;
  margin-right: 1rem;
  p {
    margin: 0;
    font-size: 1.3rem;
    font-weight: 600;
  }
`;

const SellAndLikeList = styled.div`
  display: flex;
  height: 8rem;
  align-items: center;
  margin-top: 0.7rem;
  padding-bottom: 1rem;
  gap: 12rem;
  justify-content: center;
  border-bottom: 0.3rem solid #ffecd7;
  div {
    cursor: pointer;
  }
  p {
    margin: 0;
  }
  svg {
    color: #e78111;
    width: 2rem;
    height: 2rem;
    padding: 1rem;
    border-radius: 4rem;
    background: #ffecd7;
  }
`;
