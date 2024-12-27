import { bn } from 'fuels';
import { NftMarketplace } from '@/contracts/marketplace';
import { MarketplaceServices } from '@/interfaces';
import { checkArguments } from '@/utils';

export class CancelListingService extends MarketplaceServices {
  private readonly contract: NftMarketplace | undefined = undefined;
  private listingId: `0x${string}` | undefined = undefined;

  constructor(contract: NftMarketplace) {
    super();
    checkArguments([contract], 'arguments');
    this.contract = contract;
  }

  setProperties(listingId: `0x${string}`) {
    checkArguments([listingId], 'arguments');

    this.listingId = listingId;
    return this;
  }

  async execute() {
    checkArguments([this.contract, this.listingId], 'properties');

    try {
      const transactionAwaited = await this.contract!.functions.cancel_listing(bn(this.listingId)).call();
      const finalTransaction = await transactionAwaited.waitForResult();

      return finalTransaction;
    } catch (error: unknown) {
      console.error('Error Log: Error executing cancel listing transaction: ', { error });
      return error;
    }
  }
}
