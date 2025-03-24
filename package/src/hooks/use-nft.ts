import { useCallback, useEffect, useState } from 'react';
import {
  HooksReturn,
  ListingMetadata,
  NftDetailsArgs,
  NftDetails,
  NftMetadata,
  OmittedMarketplaceListings,
} from '@/interfaces';
import { fetchNft, NftMetadataClient } from '@/services/orders';
import { AllowedProviders } from '@/enums';
import { getFormattedPrice } from '@/utils';
import { NFTStandardOutput } from '@/contracts/marketplace';
import { getMintedAssetId } from 'fuels';

const placeholderMetadata = {
  tokenName: '',
  tokenImage: '',
  tokenAssetMedia: '',
  description: '',
} as const satisfies NftMetadata;

export const useNft = ({
  network,
  limit,
  contractAddress,
  nftStandard,
  tokenId,
}: NftDetailsArgs): Readonly<HooksReturn<NftDetails>> => {
  const [fetching, setFetching] = useState<boolean>(true);
  const [data, setData] = useState<NftDetails>({
    listingData: [],
    nftMetadata: placeholderMetadata,
  });
  const [error, setError] = useState<unknown>(null);

  const fetchData = useCallback(async () => {
    if (!contractAddress || !nftStandard || !tokenId) return;

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
      setError(response.error);
      setData({
        listingData: [],
        nftMetadata: metadata,
      });
      setFetching(false);
      return;
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

    setData({ listingData: formattedData, nftMetadata: metadata });
    setError(null);
    setFetching(false);
  }, [network, contractAddress, nftStandard, tokenId, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { fetching, data, error } as const satisfies HooksReturn<NftDetails>;
};
