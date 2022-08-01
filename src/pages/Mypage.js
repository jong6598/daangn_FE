import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaCarrot } from "react-icons/fa";
import { IoIosPaper } from "react-icons/io";
import { AiFillHeart } from "react-icons/ai";

import Footer from "../components/Footer";
import PostBox from "../components/PostBox";

import instance from "../axiosConfig";
import { useNavigate } from "react-router-dom";

const Mypage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState('sale');
  const nickname = localStorage.getItem('nickname');

  const getPosts = async () => {
    const res = await instance.get(`/api/mypost?filter=${filter}&page=0&size=4`);
    console.log(res);
    return res.data;
  };
  console.log(`/api/mypost?filter=${filter}&page=0&size=4`);

  const posts = useQuery(["my_post_list"], getPosts, {
    refetchOnWindowFocus: false,
  }).data.list.content;
  
  useEffect(() => {
    queryClient.invalidateQueries('my_post_list');
  }, [filter])

  const handleLogout = async () => {
    await instance.post("/api/logout");
    localStorage.clear();
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  const onClickFilter = (filter) => {
    setFilter(filter);
  }

  return (
    <MainDiv>
      <HeadBox>
        <p>나의 당근</p>
        <button onClick={handleLogout}>로그아웃</button>
      </HeadBox>
      <ProfileBox>
        <FaCarrot />
        <NicknameBox>
          <p>{nickname}</p>
        </NicknameBox>
      </ProfileBox>
      <SellAndLikeList>
        <div onClick={() => {
          onClickFilter('sale');
        }}>
          <IoIosPaper />
          <p>판매내역</p>
        </div>
        <div onClick={() => {
          onClickFilter('interest');
        }}>
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
  display: flex;
  align-items:center;
  justify-content: space-between;
  border-bottom: 1px solid #f1f1f1;
  p {
    font-size: 1rem;
    font-weight: 700;
    margin: 0;
  }
  button {
    margin-right: 0.5rem;
    border: none;
    padding: 0.5rem;
    background: #fffbf7;
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
