import { HealthStatus, SubgraphStatus } from "../hooks/useWatcher";

export const getStatusColorAndText = (subgraphStatus: SubgraphStatus) => {
  switch (subgraphStatus.status) {
    case HealthStatus.HEALTHY:
      return ["#00C42B", "healthy"];
    case HealthStatus.SYNCING:
      return ["#D14EFF", "syncing"];
    case HealthStatus.LAGGING:
      return ["#FF9900", `lagging`];
    default:
      return ["#F60C36", "failed"];
  }
};
