import { useEffect, useState } from "react";
import { fetchSubgraphDeploymentId } from "../utils/fetchSubgraphDeploymentId";
import { fetchSubgraphStatuses } from "../utils/fetchSubgraphStatuses";
import { Health } from "../types/StatusesQuery";

export enum HealthStatus {
  HEALTHY,
  LAGGING,
  DEAD,
  SYNCING,
}

export type Options = {
  // interval of time after which subgraph status is checked
  interval: number;
  // number of blocks after which the subgraph will be labelled as lagging
  threshold: number;
};

export type Subgraph = {
  // a unique name for the subgraph
  name: string;
  // query url of the subgraph
  url: string;
};

export type SubgraphStatus = {
  name: string;
  status: HealthStatus;
  blocksBehind: number;
};

const initialOptions: Options = {
  interval: 30_000,
  threshold: 50_000,
};

/**
 *
 * @param subgraphs array of subgraphs with name and url
 * @param options interval and threshold values, default values are 30 sec and 50,000 Blocks respectively
 * @returns an array of SubgraphStatus object
 */
const useWatcher = (subgraphs: Subgraph[], options = initialOptions) => {
  const [statuses, setStatuses] = useState<SubgraphStatus[]>();
  const [subgraphIds, setSubgraphIds] = useState<string[]>();
  const [isLoadingIds, setIsLoadingIds] = useState(false);
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);
  const [idToNameMap, setIdToNameMap] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchIdObjects = async () => {
      const idPromises = subgraphs.map(async (subgraph) => {
        return {
          id: await fetchSubgraphDeploymentId(subgraph.url),
          name: subgraph.name,
        };
      });

      return await Promise.all(idPromises);
    };

    let idToNameMap: Record<string, string> = {};
    setIsLoadingIds(true);

    fetchIdObjects()
      .then((objs) => {
        const ids = objs.map((obj) => {
          if (!obj.id) return;
          idToNameMap[obj.id] = obj.name;

          return obj.id;
        });
        setSubgraphIds(ids as string[]);
      })
      .finally(() => {
        setIsLoadingIds(false);
        setIdToNameMap(idToNameMap);
      });
  }, [subgraphs]);

  useEffect(() => {
    const checkHealth = async () => {
      if (!subgraphIds || subgraphIds?.some((id) => !id)) return;
      setIsLoadingStatus(true);

      const latestStatuses = await fetchSubgraphStatuses(subgraphIds);

      if (!latestStatuses) return;

      const compiledStatuses: SubgraphStatus[] = subgraphIds.map((id) => {
        const subgraphStatus = latestStatuses.find(
          (status) => status.subgraph === id
        );

        const lag =
          subgraphStatus?.chains[0].chainHeadBlock?.number -
          subgraphStatus?.chains[0].latestBlock?.number;

        let healthStatus;
        const subgraphHealth = subgraphStatus?.health;

        if (subgraphHealth === Health.Failed) healthStatus = HealthStatus.DEAD;
        else if (!subgraphStatus?.synced) healthStatus = HealthStatus.SYNCING;
        else if (lag > options.threshold) healthStatus = HealthStatus.LAGGING;
        else healthStatus = HealthStatus.HEALTHY;

        return {
          name: idToNameMap[id],
          status: healthStatus,
          blocksBehind: lag,
        };
      });

      setStatuses(compiledStatuses);
    };

    checkHealth().finally(() => setIsLoadingStatus(false));

    const intervalId = setInterval(() => {
      checkHealth().finally(() => setIsLoadingStatus(false));
    }, options.interval);

    return () => clearInterval(intervalId);
  }, [subgraphIds, idToNameMap, options]);

  return { statuses, isLoadingIds, isLoadingStatus };
};

export default useWatcher;
