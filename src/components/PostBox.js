import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";

const PostBox = ({ posts }) => {
  const navigate = useNavigate();
  return (
    <>
      {posts.map((data) => {
        return (
          <PostContainer
            key={data.id}
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              navigate(`/post/${data.id}`);
            }}
          >
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
                  <AiOutlineHeart />
                  <p>{data.likeCount}</p>
                </>
              ) : null}
            </LikeCountBox>
          </PostContainer>
        );
      })}
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
  height: 8rem;
  img {
    border-radius: 5px;
    max-height: 8rem;
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
