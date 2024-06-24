import styled from "styled-components";

const LoaderIcon = styled.div`
  width: 12px;
  aspect-ratio: 1;
  --_g: no-repeat radial-gradient(farthest-side, #fff 94%, #fff);
  background: var(--_g) 0 0, var(--_g) 100% 0, var(--_g) 100% 100%,
    var(--_g) 0 100%;
  background-size: 40% 40%;
  animation: l38 0.5s infinite;
  @keyframes l38 {
    100% {
      background-position: 100% 0, 100% 100%, 0 100%, 0 0;
    }
  }
`;

const Container = styled.div`
  display: flex;
  height: fit-content;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 4px;
`;

const LoaderText = styled.label`
  color: white;
  font-size: 14px;
`;

const Loader: React.FC<{ text: string }> = ({ text }) => (
  <Container className="loader">
    <LoaderIcon />
    <LoaderText>{text}</LoaderText>
  </Container>
);

export default Loader;
