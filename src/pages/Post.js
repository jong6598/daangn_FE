import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { HiOutlinePhotograph } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import instance from "../axiosConfig";
import { AiOutlineHome } from "react-icons/ai";

const Post = () => {
  const nickname = localStorage.getItem("nickname");
  const postId = useParams()?.postId;
  const navigate = useNavigate();
  const params = useParams();
  const [imgSrc, setImgSrc] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm({
    mode: "all",
  });

  useEffect(() => {
    if (postId) {
      const setPost = async () => {
        const postInfo = await instance.get(`/posts/${params.postId}`);

        if (postInfo.nickname !== nickname) {
          alert("수정 권한이 없습니다.");
          navigate(-1);
          return;
        }

        const data = postInfo;
        setValue("title", data.title);
        setValue("price", data.price);
        setValue("area", data.area);
        setValue("state", data.state);
        setValue("after", data.after);
        setValue("likeCount", data.likeCount);
        setImgSrc(data.imageUrl);
      };
      setPost();
    }
  }, []);

  const previewImage = async (e) => {
    const image = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);

    return new Promise((resolve) => {
      reader.onload = () => {
        setImgSrc(reader.result);
        resolve();
      };
    });
  };

  const onSubmitPost = async (formData) => {
    let imageUrl;

    if (formData.postImg.length > 0) {
      const uplodede_file = await uploadBytes(
        ref(storage, `images/${formData.postImg[0].name}`),
        formData.postImg[0],
      );
      imageUrl = await getDownloadURL(uplodede_file.ref);
    } else if (postId) {
      imageUrl = imgSrc;
    } else {
      imageUrl = "";
    }

    const newPost = {
      title: formData.title,
      category: formData.category,
      price: formData.price,
      area: formData.area,
      content: formData.content,
      imageUrl,
    };
    console.log("새 게시글", newPost);

    if (!postId) {
      try {
        const post = instance.post("/api/post", newPost);
        console.log(post);
        alert("게시글이 등록되었습니다!");
        navigate("/home");
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const update = await instance.put(`/api/post/${postId}`, newPost);
        console.log(update);
        alert("게시글이 수정되었습니다!");
        navigate(`/post/${postId}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <MainDiv>
      <HomeBtn onClick={() => navigate("/home")}>
        <AiOutlineHome />
      </HomeBtn>
      <PostForm onSubmit={handleSubmit(onSubmitPost)}>
        <h2>게시글 {postId ? "수정" : "작성"}</h2>

        <Col>
          <label>글 제목</label>
          <input
            type="text"
            placeholder="글 제목을 입력해주세요"
            autoComplete="off"
            {...register("title", {
              required: true,
            })}
          />
        </Col>

        <Col>
          <label>사진 등록하기</label>
          <input
            type="file"
            accept="image/*"
            {...register("postImg", {
              required: true,
              onChange: (e) => previewImage(e),
            })}
          />
        </Col>
        <ImageLabel>
          {imgSrc ? <img src={imgSrc} alt="" /> : <HiOutlinePhotograph />}
        </ImageLabel>

        <Col>
          <label htmlFor="area">지역</label>
          <select
            name="area"
            id="area"
            {...register("area", {
              required: true,
            })}
          >
            <option value="NAMGU">남구</option>
            <option value="DALSEOGU">달서구</option>
            <option value="DALSEONGGUN">달성군</option>
            <option value="DONGGU">동구</option>
            <option value="BUKGU">북구</option>
            <option value="SEOGU">서구</option>
            <option value="SUSEONGGU">수성구</option>
            <option value="JUNGGU">중구</option>
          </select>
        </Col>

        <Col>
          <label htmlFor="category">카테고리</label>
          <select
            name="category"
            id="category"
            {...register("category", {
              required: true,
            })}
          >
            <option value="DIGITAL">디지털기기</option>
            <option value="APPLIANCES">생활가전</option>
            <option value="HOUSEHOLD">가구/인테리어</option>
            <option value="KID">유아</option>
            <option value="GROCERIES">생활/가공식품</option>
            <option value="SPORT">스포츠/레저</option>
            <option value="CLOTHES">의류</option>
            <option value="INTEREST">게임/취미</option>
            <option value="BEAUTY">뷰티/미용</option>
            <option value="PET">반려동물용품</option>
            <option value="BOOK">도서/티켓/음반</option>
            <option value="PLANT">식물</option>
            <option value="ETC">기타</option>
          </select>
        </Col>
        <Col>
          <label>가격</label>
          <input
            type="text"
            oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
            placeholder="가격을 입력해 주세요."
            {...register("price", {
              required: true,
            })}
          />
        </Col>
        <Col>
          <label>
            <h3>내용</h3>
          </label>
          <ContentArea
            placeholder="내용을 입력해 주세요"
            spellCheck="false"
            wrap="hard"
            {...register("content", {
              required: true,
            })}
          />
          <button type="submit" disabled={!isValid}>
            게시글 {postId ? "수정" : "등록"} 완료
          </button>
        </Col>
      </PostForm>
    </MainDiv>
  );
};

export default Post;

const MainDiv = styled.div`
  width: 40rem;
  margin: 0 auto;
  justify-content: center;
  background-color: #ffecd7;
  flex-direction: column;
`;

const HomeBtn = styled.button`
  font-size: 1.9rem;
  margin-left: -30rem;
  margin-top: 1rem;
  background-color: transparent;
  border: 0;
`;

const PostForm = styled.form`
  h2 {
    display: inline-block;
    border-bottom: 0.3rem solid #e78111;
    margin: 1rem auto 1rem;
  }
  input {
    width: 6rem;
  }
  button {
    margin: 4rem 0 1.2rem;
    width: 80%;
    font-size: 1.5rem;
    background-color: #e78111;
    color: white;
    border-radius: 0.5rem;
    border: 0;
  }
`;

const Col = styled.div`
  width: 40rem;
  height: 10vh;
  margin: 0 auto;
  justify-content: center;
  background-color: #e78111;
  margin-bottom: 3rem;
`;

const ImageLabel = styled.label`
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 3/2;
  border-radius: 1rem;
  background: #e78111;
  max-width: 25rem;
  margin: 1.3rem auto 1.3rem;

  cursor: pointer;
  svg {
    margin: 1rem 3rem;
    font-size: 5rem;
  }
  img {
    width: 80%;
    height: 80%;
    object-fit: contain;
  }
`;
const ContentArea = styled.textarea`
  height: 8rem;
  resize: none;
`;
