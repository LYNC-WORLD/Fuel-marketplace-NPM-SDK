import { Networks } from '@/enums';
import { SubgraphClient } from '../subgraph';
import { checkArguments } from '@/utils';
import { SubgraphCollectionData } from '@/interfaces';

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

export const fetchCollections = (network: Networks, subgraphURL: string, limit: number = 100) => {
  checkArguments([network, subgraphURL], 'arguments');

  const subgraphClient = new SubgraphClient(network, subgraphURL);
  return subgraphClient
    .setQueryString(FETCH_COLLECTION_QUERY)
    .setVariables({
      limit,
    })
    .query<SubgraphCollectionData[]>('Collection');
};
