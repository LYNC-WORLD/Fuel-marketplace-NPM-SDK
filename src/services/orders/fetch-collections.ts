import { Networks } from '@/enums';
import { SubgraphClient } from '../subgraph';
import { checkArguments } from '@/utils';

const FETCH_COLLECTION_QUERY = `
  query FetchCollection ($limit: Int = 100) {
    Collection (
      order_by: { db_write_timestamp: desc }
      limit: $limit
    ) {
      id
      nftType
      name
      symbol
      floorPrice
      listed
    }
  }
`;

export const fetchCollections = (network: Networks, limit: number = 100) => {
  checkArguments([network], 'arguments');

  const subgraphClient = new SubgraphClient(network);
  return subgraphClient
    .setQueryString(FETCH_COLLECTION_QUERY)
    .setVariables({
      limit,
    })
    .query();
};
