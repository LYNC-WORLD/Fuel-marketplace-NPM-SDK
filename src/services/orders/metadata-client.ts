import axios from 'axios';
import { Account, Provider } from 'fuels';
import { publicRpcs } from '@/configs';
import { NFTStandardOutput } from '@/contracts/marketplace';
import { NonFungibleCreator } from '@/contracts/non-fungible';
import { SemiFungibleCreator } from '@/contracts/semi-fungible';
import { AllowedProviders, MarketplaceErrorCodes, Networks } from '@/enums';
import { MarketplaceError } from '@/interfaces';
import { checkArguments } from '@/utils';

export class NftMetadataClient {
  private contract: NonFungibleCreator | SemiFungibleCreator | undefined = undefined;
  private readonly rpcURL: (typeof publicRpcs)[keyof typeof publicRpcs] | undefined = undefined;
  private provider: Account | Provider | undefined = undefined;

  constructor(network: Networks) {
    checkArguments([network], 'arguments');

    if (!publicRpcs[network])
      throw new MarketplaceError(
        `Marketplace config not found for network: ${network}`,
        MarketplaceErrorCodes.ValidationError
      );

    this.rpcURL = publicRpcs[network];
  }

  async useProvider(provider: AllowedProviders, userWallet: Account | undefined = undefined) {
    checkArguments([provider], 'arguments');

    if (provider === AllowedProviders.WalletProvider && !userWallet)
      throw new MarketplaceError(
        "Error setting NftMetadataClient: user wallet is required when provider type is 'wallet'.",
        MarketplaceErrorCodes.ValidationError
      );

    if (!this.rpcURL)
      throw new MarketplaceError(
        'Error setting NftMetadataClient: marketplaceConfig is missing.',
        MarketplaceErrorCodes.ValidationError
      );

    if (provider === AllowedProviders.FuelProvider) this.provider = await Provider.create(this.rpcURL);
    else this.provider = userWallet;

    return this;
  }

  setContract(marketplaceAddress: `0x${string}`, nftStandard: NFTStandardOutput) {
    checkArguments([marketplaceAddress, nftStandard], 'arguments');
    checkArguments([this.provider], 'properties');

    if (nftStandard === NFTStandardOutput.NFT)
      this.contract = new NonFungibleCreator(marketplaceAddress, this.provider!);
    else if (nftStandard === NFTStandardOutput.SEMI_FT)
      this.contract = new SemiFungibleCreator(marketplaceAddress, this.provider!);

    return this;
  }

  async getMetadata(assetId: `0x${string}`) {
    checkArguments([assetId], 'arguments');
    checkArguments([this.contract], 'properties');

    const assetIdInput = { bits: assetId };

    try {
      const metadata = await this.contract!.functions.metadata(assetIdInput, 'URI').get();
      const metadataURL = metadata.value?.String;

      if (!metadataURL)
        throw new MarketplaceError(
          'Error fetching NFT metadata: metadata URL is missing.',
          MarketplaceErrorCodes.ServerError
        );

      const { status, data } = await axios.get(metadataURL);
      if (status !== 200)
        throw new MarketplaceError('Network Error: Failed to fetch NFT metadata.', MarketplaceErrorCodes.NetworkError);

      return data;
    } catch (error: unknown) {
      console.error('Error Log: Error fetching NFT metadata: ', error);
      return error;
    }
  }
}
