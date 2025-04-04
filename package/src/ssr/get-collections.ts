import { NFTStandardOutput } from '@/contracts/marketplace';
import { AllowedProviders } from '@/enums';
import { CollectionMetadata, HooksArgs, MarketplaceCollections } from '@/interfaces';
import { fetchCollections, NftMetadataClient } from '@/services/orders';
import { getFormattedPrice } from '@/utils';
import { getMintedAssetId } from 'fuels';

export const getCollections = async ({
  network,
  limit,
}: HooksArgs): Promise<
  | {
      success: true;
      data: MarketplaceCollections[];
    }
  | {
      success: false;
      error: unknown;
    }
> => {
  if (!network) throw new Error('Missing argument: Network.');

  const response = await fetchCollections(network, limit ?? 100);
  if (!response.success) {
    return response as {
      success: false;
      error: unknown;
    };
  }

  const collectionData = response.data;

  const meteDataClient = new NftMetadataClient(network);
  const metaDataClientWithProvider = await meteDataClient.useProvider(AllowedProviders.FuelProvider);

  const formattedData = collectionData!.map(
    (d) =>
      ({
        contractAddress: d.id,
        tokenStandard: d.nftType,
        collectionName: d.name,
        collectionSymbol: d.symbol,
        floorPrice: getFormattedPrice(d.floorPrice),
        totalItemsListed: parseInt(d.listed),
        bannerImage: '',
      }) as MarketplaceCollections
  );

  const fetchMetadata = (d: MarketplaceCollections) => {
    const assetId = getMintedAssetId(
      d.contractAddress,
      '0x0000000000000000000000000000000000000000000000000000000000000000'
    );

    const metadataPromise = metaDataClientWithProvider
      .setContract(d.contractAddress, d.tokenStandard as NFTStandardOutput)
      .getMetadata<CollectionMetadata>(assetId);

    return metadataPromise;
  };

  const collectionMetadataPromises = await Promise.allSettled<{
    success: boolean;
    data?: CollectionMetadata;
    error?: unknown;
  }>(formattedData.map(fetchMetadata));

  const collectionsWithBannerImages = collectionMetadataPromises.map((p, i) => {
    const collection = formattedData[i];

    if (p.status === 'fulfilled') {
      const metadata = p.value;
      if (metadata.success) collection.bannerImage = metadata.data?.image ?? '';
    }

    return collection;
  });

  return {
    success: true,
    data: collectionsWithBannerImages,
  };
};
