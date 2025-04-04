import { AllowedProviders } from '@/enums';
import { ListingMetadata, NftDetails, NftDetailsArgs, NftMetadata, OmittedMarketplaceListings } from '@/interfaces';
import { fetchNft, NftMetadataClient } from '@/services/orders';
import { getMintedAssetId } from 'fuels';
import { NFTStandardOutput } from '@/contracts/marketplace';
import { getFormattedPrice } from '@/utils';

const placeholderMetadata = {
  tokenName: '',
  tokenImage: '',
  tokenAssetMedia: '',
  description: '',
} as const satisfies NftMetadata;

export const getNftDetails = async ({
  network,
  limit,
  contractAddress,
  nftStandard,
  tokenId,
}: NftDetailsArgs): Promise<
  | {
      success: true;
      data: NftDetails;
    }
  | {
      success: false;
      error: unknown;
    }
> => {
  if (!contractAddress || !nftStandard || !tokenId)
    throw new Error('Missing arguments: Contract address, Nft standard, and Token Id.');

  const mintedAssetId = getMintedAssetId(contractAddress, tokenId);
  const metadata: NftMetadata = placeholderMetadata;

  const meteDataClient = new NftMetadataClient(network);
  const metaDataClientWithProvider = await meteDataClient.useProvider(AllowedProviders.FuelProvider);

  const listingMetadata = await metaDataClientWithProvider
    .setContract(contractAddress, nftStandard as NFTStandardOutput)
    .getMetadata<ListingMetadata>(mintedAssetId);

  if (listingMetadata.success) {
    metadata.description = listingMetadata.data?.description ?? '';
    metadata.tokenName = listingMetadata.data?.name ?? '';
    metadata.tokenImage = listingMetadata.data?.image ?? '';
    metadata.tokenAssetMedia = listingMetadata.data?.assetMedia ?? '';
  }

  const response = await fetchNft(network, contractAddress, nftStandard, tokenId, limit ?? 100);
  if (!response.success) {
    return response as {
      success: false;
      error: unknown;
    };
  }

  const listingData = response.data;
  const formattedData: OmittedMarketplaceListings[] = listingData!.map((d) => ({
    listingId: Number(d.id),
    isActive: d.status === 'ACTIVE',
    nftAddress: d.nftAddress,
    tokenStandard: d.nftType,
    tokenId: d.tokenId,
    assetId: d.asset_id,
    tokenQuantity: parseInt(d.quantity),
    pricePerItem: getFormattedPrice(d.pricePerItem),
    sellerAddress: d.seller,
  }));

  return {
    success: true,
    data: { listingData: formattedData, nftMetadata: metadata },
  };
};
