import { Networks } from '@/enums';
import { checkArguments } from '@/utils';
import { SubgraphClient } from '../subgraph';

const SEARCH_MARKETPLACE_QUERY = `
  query SearchMarketplace($searchString: String!, $limit: Int = 100) {
    Listing(
      where: {
        status: { _eq: "ACTIVE" }
        _or: [
          { nftAddress: { _ilike: $searchString } }
          { nftType: { _ilike: $searchString } }
          { tokenId: { _ilike: $searchString } }
          { asset_id: { _ilike: $searchString } }
          { seller: { _ilike: $searchString } }
        ]
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

export const searchMarketplace = (network: Networks, searchString: string, limit: number = 100) => {
  checkArguments([network, searchString], 'arguments');

  const subgraphClient = new SubgraphClient(network);
  return subgraphClient
    .setQueryString(SEARCH_MARKETPLACE_QUERY)
    .setVariables({
      searchString: `%${searchString}%`,
      limit,
    })
    .query();
};
