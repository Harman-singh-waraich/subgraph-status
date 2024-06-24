import Slider, { Settings } from "react-slick";
import styled from "styled-components";
import { SubgraphStatus } from "../../hooks/useWatcher";
import DotAndStatus from "../../components/DotAndStatus";
import Blocks from "../../components/Blocks";

const Slide = styled.div`
  display: flex !important;
  flex-direction: column;
  justify-content: start;
  gap: 8px;
`;

const SubgraphName = styled.h2`
  margin: 0;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primary};
`;

const Divider = styled.hr`
  width: 100%;
  border-color: ${({ theme }) => theme.colors.stroke};
`;

interface IStatusSlider {
  carouselOptions?: Settings;
  statuses: SubgraphStatus[];
}

const StatusSlider: React.FC<IStatusSlider> = ({
  carouselOptions,
  statuses,
}) => {
  const settings: Settings = {
    infinite: statuses && statuses.length > 1,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    ...carouselOptions,
  };

  return (
    <Slider {...settings}>
      {statuses?.map((status) => (
        <Slide key={status.name} className="slide">
          <SubgraphName className="status-text">{status.name}</SubgraphName>
          <Divider />
          <DotAndStatus subgraphStatus={status} />
          <Blocks blocks={status.blocksBehind} />
        </Slide>
      ))}
    </Slider>
  );
};

export default StatusSlider;
