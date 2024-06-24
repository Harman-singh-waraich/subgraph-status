import styled from "styled-components";

const BlocksContainer = styled.div<{ isBanner?: boolean }>`
  display: flex;
  flex-direction: ${({ isBanner }) => (isBanner ? "row" : "column")};
  align-items: ${({ isBanner }) => (isBanner ? "center" : "start")};
  gap: 4px;
`;

const BlocksBehindText = styled.label`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.secondary};
`;

const BlocksText = styled.h2`
  margin: 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primary};
`;

interface IBlocks {
  blocks: number;
  isBanner?: boolean;
}
const Blocks: React.FC<IBlocks> = ({ blocks, isBanner = false }) => {
  return (
    <BlocksContainer className="blocks-container" {...{ isBanner }}>
      <BlocksBehindText>Blocks behind:</BlocksBehindText>
      <BlocksText>{blocks}</BlocksText>
    </BlocksContainer>
  );
};

export default Blocks;
