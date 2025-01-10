import { bn } from 'fuels';
import { NftMarketplace } from '@/contracts/marketplace';
import { MarketplaceServices } from '@/interfaces';
import { checkArguments } from '@/utils';

export class ModifyListingService extends MarketplaceServices {
  private readonly contract: NftMarketplace | undefined = undefined;
  private assetId: `0x${string}` | undefined = undefined;
  private listingId: `0x${string}` | undefined = undefined;
  private newPrice: number | undefined = undefined;
  private quantityToAdd: number | undefined = undefined;

  constructor(contract: NftMarketplace) {
    super();
    checkArguments([contract], 'arguments');
    this.contract = contract;
  }

  setProperties(listingId: `0x${string}`, newPrice: number, quantityToAdd: number, assetId?: `0x${string}`) {
    checkArguments([assetId, listingId, newPrice, quantityToAdd], 'arguments');

    this.assetId = assetId;
    this.listingId = listingId;
    this.newPrice = newPrice;
    this.quantityToAdd = quantityToAdd;

    return this;
  }

  async execute() {
    checkArguments([this.contract, this.listingId, this.newPrice, this.quantityToAdd], 'properties');

    try {
      const contractCall = this.contract!.functions.modify_listing(
        bn(this.listingId),
        bn(this.newPrice! * 10 ** 9),
        bn(this.quantityToAdd)
      );

      if (this.quantityToAdd! > 0 && this.assetId) {
        contractCall.callParams({
          forward: [bn(this.quantityToAdd), this.assetId],
        });
      }

      const transactionAwaited = await contractCall.call();
      const finalTransaction = await transactionAwaited.waitForResult();

      return finalTransaction;
    } catch (error: unknown) {
      console.error('Error Log: Error executing buy token transaction: ', { error });
      return error;
    }
  }
}
