import { Account, bn } from 'fuels';
import { NftMarketplace } from '@/contracts/marketplace';
import { MarketplaceErrorCodes } from '@/enums';
import { MarketplaceError, MarketplaceServices } from '@/interfaces';
import { checkArguments } from '@/utils';

export class BuyTokenService extends MarketplaceServices {
  private readonly contract: NftMarketplace | undefined = undefined;
  private readonly wallet: Account | undefined = undefined;
  private listingId: `0x${string}` = '0x';
  private quantity: number = 0;
  private pricePerItem: number = 0;

  constructor(contract: NftMarketplace, wallet: Account) {
    super();
    checkArguments([contract, wallet], 'arguments');

    this.contract = contract;
    this.wallet = wallet;
  }

  setProperties(listingId: `0x${string}`, quantity: number, pricePerItem: number) {
    checkArguments([listingId, quantity, pricePerItem], 'arguments');

    this.listingId = listingId;
    this.quantity = quantity;
    this.pricePerItem = pricePerItem;

    return this;
  }

  async execute() {
    checkArguments([this.contract, this.wallet, this.listingId, this.quantity, this.pricePerItem], 'properties');

    try {
      const balance = await this.wallet!.getBalance(this.wallet!.provider.getBaseAssetId());
      const totalOrderPrice = parseFloat(this.pricePerItem.toString()) * 10 ** 9 * parseInt(this.quantity.toString());

      if (parseFloat(balance.toString()) < totalOrderPrice) {
        throw new MarketplaceError(
          'Insufficient Balance - At least ${totalOrderPrice} ETH is required to complete this transaction.',
          MarketplaceErrorCodes.InsufficientBalance,
          { balance, pricePerItem: this.pricePerItem, quantity: this.quantity, totalOrderPrice }
        );
      }

      const transactionAwaited = await this.contract!.functions.buy_nft(bn(this.listingId), bn(this.quantity))
        .callParams({
          forward: [bn(totalOrderPrice), this.wallet!.provider.getBaseAssetId()],
        })
        .call();

      const finalTransaction = await transactionAwaited.waitForResult();

      return { success: true, data: finalTransaction };
    } catch (error: unknown) {
      console.error('Error Log: Error executing buy token transaction: ', { error });
      return { success: false, error };
    }
  }
}
