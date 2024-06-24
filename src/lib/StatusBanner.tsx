import { useMemo } from "react";
import Slider, { Settings } from "react-slick";
import styled from "styled-components";
import Loader from "src/components/Loader";
import withTheme from "src/components/withTheme";
import useWatcher, {
  HealthStatus,
  Options,
  Subgraph,
  SubgraphStatus,
} from "src/hooks/useWatcher";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DotAndStatus from "src/components/DotAndStatus";
import Blocks from "src/components/Blocks";

const Container = styled.div<{ hide?: boolean }>`
  display: ${({ hide }) => (hide ? "none" : "block")};
  width: 100%;
  position: absolute;
  top: 0;
  justify-content: center;
  align-items: center;
  padding: 4px 0px;
  background: ${({ theme }) => theme.colors.main};
`;

const Slide = styled.div`
  width: 100%;
  display: flex !important;
  justify-content: center;
  padding: 4px;
`;

const StatusText = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
`;

const SubgraphName = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
`;
interface IStatusBanner {
  subgraphs: Subgraph[];
  watcherOptions?: Options;
  carouselOptions?: Settings;
  textFormatter?: (subgraphStatus: SubgraphStatus) => string;
  // hide the banner if all subgraphs are healthy
  autoHide?: boolean;
}

const StatusBanner: React.FC<IStatusBanner> = ({
  subgraphs,
  watcherOptions,
  carouselOptions,
  textFormatter,
  autoHide,
}) => {
  const { statuses, isLoadingIds, isLoadingStatus } = useWatcher(
    subgraphs,
    watcherOptions
  );

  const hide = useMemo(
    () =>
      autoHide &&
      statuses?.every(
        (subgraphStatus) => subgraphStatus.status === HealthStatus.HEALTHY
      ),
    [statuses, autoHide]
  );

  const settings: Settings = {
    infinite: statuses && statuses.length > 1,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    ...carouselOptions,
  };

  if (isLoadingIds)
    return (
      <Container className="banner">
        <Loader text="Loading deployment IDs" />
      </Container>
    );

  if (isLoadingStatus || !statuses)
    return (
      <Container className="banner">
        <Loader text="Checking up on subgraphs" />
      </Container>
    );

  return (
    <Container className="banner" {...{ hide }}>
      <Slider {...settings}>
        {statuses.map((status) => (
          <Slide key={status.name} className="slide">
            <StatusText className="status-text">
              {textFormatter ? (
                textFormatter(status)
              ) : (
                <>
                  {" "}
                  <SubgraphName>{status.name}:</SubgraphName>{" "}
                  <DotAndStatus subgraphStatus={status} />
                  {"  |  "}
                  <Blocks blocks={status.blocksBehind} isBanner />{" "}
                </>
              )}
            </StatusText>
          </Slide>
        ))}
      </Slider>
    </Container>
  );
};

export default withTheme(StatusBanner);
