import { Settings } from "react-slick";
import styled from "styled-components";
import StatusSlider from "./StatusSlider";
import useWatcher, { Options, Subgraph } from "../../hooks/useWatcher";
import Loader from "../../components/Loader";
import withTheme, { WithThemeProps } from "../../components/withTheme";

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
  className?: string;
}

const StatusCard: React.FC<IStatusCard> = ({
  subgraphs,
  watcherOptions,
  carouselOptions,
  className,
}) => {
  const { statuses, isLoadingIds, isLoadingStatus } = useWatcher(
    subgraphs,
    watcherOptions
  );

  let RenderedComponent: JSX.Element | null = null;

  if (isLoadingIds)
    RenderedComponent = <Loader text="Loading deployment IDs" />;
  else if (isLoadingStatus || !statuses)
    RenderedComponent = <Loader text="Checking up on subgraphs" />;
  else {
    RenderedComponent = <StatusSlider {...{ statuses, carouselOptions }} />;
  }

  return <Container {...{ className }}>{RenderedComponent}</Container>;
};

export default withTheme(StatusCard);
