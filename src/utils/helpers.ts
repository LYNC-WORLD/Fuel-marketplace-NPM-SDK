import { MarketplaceErrorCodes } from '@/enums';
import { MarketplaceError } from '@/interfaces';

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const checkArguments = (args: Array<unknown>, type: 'arguments' | 'properties') => {
  const validArgs = args.every((arg) => arg !== undefined && arg !== null);

  if (!validArgs) {
    const argsString = args.map((arg) => String(arg)).join(', ');
    const errorMsg =
      type === 'arguments'
        ? `Invalid argument${args.length > 1 ? 's' : ''} - ${argsString} ${args.length > 1 ? 'are' : 'is'} required.`
        : `${args.length > 1 ? 'Properties' : 'Property'} not found - ${argsString} ${args.length > 1 ? 'are' : 'is'} required.`;

    throw new MarketplaceError(errorMsg, MarketplaceErrorCodes.ValidationError);
  }
};
