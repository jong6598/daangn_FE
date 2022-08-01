import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import instance from "../axiosConfig";

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await instance.post("/api/logout");
    localStorage.clear();
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  return (
    <HeaderComponent>
      <Areabar>
        <select>
          <option value="ALL">대구시 전체</option>
          <option value="NAMGU">남구</option>
          <option value="DALSEOGU">달서구</option>
          <option value="DALSEONGGUN">달성군</option>
          <option value="DONGGU">동구</option>
          <option value="BUKGU">북구</option>
          <option value="SEOGU">서구</option>
          <option value="SUSEONGGU">수성구</option>
          <option value="JUNGGU">중구</option>
        </select>
      </Areabar>
      <Navbar>
        <select>
          <option value="ALL">전체 카테고리</option>
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
        <input></input>
        <button onClick={handleLogout}>로그아웃</button>
      </Navbar>
    </HeaderComponent>
  );
};

export default Header;

const HeaderComponent = styled.header`
  position: fixed;
  width: 35rem;
  height: 7rem;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2.5rem;
  background: #ffecd7;
  img {
    width: 3rem;
    height: 3rem;
  }
  select {
    cursor: pointer;
    border-radius: 5px;
    background: #fffbf7;
    width: 10rem;
    border: none;
    padding: 1rem;
    &:hover {
    background: #f6f6f6;
  }
  }
`;

const Areabar = styled.div`
  display: flex;
  gap: 1rem;
`;

const Navbar = styled.div`
  display: flex;
  gap: 1rem;
  button {
    background: #fffbf7;
    border: none;
    padding: 1rem;
    border-radius: 5px;
    &:hover {
      background: #f6f6f6;
    }
  }
`;

const InputBox = styled.div`
  align-items: center;
  justify-items: center;
`;
