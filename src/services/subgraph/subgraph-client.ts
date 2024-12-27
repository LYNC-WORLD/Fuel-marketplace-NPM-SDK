import axios from 'axios';
import { graphQLEndpoints } from '@/configs';
import { MarketplaceErrorCodes, Networks } from '@/enums';
import { MarketplaceError } from '@/interfaces';
import { checkArguments, sleep } from '@/utils';

export class SubgraphClient {
  private readonly graphQLEndpoint: (typeof graphQLEndpoints)[keyof typeof graphQLEndpoints] | undefined = undefined;
  private queryString: string | undefined = undefined;
  private variables: Record<string, unknown> | undefined = undefined;

  private static lastCallTimestamp: number = 0;

  constructor(network: Networks) {
    checkArguments([network], 'arguments');

    if (!graphQLEndpoints[network])
      throw new MarketplaceError(
        `Subgraph config not found for network: ${network}`,
        MarketplaceErrorCodes.ValidationError
      );

    this.graphQLEndpoint = graphQLEndpoints[network];
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

  async query() {
    checkArguments([this.graphQLEndpoint, this.queryString, this.variables], 'properties');

    const currentTimestamp = new Date().getTime();
    const timeDifference = currentTimestamp - SubgraphClient.lastCallTimestamp;
    if (timeDifference <= 1000) await sleep(1000 - timeDifference);

    try {
      const response = await axios.post(
        this.graphQLEndpoint as string,
        { query: this.queryString, variables: this.variables },
        { headers: { 'Content-Type': 'application/json' } }
      );

      SubgraphClient.lastCallTimestamp = new Date().getTime();

      if (response.status !== 200 || response.data.errors)
        throw new MarketplaceError(
          'Error fetching data from subgraph',
          MarketplaceErrorCodes.NetworkError,
          response.data.errors
        );

      return response.data;
    } catch (error: unknown) {
      console.error('Error Log: Error fetching data from subgraph: ', error);
      return error;
    }
  }
}
