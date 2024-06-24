/**
 *
 * @param url url of the subgraph
 * @returns the deploymeny id of the subgraph
 */
export const fetchSubgraphDeploymentId = async (url: string) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
                  {
                  _meta {
                    deployment   
                    }
                  }
                  `,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const res = await response.json();

    return res.data._meta.deployment as string;
  } catch (error: any) {
    console.log("Error while fetching subgraph deployment id : ", {
      url,
      error,
    });
  }
};
