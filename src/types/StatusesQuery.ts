export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigInt: any;
  Bytes: any;
  Date: any;
  JSONObject: any;
};

export type ApiVersion = {
  __typename?: "ApiVersion";
  /** Version number in SemVer format */
  version: Scalars["String"];
};

export type Block = {
  __typename?: "Block";
  hash: Scalars["Bytes"];
  number: Scalars["BigInt"];
};

export type BlockInput = {
  hash: Scalars["Bytes"];
  number: Scalars["BigInt"];
};

export type CachedEthereumCall = {
  __typename?: "CachedEthereumCall";
  idHash: Scalars["Bytes"];
  block: Block;
  contractAddress: Scalars["Bytes"];
  returnValue: Scalars["Bytes"];
};

export type ChainIndexingStatus = {
  network: Scalars["String"];
  chainHeadBlock?: Maybe<Block>;
  earliestBlock?: Maybe<EarliestBlock>;
  latestBlock?: Maybe<Block>;
  lastHealthyBlock?: Maybe<Block>;
};

export type EarliestBlock = {
  __typename?: "EarliestBlock";
  hash: Scalars["Bytes"];
  number: Scalars["BigInt"];
};

export type EntityChanges = {
  __typename?: "EntityChanges";
  updates: Array<EntityTypeUpdates>;
  deletions: Array<EntityTypeDeletions>;
};

export type EntityTypeDeletions = {
  __typename?: "EntityTypeDeletions";
  type: Scalars["String"];
  entities: Array<Scalars["ID"]>;
};

export type EntityTypeUpdates = {
  __typename?: "EntityTypeUpdates";
  type: Scalars["String"];
  entities: Array<Scalars["JSONObject"]>;
};

export type EthereumIndexingStatus = ChainIndexingStatus & {
  __typename?: "EthereumIndexingStatus";
  network: Scalars["String"];
  chainHeadBlock?: Maybe<Block>;
  earliestBlock?: Maybe<EarliestBlock>;
  latestBlock?: Maybe<Block>;
  lastHealthyBlock?: Maybe<Block>;
};

export enum Feature {
  NonFatalErrors = "nonFatalErrors",
  Grafting = "grafting",
  FullTextSearch = "fullTextSearch",
  IpfsOnEthereumContracts = "ipfsOnEthereumContracts",
}

export enum Health {
  /** Subgraph syncing normally */
  Healthy = "healthy",
  /** Subgraph syncing but with errors */
  Unhealthy = "unhealthy",
  /** Subgraph halted due to errors */
  Failed = "failed",
}

export type PartialBlock = {
  __typename?: "PartialBlock";
  hash?: Maybe<Scalars["Bytes"]>;
  number: Scalars["BigInt"];
};

export type ProofOfIndexingRequest = {
  deployment: Scalars["String"];
  block: BlockInput;
};

export type ProofOfIndexingResult = {
  __typename?: "ProofOfIndexingResult";
  deployment: Scalars["String"];
  block: Block;
  /** There may not be a proof of indexing available for the deployment and block */
  proofOfIndexing?: Maybe<Scalars["Bytes"]>;
};

export type PublicProofOfIndexingRequest = {
  deployment: Scalars["String"];
  blockNumber: Scalars["BigInt"];
};

export type PublicProofOfIndexingResult = {
  __typename?: "PublicProofOfIndexingResult";
  deployment: Scalars["String"];
  block: PartialBlock;
  proofOfIndexing: Scalars["Bytes"];
};

export type Query = {
  __typename?: "Query";
  indexingStatusForCurrentVersion?: Maybe<SubgraphIndexingStatus>;
  indexingStatusForPendingVersion?: Maybe<SubgraphIndexingStatus>;
  indexingStatusesForSubgraphName: Array<SubgraphIndexingStatus>;
  indexingStatuses: Array<SubgraphIndexingStatus>;
  proofOfIndexing?: Maybe<Scalars["Bytes"]>;
  /**
   * Proofs of indexing for several deployments and blocks that can be shared and
   * compared in public without revealing the _actual_ proof of indexing that every
   * indexer has in their database
   */
  publicProofsOfIndexing: Array<PublicProofOfIndexingResult>;
  subgraphFeatures: SubgraphFeatures;
  entityChangesInBlock: EntityChanges;
  blockData?: Maybe<Scalars["JSONObject"]>;
  blockHashFromNumber?: Maybe<Scalars["Bytes"]>;
  version: Version;
  cachedEthereumCalls?: Maybe<Array<CachedEthereumCall>>;
  apiVersions: Array<ApiVersion>;
};

