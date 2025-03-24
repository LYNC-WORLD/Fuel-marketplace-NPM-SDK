import axios from 'axios';
import { MarketplaceErrorCodes, Networks } from '@/enums';
import { MarketplaceError, SubgraphErrorResponse, SubgraphSuccessResponse } from '@/interfaces';
import { checkArguments, sleep } from '@/utils';
import { subgraphURLs } from '@/configs';

export class SubgraphClient {
  private readonly graphQLEndpoint: string = '';
  private queryString: string = '';
  private variables: Record<string, unknown> = {};

  private static lastCallTimestamp: number = 0;

  constructor(network: Networks) {
    checkArguments([network], 'arguments');

    if (!subgraphURLs[network])
      throw new MarketplaceError(
        'Invalid Network Argument: Subgraph URL not found for network',
        MarketplaceErrorCodes.InvalidNetworkArgument,
        { network }
      );

    this.graphQLEndpoint = subgraphURLs[network];
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
    if (timeDifference <= 1000) await sleep(1000 - timeDifference);

    try {
      const { status, data } = await axios.post<SubgraphErrorResponse | SubgraphSuccessResponse<TData>>(
        this.graphQLEndpoint,
        { query: this.queryString, variables: this.variables },
        { headers: { 'Content-Type': 'application/json' } }
      );

      SubgraphClient.lastCallTimestamp = new Date().getTime();

      if (status !== 200 || 'errors' in data)
        throw new MarketplaceError(
          'Network Request Error: Error fetching data from subgraph',
          MarketplaceErrorCodes.NetworkRequestError,
          (data as SubgraphErrorResponse).errors
        );

      return { success: true, data: data.data[dataKey] as TData };
    } catch (error: unknown) {
      console.error('Error Log: Error fetching data from subgraph: ', error);
      return { success: false, error };
    }
  }
}
