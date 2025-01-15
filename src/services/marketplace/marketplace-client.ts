import { Account } from 'fuels';
import { NftMarketplace } from '@/contracts/marketplace';
import { MarketplaceErrorCodes, Networks } from '@/enums';
import { checkArguments } from '@/utils';
import { BuyTokenService } from './buy-token';
import { CancelListingService } from './cancel-listing';
import { ListTokenService } from './list-token';
import { ModifyListingService } from './modify-listing';
import { marketplaceAddresses } from '@/configs';
import { MarketplaceError } from '@/interfaces';

export class MarketplaceClient {
  private readonly contract: NftMarketplace | undefined = undefined;
  private readonly wallet: Account | undefined = undefined;

  constructor(network: Networks, wallet: Account) {
    checkArguments([network, wallet], 'arguments');

    if (!marketplaceAddresses[network])
      throw new MarketplaceError(
        'Invalid Network Argument: Marketplace address not found for network',
        MarketplaceErrorCodes.InvalidNetworkArgument,
        { network }
      );

    this.contract = new NftMarketplace(marketplaceAddresses[network], wallet);
    this.wallet = wallet;
  }

  useBuyTokenService() {
    checkArguments([this.contract, this.wallet], 'properties');
    return new BuyTokenService(this.contract!, this.wallet!);
  }

  useCancelListingService() {
    checkArguments([this.contract], 'properties');
    return new CancelListingService(this.contract!);
  }

  useListTokenService() {
    checkArguments([this.contract], 'properties');
    return new ListTokenService(this.contract!);
  }

  useModifyListingService() {
    checkArguments([this.contract], 'properties');
    return new ModifyListingService(this.contract!);
  }
}
