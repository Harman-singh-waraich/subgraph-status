import styled from "styled-components";
import StatusBanner from "./lib/StatusBanner";
import { StatusCard } from "./lib";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  const subgraphs = [
    {
      name: "Curate",
      url: "https://api.studio.thegraph.com/query/61738/curate-v2-devnet/version/latest",
    },
    {
      name: "Gnosis-Safe",
      url: "https://api.studio.thegraph.com/query/61738/gnosis-safe-mainnet/version/latest",
    },
    {
      name: "Kleros-Moderate",
      url: "https://api.studio.thegraph.com/query/61738/kleros-moderate-test/version/latest",
    },
  ];
  return (
    <Container>
      <StatusBanner autoHide subgraphs={subgraphs} />
      <StatusCard subgraphs={subgraphs} />
    </Container>
  );
}

export default App;
