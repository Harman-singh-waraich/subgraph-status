import styled from "styled-components";
import Banner from "./lib/Banner";

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

function App() {
  return (
    <Container>
      <Banner
        subgraphs={[
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
        ]}
      />
    </Container>
  );
}

export default App;
