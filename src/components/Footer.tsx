import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  padding: 24px;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  gap: 4px;
`;

const StyledLabel = styled.label`
  font: 14px;
`;

const StyledA = styled.a`
  text-decoration: none;
`;

const Footer: React.FC = () => (
  <Container>
    <StyledLabel>Made with 🩵 by</StyledLabel>
    <StyledA href="https://turbancoder.dev/" target="_blank" rel="noreferrer">
      @TurbanCoder
    </StyledA>
  </Container>
);

export default Footer;
