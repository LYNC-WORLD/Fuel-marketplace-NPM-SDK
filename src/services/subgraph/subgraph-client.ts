import axios from 'axios';
import { MarketplaceErrorCodes, Networks } from '@/enums';
import { MarketplaceError, SubgraphErrorResponse, SubgraphSuccessResponse } from '@/interfaces';
import { checkArguments, sleep } from '@/utils';

export class SubgraphClient {
  private readonly graphQLEndpoint: string | undefined = undefined;
  private queryString: string | undefined = undefined;
  private variables: Record<string, unknown> | undefined = undefined;

  private static lastCallTimestamp: number = 0;

  constructor(network: Networks, subgraphURL: string) {
    checkArguments([network, subgraphURL], 'arguments');

    this.graphQLEndpoint = subgraphURL;
    this.queryString = '';
    this.variables = {};
  }

  setQueryString(queryString: string) {
    checkArguments([queryString], 'arguments');
    this.queryString = queryString;
    return this;
  }

  setVariables(variables: Record<string, unknown>) {
    checkArguments([variables], 'arguments');
    this.variables = variables;
    return this;
  }

  async query<TData>(dataKey: 'Listing' | 'Collection') {
    checkArguments([this.graphQLEndpoint, this.queryString, this.variables], 'properties');

    const currentTimestamp = new Date().getTime();
    const timeDifference = currentTimestamp - SubgraphClient.lastCallTimestamp;
    if (timeDifference <= 1000) await sleep(2000 - timeDifference);

    try {
      const { status, data } = await axios.post<SubgraphErrorResponse | SubgraphSuccessResponse<TData>>(
        this.graphQLEndpoint as string,
        { query: this.queryString, variables: this.variables },
        { headers: { 'Content-Type': 'application/json' } }
      );

      SubgraphClient.lastCallTimestamp = new Date().getTime();

      if (status !== 200 || 'errors' in data)
        throw new MarketplaceError(
          'Error fetching data from subgraph',
          MarketplaceErrorCodes.NetworkError,
          (data as SubgraphErrorResponse).errors
        );

      return { success: true, data: data.data[dataKey] as TData };
    } catch (error: unknown) {
      console.error('Error Log: Error fetching data from subgraph: ', error);
      return { success: false, error };
    }
  }
}
