import { StatusesQuery } from "../types/StatusesQuery";

/**
 * @param ids array of subgraph deployment ids
 * @returns array of subgraph status object
 */
export const fetchSubgraphStatuses = async (ids: string[]) => {
  try {
    const query = `query Statuses($ids:[String!]){
                        indexingStatuses(subgraphs: $ids){
                            subgraph
                            synced
                            health
                            paused
                            chains {
                                chainHeadBlock {
                                    number
                                }
                                latestBlock {
                                    number
                                }
                            }
                    }
}`;

    const response = await fetch(
      "https://indexer.upgrade.thegraph.com/status",
      {
        method: "POST",
        body: JSON.stringify({
          query,
          variables: {
            ids,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const res = await response.json();

    return (res.data as StatusesQuery).indexingStatuses;
  } catch (error: any) {
    console.log("Error while fetching subgraph statuses: ", {
      error,
    });
  }
};
