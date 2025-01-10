import { AbstractAddress, Account } from 'fuels';
import { NftMarketplace, NFTStandardInput } from '@/contracts/marketplace';
import { Networks } from '@/enums';
import { checkArguments } from '@/utils';
import { BuyTokenService } from './buy-token';
import { CancelListingService } from './cancel-listing';
import { ListTokenService } from './list-token';
import { ModifyListingService } from './modify-listing';

export class MarketplaceClient {
  private readonly contract: NftMarketplace | undefined = undefined;
  private readonly wallet: Account | undefined = undefined;
  private service: BuyTokenService | CancelListingService | ListTokenService | ModifyListingService | undefined =
    undefined;

  constructor(network: Networks, marketplaceAddress: string | AbstractAddress, wallet: Account) {
    checkArguments([network, marketplaceAddress, wallet], 'arguments');

    this.contract = new NftMarketplace(marketplaceAddress, wallet);
    this.wallet = wallet;
  }

  useService(service: 'buyTokenService' | 'cancelListingService' | 'listTokenService' | 'modifyListingService') {
    checkArguments([service], 'arguments');

    if (service === 'buyTokenService') {
      checkArguments([this.contract, this.wallet], 'properties');
      this.service = new BuyTokenService(this.contract!, this.wallet!);

      return this;
    }

    checkArguments([this.contract], 'properties');

    if (service === 'cancelListingService') this.service = new CancelListingService(this.contract!);
    if (service === 'listTokenService') this.service = new ListTokenService(this.contract!);
    if (service === 'modifyListingService') this.service = new ModifyListingService(this.contract!);

    return this;
  }

  setProperties(...properties: Array<unknown>) {
    checkArguments(properties, 'arguments');

    if (this.service instanceof BuyTokenService)
      this.service.setProperties(properties[0] as `0x${string}`, properties[1] as number, properties[2] as number);
    if (this.service instanceof CancelListingService) this.service.setProperties(properties[0] as `0x${string}`);
    if (this.service instanceof ListTokenService)
      this.service.setProperties(
        properties[0] as `0x${string}`,
        properties[1] as `0x${string}`,
        properties[2] as `0x${string}`,
        properties[3] as number,
        properties[4] as number,
        properties[5] as NFTStandardInput
      );
    if (this.service instanceof ModifyListingService)
      this.service.setProperties(
        properties[0] as `0x${string}`,
        properties[1] as `0x${string}`,
        properties[2] as number,
        properties[3] as number
      );

    return this;
  }

  executeTransaction() {
    checkArguments([this.service], 'properties');
    return this.service!.execute();
  }
}