export type QueryIndexingStatusForCurrentVersionArgs = {
  subgraphName: Scalars["String"];
};

export type QueryIndexingStatusForPendingVersionArgs = {
  subgraphName: Scalars["String"];
};

export type QueryIndexingStatusesForSubgraphNameArgs = {
  subgraphName: Scalars["String"];
};

export type QueryIndexingStatusesArgs = {
  subgraphs?: Maybe<Array<Scalars["String"]>>;
};

export type QueryProofOfIndexingArgs = {
  subgraph: Scalars["String"];
  blockNumber: Scalars["Int"];
  blockHash: Scalars["Bytes"];
  indexer?: Maybe<Scalars["Bytes"]>;
};

export type QueryPublicProofsOfIndexingArgs = {
  requests: Array<PublicProofOfIndexingRequest>;
};

export type QuerySubgraphFeaturesArgs = {
  subgraphId: Scalars["String"];
};

export type QueryEntityChangesInBlockArgs = {
  subgraphId: Scalars["String"];
  blockNumber: Scalars["Int"];
};

export type QueryBlockDataArgs = {
  network: Scalars["String"];
  blockHash: Scalars["Bytes"];
};

export type QueryBlockHashFromNumberArgs = {
  network: Scalars["String"];
  blockNumber: Scalars["Int"];
};

export type QueryCachedEthereumCallsArgs = {
  network: Scalars["String"];
  blockHash: Scalars["Bytes"];
};

export type QueryApiVersionsArgs = {
  subgraphId: Scalars["String"];
};

export type SubgraphError = {
  __typename?: "SubgraphError";
  message: Scalars["String"];
  block?: Maybe<Block>;
  handler?: Maybe<Scalars["String"]>;
  deterministic: Scalars["Boolean"];
};

export type SubgraphFeatures = {
  __typename?: "SubgraphFeatures";
  apiVersion?: Maybe<Scalars["String"]>;
  specVersion: Scalars["String"];
  features: Array<Feature>;
  dataSources: Array<Scalars["String"]>;
  handlers: Array<Scalars["String"]>;
  network?: Maybe<Scalars["String"]>;
};

export type SubgraphIndexingStatus = {
  __typename?: "SubgraphIndexingStatus";
  subgraph: Scalars["String"];
  synced: Scalars["Boolean"];
  health: Health;
  /** If the subgraph has failed, this is the error caused it */
  fatalError?: Maybe<SubgraphError>;
  /** Sorted from first to last, limited to first 1000 */
  nonFatalErrors: Array<SubgraphError>;
  chains: Array<ChainIndexingStatus>;
  entityCount: Scalars["BigInt"];
  node?: Maybe<Scalars["String"]>;
  paused: Scalars["Boolean"];
  historyBlocks: Scalars["Int"];
};

export type Version = {
  __typename?: "Version";
  version: Scalars["String"];
  commit: Scalars["String"];
};

export type StatusesQueryVariables = Exact<{
  ids?: Maybe<Array<Scalars["String"]> | Scalars["String"]>;
}>;

export type StatusesQuery = { __typename?: "Query" } & {
  indexingStatuses: Array<
    { __typename?: "SubgraphIndexingStatus" } & Pick<
      SubgraphIndexingStatus,
      "subgraph" | "synced" | "health" | "paused"
    > & {
        chains: Array<
          { __typename?: "EthereumIndexingStatus" } & {
            chainHeadBlock?: Maybe<
              { __typename?: "Block" } & Pick<Block, "number">
            >;
            latestBlock?: Maybe<
              { __typename?: "Block" } & Pick<Block, "number">
            >;
          }
        >;
      }
  >;
};
