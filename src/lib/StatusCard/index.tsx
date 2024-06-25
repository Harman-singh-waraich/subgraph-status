import { Settings } from "react-slick";
import styled from "styled-components";
import StatusSlider from "./StatusSlider";
import useWatcher, { Options, Subgraph } from "../../hooks/useWatcher";
import Loader from "../../components/Loader";
import withTheme from "../../components/withTheme";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const Container = styled.div<{ hide?: boolean }>`
  width: 180px;
  display: flex;
  justify-content: start;
  padding: 8px;
  background: ${({ theme }) => theme.colors.main};
  border-radius: ${({ theme }) => theme.borderRadius};

  .slick-slider {
    width: 160px;
  }
`;

interface IStatusCard {
  subgraphs: Subgraph[];
  watcherOptions?: Options;
  carouselOptions?: Settings;
}

const StatusCard: React.FC<IStatusCard> = ({
  subgraphs,
  watcherOptions,
  carouselOptions,
}) => {
  const { statuses, isLoadingIds, isLoadingStatus } = useWatcher(
    subgraphs,
    watcherOptions
  );

  if (isLoadingIds)
    return (
      <Container className="card">
        <Loader text="Loading deployment IDs" />
      </Container>
    );

  if (isLoadingStatus || !statuses)
    return (
      <Container className="card">
        <Loader text="Checking up on subgraphs" />
      </Container>
    );

  return (
    <Container className="card">
      <StatusSlider {...{ statuses, carouselOptions }} />
    </Container>
  );
};

export default withTheme(StatusCard);
