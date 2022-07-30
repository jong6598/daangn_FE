import React from "react";
import ClockLoader from "react-spinners/ClockLoader";
import styled from "styled-components";

const Spinner = () => {
  return (
    <>
      <LoadingSpinners>
        <ClockLoader color="#e78111"/>
      </LoadingSpinners>
    </>
  );
};

export default Spinner;


const LoadingSpinners = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;