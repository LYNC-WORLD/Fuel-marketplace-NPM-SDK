import { Networks } from '@/enums';
import { checkArguments } from '@/utils';
import { SubgraphClient } from '../subgraph';
import { SubgraphListingData } from '@/interfaces';

const FETCH_LISTINGS_QUERY = `
  query FetchListings ($status: status!, $limit: Int = 100) {
    Listing (
      where: {
        status: { _eq: $status }
      }
      order_by: { db_write_timestamp: desc }
      limit: $limit
    ) {
      id
      status
      nftAddress
      nftType
      tokenId
      asset_id
      quantity
      pricePerItem
      seller
    }
  }
`;

export const fetchListings = (network: Networks, limit: number = 100) => {
  checkArguments([network], 'arguments');

  const subgraphClient = new SubgraphClient(network);
  return subgraphClient
    .setQueryString(FETCH_LISTINGS_QUERY)
    .setVariables({
      status: 'ACTIVE',
      limit,
    })
    .query<SubgraphListingData[]>('Listing');
};
