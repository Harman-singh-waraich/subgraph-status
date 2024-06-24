import useWatcher, {
  Options,
  Subgraph,
  SubgraphStatus,
} from "../hooks/useWatcher";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loader from "../components/Loader";
import styled from "styled-components";
import { getStatusText } from "../utils/getStatusText";

const Container = styled.div`
  width: 100%;
  position: sticky;
  float: top;
  justify-content: center;
  align-items: center;
  padding: 4px 0px;
  background-color: #383838;
`;

const StatusContainer = styled.div`
  width: 100%;
  display: flex !important;
  justify-content: center;
  padding: 4px;
`;

const StatusText = styled.label`
  font-size: 14px;
  color: #fff;
  text-align: center;
`;

interface IBanner {
  subgraphs: Subgraph[];
  watcherOptions?: Options;
  carouselOptions?: Settings;
  textFormatter?: (subgraphStatus: SubgraphStatus) => string;
}
const Banner: React.FC<IBanner> = ({
  subgraphs,
  watcherOptions,
  carouselOptions,
  textFormatter,
}) => {
  const { statuses, isLoadingIds, isLoadingStatus } = useWatcher(
    subgraphs,
    watcherOptions
  );
  console.log({ statuses });

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
      <Container className="banner-container">
        <Loader text="Loading deployment IDs" />
      </Container>
    );
  if (isLoadingStatus)
    return (
      <Container className="banner-container">
        <Loader text="Checking up on subgraphs" />
      </Container>
    );

  return (
    <Container className="banner-container">
      <Slider {...settings} className="slider">
        {statuses?.map((status) => (
          <StatusContainer key={status.name} className="status-container">
            <StatusText className="status-text">
              {textFormatter ? textFormatter(status) : getStatusText(status)}
            </StatusText>
          </StatusContainer>
        ))}
      </Slider>
    </Container>
  );
};

export default Banner;
