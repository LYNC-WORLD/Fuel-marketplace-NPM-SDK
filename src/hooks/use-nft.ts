import { useCallback, useEffect, useState } from 'react';
import { HooksReturn, ListingMetadata, NftDetails, NftDetailsArgs } from '@/interfaces';
import { fetchNft, NftMetadataClient } from '@/services/orders';
import { AllowedProviders } from '@/enums';
import { getFormattedPrice } from '@/utils';
import { NFTStandardOutput } from '@/contracts/marketplace';

export const useNft = ({
  network,
  limit,
  contractAddress,
  nftStandard,
  tokenId,
}: NftDetailsArgs): Readonly<HooksReturn<NftDetails[]>> => {
  const [fetching, setFetching] = useState<boolean>(true);
  const [data, setData] = useState<NftDetails[]>([]);
  const [error, setError] = useState<unknown>(null);

  const fetchData = useCallback(async () => {
    if (!contractAddress || !nftStandard || !tokenId) return;

    const response = await fetchNft(network, contractAddress, nftStandard, tokenId, limit ?? 100);

    if (!response.success) {
      setError(response.error);
      setData([]);
      setFetching(false);
      return;
    }

    const listingData = response.data;

    const meteDataClient = new NftMetadataClient(network);
    const metaDataClientWithProvider = await meteDataClient.useProvider(AllowedProviders.FuelProvider);

    const formattedData = listingData!.map(
      (d) =>
        ({
          listingId: Number(d.id),
          isActive: d.status === 'ACTIVE',
          nftAddress: d.nftAddress,
          tokenStandard: d.nftType,
          tokenId: d.tokenId,
          assetId: d.asset_id,
          tokenQuantity: parseInt(d.quantity),
          pricePerItem: getFormattedPrice(d.pricePerItem),
          sellerAddress: d.seller,
          tokenName: '',
          tokenImage: '',
          tokenAssetMedia: '',
          description: '',
        }) as NftDetails
    );

    const fetchMetadata = (d: NftDetails) => {
      return metaDataClientWithProvider
        .setContract(d.nftAddress, d.tokenStandard as NFTStandardOutput)
        .getMetadata<ListingMetadata>(d.assetId);
    };

    const listingMetadataPromises = await Promise.allSettled<{
      success: boolean;
      data?: ListingMetadata;
      error?: unknown;
    }>(formattedData.map(fetchMetadata));

    const listingsWithMetadata = listingMetadataPromises.map((p, i) => {
      const listing = formattedData[i];

      if (p.status === 'fulfilled') {
        const metadata = p.value;

        if (metadata.success) {
          listing.tokenName = metadata.data?.name ?? '';
          listing.tokenImage = metadata.data?.image ?? '';
          listing.tokenAssetMedia = metadata.data?.assetMedia ?? '';
          listing.description = metadata.data?.description ?? '';
        }
      }

      return listing;
    });

    setData(listingsWithMetadata);
    setError(null);

    setFetching(false);
  }, [network, contractAddress, nftStandard, tokenId, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { fetching, data, error } as const satisfies HooksReturn<NftDetails[]>;
};
