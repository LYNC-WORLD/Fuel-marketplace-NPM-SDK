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

export const getDecimalPlaces = (n: number) => {
  const numStr = n.toString();

  if (numStr.includes('e-')) {
    const [base, exp] = numStr.split('e-');
    const decimals = parseInt(exp, 10) + (base.includes('.') ? base.split('.')[1].length : 0);

    return decimals;
  } else if (numStr.includes('e')) {
    const [_, exp] = numStr.split('e');

    return parseInt(exp, 10) * -1;
  } else if (numStr.includes('.')) {
    return numStr.split('.')[1].length;
  }

  return 0;
};

export const getFormattedPrice = (price: string) =>
  (parseFloat(price) / 10 ** 9).toFixed(getDecimalPlaces(parseFloat(price) / 10 ** 9));
