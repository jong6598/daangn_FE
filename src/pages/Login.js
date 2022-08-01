import React from 'react'
import { useNavigate } from 'react-router-dom';
import instance from '../axiosConfig';
import { useForm } from "react-hook-form";
import styled from 'styled-components';

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({ mode: "onChange" });


  const onSubmitLogin = async(formData) => {
    const data= {
      username: formData.username,  
      password: formData.password, 
    };
    
    try{
      const res = await instance.post("/api/login", data, {
        withCredentials: true,
      });
      console.log(res);
      localStorage.setItem("TOKEN", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("nickname", res.data.nickname);
      alert('로그인 성공');
      navigate('/home');
    } catch(err){
      console.log(err);
      alert('아이디와 비밀번호를 다시 확인해주세요');
    };
  };


  return (
    <FormContainer id="login-form" onSubmit={handleSubmit(onSubmitLogin)}>
      <img src="/image/logo.png" alt="logo" />
      <h2>로그인</h2>
      <InputBox>
        <label>ID</label>
        <input
          type="text"
          placeholder="아이디를 입력해 주세요"
          autoComplete="off"
          {...register("username", {
            required: true,
            minLength: 4,
          })}
        />
        </InputBox>
        <InputBox>
        <label>PASSWORD</label>
        <input
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          autoComplete="off"
          {...register("password", {
            required: true,
            // minLength: 6,
          })}
        />
        </InputBox>
        <BtnContainer>
        <LoginBtn type="submit" form="login-form" disabled={!isValid}>
          로그인하기
        </LoginBtn>
        <JoinBtn onClick={() => navigate("/")}>취소</JoinBtn>
        </BtnContainer>
      </FormContainer>
  )
}

export default Login

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  max-width: 25rem;
  margin: 8vh auto 0;
  padding: 3rem;
  border: 0.2rem solid #e78111;
  border-radius: 2rem;
  box-shadow: 0rem 0.4rem 0.5rem 0rem #0000001a;
  img {
    width: 7rem;
    height: 7rem;
  }
  label {
    font-weight: 700;
  }
  input {
    width: 100%;
    border-radius: 0.3rem;
    transition: background 0.2s ease-in-out;
    font-size: 0.9rem;
    &:hover,
    &:focus {
      background: #f1f1f1;
    }
  }
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 15rem;
  height: 4rem;
  align-items: flex-start;
  margin-right: 3rem;
  input {
    padding: 0.5rem 1.5rem;
  }
`;

const LoginBtn = styled.button`
  cursor: pointer;
  padding: 0.7rem 1rem;
  font-size: 1.3rem;
  color: white;
  background-color: #e78111;
  outline: 0;
  border: 0;
  border-radius: 0.7rem;
  margin: 0 0.5rem ;
  &:disabled {
    background: #e5e5e5;
    cursor: default;
  }
`;

const JoinBtn = styled.button`
  cursor: pointer;
  padding: 0.7rem 1.5rem;
  font-size: 1.3rem;
  color: white;
  background-color: #e78111;
  outline: 0;
  border: 0;
  border-radius: 0.7rem;
  margin: 0 0.5rem ;
`;

const BtnContainer = styled.div`
  display: flex;
`
