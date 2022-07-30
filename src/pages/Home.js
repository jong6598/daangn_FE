import React from "react";
import styled from "styled-components";
import instance from "../axiosConfig";
import { useQuery } from "@tanstack/react-query";

import Header from "../components/Header";
import Footer from "../components/Footer";
import PostBox from "../components/PostBox";

const Home = () => {
  const getPosts = async () => {
    const res = await instance.get("/posts");
    return res.data;
  };

  const posts = useQuery(["post_list"], getPosts, {
    refetchOnWindowFocus: false,
  }).data;

  // console.log(posts);

  return (
    <>
      <MainDiv>
        <Header />
        <PostBox posts={posts}/>
        {/* <PostBox>
          {posts.map((data) => {
            return (
              <>
                <PostInfoBox>
                  <ImageBox>
                    <img src={data.imageUrl} alt="postimage" />
                  </ImageBox>
                  <PostInfo>
                    <h2>{data.title}</h2>
                    <h3>
                      {data.Area} · {data.after}일 전
                    </h3>
                    <h1>{data.price}원</h1>
                  </PostInfo>
                </PostInfoBox>
                <LikeCountBox>
                  {data.likeCount > 0 ? (
                    <>
                      <FaRegHeart />
                      <p>{data.likeCount}</p>
                    </>
                  ) : null}
                </LikeCountBox>
              </>
            );
          })}
        </PostBox> */}
        <Footer />
      </MainDiv>
    </>
  );
};

export default Home;

const MainDiv = styled.div`
  width: 40rem;
  background: #fffbf7;
  height: calc(100vh - 14rem);
  margin: 7rem auto;
  justify-content: center;
`;