/* Autogenerated file. Do not edit manually. */

/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/consistent-type-imports */

/*
  Fuels version: 0.94.1
*/

import { ContractFactory, decompressBytecode } from 'fuels';
import type { Provider, Account, DeployContractOptions, DeployContractResult } from 'fuels';

import { SemiFungibleCreator } from './semi-fungible-creator';

const bytecode = decompressBytecode(
  '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'
);

export class SemiFungibleCreatorFactory extends ContractFactory {
  static readonly bytecode = bytecode;

  constructor(accountOrProvider: Account | Provider) {
    super(bytecode, SemiFungibleCreator.abi, accountOrProvider);
  }

  static async deploy(
    wallet: Account,
    options: DeployContractOptions = {}
  ): Promise<DeployContractResult<SemiFungibleCreator>> {
    const factory = new SemiFungibleCreatorFactory(wallet);

    return factory.deploy({
      storageSlots: SemiFungibleCreator.storageSlots,
      ...options,
    });
  }
}
