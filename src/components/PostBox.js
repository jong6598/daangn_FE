import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { AiOutlineHeart } from "react-icons/ai";

const PostBox = ({ data }) => {
  const postArea = useSelector((state) => state.area);
  return (
    <>
      <PostInfoBox>
        <ImageBox>
          <img src={data.imageUrl} alt="postimage" />
        </ImageBox>
        <PostInfo>
          <h2>{data.title}</h2>
          <h3>
            {postArea[data.area]} · {data.after}
          </h3>
          <h1>{data.price}원</h1>
        </PostInfo>
      </PostInfoBox>
      <LikeCountBox>
        {data.likeCount > 0 ? (
          <>
            <AiOutlineHeart />
            <p>{data.likeCount}</p>
          </>
        ) : null}
      </LikeCountBox>
    </>
  );
};

export default PostBox;

const PostContainer = styled.div`
  margin: 0 auto;
  width: calc(100% - 6rem);
  height: 12rem;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f1f1f1;
`;

const PostInfoBox = styled.div`
  display: flex;
`;

const ImageBox = styled.div`
  width: 10rem;
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

const PostInfo = styled.div`
  height: 8rem;
  text-align: left;
  margin-left: 1rem;
  h2 {
    margin: 0px;
    font-size: 16px;
  }
  h3 {
    margin: 0.3rem 0;
    font-size: 13px;
    color: #a1a1a1;
  }
  h1 {
    margin: 0px;
    font-size: 18px;
  }
`;

const LikeCountBox = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-top: 7.5rem;
  p {
    margin: 0 0.2rem 0.2rem;
  }
  svg {
    width: 1.1rem;
    height: 1.1rem;
  }
`;
