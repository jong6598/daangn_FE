import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import instance from "../axiosConfig";

const Join = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isValid, errors },
  } = useForm({ mode: "onChange" });

  const onSubmitJoin = async (formData) => {
    const data = {
      username: formData.username,
      nickname: formData.nickname,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };
    console.log(data);
    try {
      const res = await instance.post("/api/signup", data);
      // const res = await instance.post("/user", data);
      console.log(res);
      alert("회원가입 완료! 로그인 페이지로 이동합니다.");
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("회원가입에 문제가 발생했습니다.");
    }
  };

  return (
      <FormContainer id="signup-form" onSubmit={handleSubmit(onSubmitJoin)}>
        <img src="/image/logo.png" alt="logo" />
        <h2>회원가입</h2>
        <InputBox>
          <label>ID</label>
          <input
            type="text"
            placeholder="아이디를 입력해 주세요 (4자 이상)"
            autoComplete="off"
            {...register("username", {
              required: true,
              minLength: 4,
            })}
          />
          {errors.username && errors.username.type === "required" && (
            <Error>* 필수 입력 값입니다.</Error>
          )}
          {errors.username && errors.username.type === "minLength" && (
            <Error>* 아이디는 4자 이상입니다</Error>
          )}
        </InputBox>
        <InputBox>
          <label>NICKNAME</label>
          <input
            type="text"
            placeholder="닉네임을 입력해 주세요 (10자 이하)"
            autoComplete="off"
            {...register("nickname", {
              required: true,
              maxLength: 10,
            })}
          />
          {errors.nickname && errors.nickname.type === "required" && (
            <Error>* 필수 입력 값입니다.</Error>
          )}
          {errors.nickname && errors.nickname.type === "maxLength" && (
            <Error>* 닉네임은 10자 이하입니다</Error>
          )}
        </InputBox>
        <InputBox>
          <label>PASSWORD</label>
          <input
            type="password"
            placeholder="비밀번호를 입력해 주세요 (6자 이상)"
            autoComplete="off"
            {...register("password", {
              required: true,
              minLength: 6,
            })}
          />
          {errors.password && errors.password.type === "required" && (
            <Error>* 필수 입력 값입니다.</Error>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <Error>* 비밀번호는 6자 이상입니다</Error>
          )}
        </InputBox>
        <InputBox>
          <label>PASSWORD CONFIRMATION</label>
          <input
            type="password"
            placeholder="비밀번호를 입력해 주세요 (6자 이상)"
            autoComplete="off"
            {...register("confirmPassword", {
              required: true,
              validate: {
                matchesPreviousPassword: (value) =>
                  getValues("password") === value ||
                  "* 비밀번호가 일치하지 않습니다.",
              },
            })}
          />
          {errors.confirmPassword && (
            <Error>{errors.confirmPassword.message}</Error>
          )}
        </InputBox>
        <BtnContainer>
          <JoinBtn type="submit" form="signup-form" disabled={!isValid}>
            가입하기
          </JoinBtn>
          <CancleBtn onClick={() => navigate("/")}> 취소 </CancleBtn>
        </BtnContainer>
      </FormContainer>
  );
};

export default Join;

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

const Error = styled.p`
  margin-top: 2px;
  font-size: 0.8rem;
  color: #e78111;
`;

const BtnContainer = styled.div`
  display: flex;
`;

const JoinBtn = styled.button`
  cursor: pointer;
  padding: 0.7rem 1rem;
  font-size: 1.3rem;
  color: white;
  background: #e78111;
  outline: 0;
  border: 0;
  border-radius: 0.7rem;
  margin: 0 0.5rem;
  &:disabled {
    background: #e5e5e5;
    cursor: default;
  }
`;

const CancleBtn = styled.div`
  cursor: pointer;
  padding: 0.7rem 1.9rem;
  font-size: 1.3rem;
  color: white;
  background-color: #e78111;
  outline: 0;
  border: 0;
  border-radius: 0.7rem;
  margin: 0 0.5rem;
`;
