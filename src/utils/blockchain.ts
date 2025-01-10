import axios from 'axios';
import { Account, Address, getMintedAssetId, isB256, Provider } from 'fuels';
import { MarketplaceErrorCodes, Networks } from '@/enums';
import { ContractBalancesQueryResponse, MarketplaceError, SubgraphErrorResponse, TokenDetails } from '@/interfaces';
import { publicRpcs } from '@/configs';
import { NonFungibleCreator } from '@/contracts/non-fungible';
import { SemiFungibleCreator } from '@/contracts/semi-fungible';
import { checkArguments } from './helpers';
import { parseError } from './parse-error';

export const getContractBalances = async (network: Networks, contractAddress: `0x${string}`) => {
  const CONTRACT_BALANCES_QUERY = `
    {
      contractBalances (
        filter: { contract: "${contractAddress}" }
        first: 1000
      ) {
        nodes {
          amount
          assetId
        }
      }
    }
  `;

  try {
    const { status, data } = await axios.post<SubgraphErrorResponse | ContractBalancesQueryResponse>(
      publicRpcs[network],
      { query: CONTRACT_BALANCES_QUERY },
      { headers: { 'Content-Type': 'application/json' } }
    );

    if (status !== 200 || 'errors' in data)
      throw new MarketplaceError(
        'Error fetching data from fuel network',
        MarketplaceErrorCodes.NetworkError,
        (data as SubgraphErrorResponse).errors
      );

    return { success: true, data: data.data.contractBalances.nodes };
  } catch (error: unknown) {
    console.error('Error Log: Error fetching data from fuel network: ', error);
    return { success: false, error };
  }
};

export const fetchAllNftOfContract = async (
  network: Networks,
  contractAddress: `0x${string}`,
  nftStandard: 'NFT' | 'SFT',
  assetIds: string[]
) => {
  let SUB_ID = '0x0000000000000000000000000000000000000000000000000000000000000000';
  const provider = await Provider.create(publicRpcs[network]);
  const allNftsOfContract: TokenDetails[] = [];

  const CreatorContract = nftStandard === 'NFT' ? NonFungibleCreator : SemiFungibleCreator;
  const contract = new CreatorContract(contractAddress, provider);

  for (const assetId of assetIds) {
    const metaData = await contract.functions.metadata({ bits: assetId }, 'URI').get();
    const name = await contract.functions.name({ bits: assetId }).get();
    const symbol = await contract.functions.symbol({ bits: assetId }).get();

    try {
      const subId = await contract.functions.getSubId({ bits: assetId }).get();
      SUB_ID = subId.value.toString();
    } catch (error: unknown) {
      console.error('Error Log: Error fetching subId: ', error);
    }

    const tokenDetails: TokenDetails = {
      name: '',
      image: '',
      assetMedia: '',
      description: '',
      contractAddress: contractAddress,
      assetId: assetId as `0x${string}`,
      tokenStandard: nftStandard,
      contractName: name.value?.toString() ?? '',
      contractSymbol: symbol.value?.toString() ?? '',
      tokenId: SUB_ID as `0x${string}`,
    };

    try {
      if (!metaData.value?.String) {
        throw new MarketplaceError(
          'Error fetching NFT metadata: metadata URL is missing.',
          MarketplaceErrorCodes.ServerError
        );
      }

      const { status, data } = await axios.get(metaData.value?.String);
      if (status !== 200)
        throw new MarketplaceError('Network Error: Failed to fetch NFT metadata.', MarketplaceErrorCodes.NetworkError);

      tokenDetails.name = data.name;
      tokenDetails.image = data.image;
      tokenDetails.assetMedia = data.assetMedia;
      tokenDetails.description = data.description;
    } catch (error: unknown) {
      console.error('Error Log: Error fetching NFT metadata: ', error);
    }

    allNftsOfContract.push(tokenDetails);
  }

  return allNftsOfContract;
};

export const checkNftOwnership = async (
  wallet: Account,
  contractAddress: `0x${string}`,
  subId: `0x${string}`,
  nftStandard: 'NFT' | 'SFT'
) => {
  checkArguments([wallet, contractAddress, subId, nftStandard], 'arguments');
  const errors: string[] = [];

  try {
    const isAddress = Address.fromB256(contractAddress.toString());
    if (!isAddress) {
      errors.push('Validation error: Invalid contract address');
    }

    const isSubId = isB256(subId);
    if (!isSubId) {
      errors.push('Validation error: Invalid Sub Id');
    }

    if (errors.length) {
      return { success: false, errors };
    }

    const assetId = getMintedAssetId(contractAddress, subId);
    const balance = await wallet.getBalance(assetId);

    const CreatorContract = nftStandard === 'NFT' ? NonFungibleCreator : SemiFungibleCreator;
    const contract = new CreatorContract(contractAddress, wallet);

    const decimals = await contract.functions.decimals({ bits: assetId }).get();
    if (decimals.value?.toString() !== '0') {
      errors.push(`Validation error: Invalid ${nftStandard} contract address`);
      return { success: false, errors };
    }

    const quantityValidation =
      nftStandard === 'NFT' ? Number(balance.toString()) === 1 : Number(balance.toString()) >= 1;

    if (!quantityValidation) {
      errors.push(`Validation error: Not a valid ${nftStandard} type`);
      return { success: false, errors };
    }

    return { success: true, data: { contractAddress, subId, nftStandard } };
  } catch (error: unknown) {
    console.error('Error Log: Error fetching owned token details: ', error);
    return { success: false, errors: [parseError(error)] };
  }
};
