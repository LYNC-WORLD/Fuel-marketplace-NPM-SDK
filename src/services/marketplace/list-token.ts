import { bn } from 'fuels';
import { NftMarketplace, NFTStandardInput } from '@/contracts/marketplace';
import { MarketplaceServices } from '@/interfaces';
import { checkArguments } from '@/utils';

export class ListTokenService extends MarketplaceServices {
  private readonly contract: NftMarketplace | undefined = undefined;
  private assetId: `0x${string}` | undefined = undefined;
  private contractId: `0x${string}` | undefined = undefined;
  private subId: `0x${string}` | undefined = undefined;
  private price: number | undefined = undefined;
  private amount: number | undefined = undefined;
  private tokenStandard: NFTStandardInput | undefined = undefined;

  constructor(contract: NftMarketplace) {
    super();
    checkArguments([contract], 'arguments');
    this.contract = contract;
  }

  setProperties(
    assetId: `0x${string}`,
    contractId: `0x${string}`,
    subId: `0x${string}`,
    price: number,
    amount: number,
    tokenStandard: NFTStandardInput
  ) {
    checkArguments([assetId, contractId, subId, price, amount, tokenStandard], 'arguments');

    this.assetId = assetId;
    this.contractId = contractId;
    this.subId = subId;
    this.price = price;
    this.amount = amount;
    this.tokenStandard = tokenStandard;

    return this;
  }

  async execute() {
    checkArguments(
      [this.contract, this.assetId, this.contractId, this.subId, this.price, this.amount, this.tokenStandard],
      'properties'
    );

    try {
      const contractIdInput = {
        bits: this.contractId!,
      };

      const transactionAwaited = await this.contract!.functions.list_nft(
        contractIdInput,
        bn(this.price! * 10 ** 9),
        this.subId!,
        bn(this.amount),
        this.tokenStandard!
      )
        .callParams({
          forward: [bn(this.amount), this.assetId!],
        })
        .call();

      const finalTransaction = await transactionAwaited.waitForResult();

      if (!finalTransaction.transactionId) return null;
      return finalTransaction;
    } catch (error: unknown) {
      console.error('Error Log: Error executing list token transaction: ', { error });
      return error;
    }
  }
}
