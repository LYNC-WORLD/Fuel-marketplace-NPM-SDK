import { MarketplaceErrorCodes } from '@/enums';

export class MarketplaceError<TErrorData = unknown> extends Error {
  constructor(
    message: string,
    public code: MarketplaceErrorCodes,
    public errorData?: TErrorData
  ) {
    super(message);
    this.name = 'MarketplaceError';
  }
}
