import React from 'react'
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { FiHome } from 'react-icons/fi'
import { HiOutlinePhotograph } from 'react-icons/hi'
import { useForm } from "react-hook-form";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import {storage} from "../firebase"


const Post = () => {
  const nickname = localStorage.getItem("user").nickname;
  const postId = useParams()?.postId;
  const navigate = useNavigate();

  const file_link_ref = React.useRef(null);

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    formState: { isValid },
  } = useForm({
    mode: 'all',
  });

  const previewImage = async(e) => {
    console.log(e.target.files);
    const uplodede_file = await uploadBytes(ref(storage, `images/${e.target.files[0].name}`),
    e.target.files[0]
    )
    const file_url= await getDownloadURL(uplodede_file.ref);

    file_link_ref.current = {url:file_url}

  }


  return (
    <MainDiv>
      <button onClick={() => navigate("/home")}> x </button>
      <span> 글 등록하기 </span>
      <button type="submit" disabled={!isValid} >
      {/* 게시글 {postId ? '수정' : '등록'} 완료  */}
      </button>
      <p/>

      <Row>
        <label> 
          글 제목
        </label>
        <input
          type="text"
          placeholder='글 제목을 입력해주세요'
          autoComplete='off'
          {...register('title',{
            required: true,
          })}
        />  
      </Row>


      <Row> 
        <label> 
          사진 등록하기
        </label>
        <input 
          type="file"
          accept="image/*"
          
          {...register('postImg',{
            required: true,
            onChange: (e) =>previewImage(e),
          })}
        />
      </Row>
      <ImageLabel>
        null </ImageLabel>
       

      사진등록 버튼<p/>
      등록한 사진 미리보기 <p/>
      글제목 <p/>
      카테고리 선택 <p/>
      가격 <p/>
      지역선택 <p/>
      내용 
     

    </MainDiv>
  )
}

export default Post;


const MainDiv = styled.div`
  width: 40rem;
  height: 100vh;
  margin: 0 auto;
  justify-content: center;
  background-color: violet;
  flex-direction:column;
  `

const Row = styled.div`
width: 40rem;
height: 10vh;
margin: 0 auto;
justify-content: center;
background-color: purple;
margin-bottom: 3rem;
`

const ImageLabel = styled.label`
`