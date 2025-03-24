export interface SubgraphErrorResponse {
  errors: { message: string }[];
}

export interface SubgraphSuccessResponse<TData> {
  data: {
    Listing?: TData;
    Collection?: TData;
  };
}

export interface ContractBalancesQueryResponse {
  data: {
    contractBalances: {
      nodes: {
        amount: string;
        assetId: string;
      }[];
    };
  };
}
