import { HealthStatus, SubgraphStatus } from "../hooks/useWatcher";

export const getStatusText = (subgraphStatus: SubgraphStatus) => {
  switch (subgraphStatus.status) {
    case HealthStatus.HEALTHY:
      return `Subgraph ${subgraphStatus.name} is healthy.`;
    case HealthStatus.SYNCING:
      return `Subgraph ${subgraphStatus.name} is syncing and is behind by ${subgraphStatus.blocksBehind} blocks.`;
    case HealthStatus.LAGGING:
      return `Subgraph ${subgraphStatus.name} is lagging by ${subgraphStatus.blocksBehind} blocks.`;
    default:
      return `Subgraph ${subgraphStatus.name} has failed.`;
  }
};
