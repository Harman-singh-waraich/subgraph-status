import styled from "styled-components";
import { SubgraphStatus } from "src/hooks/useWatcher";
import { getStatusColorAndText } from "src/utils/getStatusColorAndText";

const Container = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 0 4px;
`;

const Dot = styled.div<{ color: string }>`
  display: block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  box-shadow: 0 0 0 3px ${({ color }) => `${transparentize(color, 0.7)}`};
  background-color: ${({ color }) => color};
`;

const StyledLabel = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.secondary};
`;

const DotAndStatus: React.FC<{ subgraphStatus: SubgraphStatus }> = ({
  subgraphStatus,
}) => {
  const [color, text] = getStatusColorAndText(subgraphStatus);

  return (
    <Container>
      <Dot color={color} />
      <StyledLabel>{text}</StyledLabel>
    </Container>
  );
};

const transparentize = (hex: string, alpha: number) => {
  hex = hex.replace(/^#/, "");

  // Parse r, g, b values
  let r, g, b;
  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length === 6) {
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
  } else {
    throw new Error("Invalid hex color");
  }

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
export default DotAndStatus;
