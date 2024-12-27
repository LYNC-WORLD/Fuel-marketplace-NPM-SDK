export abstract class MarketplaceServices {
  abstract setProperties(...args: Array<unknown>): this;
  abstract execute(): Promise<unknown>;
}
