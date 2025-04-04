import { AllNftsInCollectionArgs, TokensInCollection } from '@/interfaces';
import { fetchAllNftOfContract, getContractBalances } from '@/utils';
import { Address } from 'fuels';

export const getAllNftsInCollection = async ({
  network,
  nftStandard,
  contractAddress,
}: AllNftsInCollectionArgs): Promise<
  | {
      success: true;
      data: TokensInCollection[];
    }
  | {
      success: false;
      error: unknown;
    }
> => {
  if (!network || !contractAddress || !nftStandard)
    throw new Error('Missing arguments: Network, Contract address, and Nft standard.');

  const isAddress = Address.fromB256(contractAddress);
  if (!isAddress) {
    return {
      success: false,
      error: new Error('Invalid contract address'),
    };
  }

  const contractBalances = await getContractBalances(network, contractAddress);

  if (!contractBalances.success) {
    return contractBalances as {
      success: false;
      error: unknown;
    };
  }

  const assetIds: string[] = [];
  contractBalances.data?.forEach((d) => {
    if (d.assetId !== '0x0000000000000000000000000000000000000000000000000000000000000000') {
      assetIds.push(d.assetId);
    }
  });

  const allNftsOfContract = await fetchAllNftOfContract(network, contractAddress, nftStandard, assetIds);

  return {
    success: true,
    data: allNftsOfContract,
  };
};
