import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import { BiUser } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";

const StyledHeader = styled.header`
  background-color: #222;
`;
const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
`;
const StyledCenterDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 10%;
`;
const StyledDiv = styled.div`
  display: flex;
  justify-content: space-around;
  width: 10%;
`;
const Header = () => {
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <StyledLink href={"/"}>Logo</StyledLink>
          <StyledCenterDiv>
            <StyledLink href={"/"}>Home</StyledLink>
            <StyledLink href={"/b"}>Categorias</StyledLink>
            <StyledLink href={"/c"}></StyledLink>
          </StyledCenterDiv>
          <StyledDiv>
            <StyledLink href={"/"}>
              <AiOutlineShoppingCart size={30} />
            </StyledLink>
            <StyledLink href={"/login"}>
              <BiUser size={30} />
            </StyledLink>
          </StyledDiv>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
};

export default Header;
