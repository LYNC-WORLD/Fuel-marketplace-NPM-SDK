import { Networks } from '@/enums';
import { checkArguments } from '@/utils';
import { SubgraphClient } from '../subgraph';
import { SubgraphListingData } from '@/interfaces';

const FETCH_NFT_QUERY = `
  query FetchListings ($status: status!, $contractAddress: String!, $nftStandard: nftstandard!, $tokenId: String!, $limit: Int = 100) {
    Listing (
      where: {
        status: { _eq: $status }
        _and: [
          { nftAddress: { _eq: $contractAddress } }
          { nftType: { _eq: $nftStandard } }
          { tokenId: { _eq: $tokenId } }
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

export const fetchNft = (
  network: Networks,
  contractAddress: string,
  nftStandard: 'NFT' | 'SEMI_FT',
  tokenId: string,
  limit: number = 100
) => {
  checkArguments([network, contractAddress, nftStandard, tokenId], 'arguments');

  const subgraphClient = new SubgraphClient(network);
  return subgraphClient
    .setQueryString(FETCH_NFT_QUERY)
    .setVariables({
      status: 'ACTIVE',
      contractAddress,
      nftStandard,
      tokenId,
      limit,
    })
    .query<SubgraphListingData[]>('Listing');
};
