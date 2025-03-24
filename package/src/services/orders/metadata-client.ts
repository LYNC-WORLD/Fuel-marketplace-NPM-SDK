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
        `Invalid Network Argument: RPC URL not found for network: ${network}`,
        MarketplaceErrorCodes.InvalidNetworkArgument
      );

    this.rpcURL = publicRpcs[network];
  }

  async useProvider(provider: AllowedProviders, userWallet: Account | undefined = undefined) {
    checkArguments([provider], 'arguments');

    if (provider === AllowedProviders.WalletProvider && !userWallet)
      throw new MarketplaceError(
        "Invalid Arguments Error: user wallet is required when provider type is 'wallet'.",
        MarketplaceErrorCodes.InvalidArgumentsError,
        { arguments: [provider, userWallet] }
      );

    if (!this.rpcURL)
      throw new MarketplaceError(
        'Property Undefined Error: RPC URL is missing in the properties.',
        MarketplaceErrorCodes.PropertyUndefinedError,
        { properties: [this.rpcURL] }
      );

    if (provider === AllowedProviders.FuelProvider) this.provider = await Provider.create(this.rpcURL);
    else this.provider = userWallet;

    return this;
  }

  setContract(contractAddress: `0x${string}`, nftStandard: NFTStandardOutput) {
    checkArguments([contractAddress, nftStandard], 'arguments');
    checkArguments([this.provider], 'properties');

    if (nftStandard === NFTStandardOutput.NFT) this.contract = new NonFungibleCreator(contractAddress, this.provider!);
    else if (nftStandard === NFTStandardOutput.SEMI_FT)
      this.contract = new SemiFungibleCreator(contractAddress, this.provider!);

    return this;
  }

  async getMetadata<TData = unknown>(assetId: string) {
    checkArguments([assetId], 'arguments');
    checkArguments([this.contract], 'properties');

    const assetIdInput = { bits: assetId };

    try {
      const metadata = await this.contract!.functions.metadata(assetIdInput, 'URI').get();
      const metadataURL = metadata.value?.String;

      if (!metadataURL)
        throw new MarketplaceError(
          'Server Error: Unable to get metadata URL from contract.',
          MarketplaceErrorCodes.ServerError
        );

      const { status, data } = await axios.get<TData>(metadataURL);
      if (status !== 200)
        throw new MarketplaceError(
          'Network Request Error: Failed to fetch NFT metadata.',
          MarketplaceErrorCodes.NetworkRequestError
        );

      return { success: true, data };
    } catch (error: unknown) {
      console.error('Error Log: Error fetching NFT metadata: ', error);
      return { success: false, error };
    }
  }
}
