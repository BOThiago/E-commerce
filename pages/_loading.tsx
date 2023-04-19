"use client";

import { PuffLoader } from "react-spinners";
import styled from "styled-components";
const MainContainer = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Loading = () => {
  return (
    <MainContainer>
      <PuffLoader size={100} color="purple" />
    </MainContainer>
  );
};

export default Loading;
