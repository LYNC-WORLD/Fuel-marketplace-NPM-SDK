/* Autogenerated file. Do not edit manually. */

/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/consistent-type-imports */

/*
  Fuels version: 0.94.1
*/

import { Contract, Interface } from "fuels";
import type {
  Provider,
  Account,
  StorageSlot,
  AbstractAddress,
  BigNumberish,
  BN,
  Bytes,
  FunctionFragment,
  InvokeFunction,
  StdString,
} from 'fuels';

import type { Option, Enum } from "./common";

export enum AccessErrorInput { NotOwner = 'NotOwner' };
export enum AccessErrorOutput { NotOwner = 'NotOwner' };
export type IdentityInput = Enum<{ Address: AddressInput, ContractId: ContractIdInput }>;
export type IdentityOutput = Enum<{ Address: AddressOutput, ContractId: ContractIdOutput }>;
export enum InitializationErrorInput { CannotReinitialized = 'CannotReinitialized' };
export enum InitializationErrorOutput { CannotReinitialized = 'CannotReinitialized' };
export type MetadataInput = Enum<{ B256: string, Bytes: Bytes, Int: BigNumberish, String: StdString }>;
export type MetadataOutput = Enum<{ B256: string, Bytes: Bytes, Int: BN, String: StdString }>;
export enum SetMetadataErrorInput { EmptyString = 'EmptyString', EmptyBytes = 'EmptyBytes' };
export enum SetMetadataErrorOutput { EmptyString = 'EmptyString', EmptyBytes = 'EmptyBytes' };
export type StateInput = Enum<{ Uninitialized: undefined, Initialized: IdentityInput, Revoked: undefined }>;
export type StateOutput = Enum<{ Uninitialized: void, Initialized: IdentityOutput, Revoked: void }>;

export type AddressInput = { bits: string };
export type AddressOutput = AddressInput;
export type AssetIdInput = { bits: string };
export type AssetIdOutput = AssetIdInput;
export type ContractIdInput = { bits: string };
export type ContractIdOutput = ContractIdInput;
export type OwnershipSetInput = { new_owner: IdentityInput };
export type OwnershipSetOutput = { new_owner: IdentityOutput };
export type SetMetadataEventInput = { asset: AssetIdInput, metadata: Option<MetadataInput>, key: StdString, sender: IdentityInput };
export type SetMetadataEventOutput = { asset: AssetIdOutput, metadata: Option<MetadataOutput>, key: StdString, sender: IdentityOutput };

export type SemiFungibleCreatorConfigurables = Partial<{
  DECIMALS: BigNumberish;
}>;

const abi = {
  "programType": "contract",
  "specVersion": "1",
  "encodingVersion": "1",
  "concreteTypes": [
    {
      "type": "()",
      "concreteTypeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
    },
    {
      "type": "b256",
      "concreteTypeId": "7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b"
    },
    {
      "type": "enum standards::src5::AccessError",
      "concreteTypeId": "3f702ea3351c9c1ece2b84048006c8034a24cbc2bad2e740d0412b4172951d3d",
      "metadataTypeId": 0
    },
    {
      "type": "enum standards::src5::State",
      "concreteTypeId": "192bc7098e2fe60635a9918afb563e4e5419d386da2bdbf0d716b4bc8549802c",
      "metadataTypeId": 1
    },
    {
      "type": "enum standards::src7::Metadata",
      "concreteTypeId": "f44b531974c6c04e17e66ab54e9868d230b9a24b3710b184399c363f0190180d",
      "metadataTypeId": 2
    },
    {
      "type": "enum std::identity::Identity",
      "concreteTypeId": "ab7cd04e05be58e3fc15d424c2c4a57f824a2a2d97d67252440a3925ebdc1335",
      "metadataTypeId": 3
    },
    {
      "type": "enum std::option::Option<enum standards::src7::Metadata>",
      "concreteTypeId": "fe93748eeb5d91a422fcea06e1b374216ad4ac0b2db01be0a6316af7f90dfa4f",
      "metadataTypeId": 4,
      "typeArguments": [
        "f44b531974c6c04e17e66ab54e9868d230b9a24b3710b184399c363f0190180d"
      ]
    },
    {
      "type": "enum std::option::Option<struct std::string::String>",
      "concreteTypeId": "7c06d929390a9aeeb8ffccf8173ac0d101a9976d99dda01cce74541a81e75ac0",
      "metadataTypeId": 4,
      "typeArguments": [
        "9a7f1d3e963c10e0a4ea70a8e20a4813d1dc5682e28f74cb102ae50d32f7f98c"
      ]
    },
    {
      "type": "enum std::option::Option<u64>",
      "concreteTypeId": "d852149004cc9ec0bbe7dc4e37bffea1d41469b759512b6136f2e865a4c06e7d",
      "metadataTypeId": 4,
      "typeArguments": [
        "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
      ]
    },
    {
      "type": "enum std::option::Option<u8>",
      "concreteTypeId": "2da102c46c7263beeed95818cd7bee801716ba8303dddafdcd0f6c9efda4a0f1",
      "metadataTypeId": 4,
      "typeArguments": [
        "c89951a24c6ca28c13fd1cfdc646b2b656d69e61a92b91023be7eb58eb914b6b"
      ]
    },
    {
      "type": "enum sway_libs::asset::errors::SetMetadataError",
      "concreteTypeId": "c6c09c148c1a1341c7ab81697b3545cc695fa67668a169cddc59790a9a0b6b44",
      "metadataTypeId": 5
    },
    {
      "type": "enum sway_libs::ownership::errors::InitializationError",
      "concreteTypeId": "1dfe7feadc1d9667a4351761230f948744068a090fe91b1bc6763a90ed5d3893",
      "metadataTypeId": 6
    },
    {
      "type": "struct standards::src7::SetMetadataEvent",
      "concreteTypeId": "f1b1cc90b68559aa4bb5cc58201ebb5c5402ed3aa28927140761e8ff7dcd3ab8",
      "metadataTypeId": 9
    },
    {
      "type": "struct std::asset_id::AssetId",
      "concreteTypeId": "c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974",
      "metadataTypeId": 11
    },
    {
      "type": "struct std::string::String",
      "concreteTypeId": "9a7f1d3e963c10e0a4ea70a8e20a4813d1dc5682e28f74cb102ae50d32f7f98c",
      "metadataTypeId": 15
    },
    {
      "type": "struct sway_libs::ownership::events::OwnershipSet",
      "concreteTypeId": "e1ef35033ea9d2956f17c3292dea4a46ce7d61fdf37bbebe03b7b965073f43b5",
      "metadataTypeId": 16
    },
    {
      "type": "u256",
      "concreteTypeId": "1b5759d94094368cfd443019e7ca5ec4074300e544e5ea993a979f5da627261e"
    },
    {
      "type": "u64",
      "concreteTypeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
    },
    {
      "type": "u8",
      "concreteTypeId": "c89951a24c6ca28c13fd1cfdc646b2b656d69e61a92b91023be7eb58eb914b6b"
    }
  ],
  "metadataTypes": [
    {
      "type": "enum standards::src5::AccessError",
      "metadataTypeId": 0,
      "components": [
        {
          "name": "NotOwner",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        }
      ]
    },
    {
      "type": "enum standards::src5::State",
      "metadataTypeId": 1,
      "components": [
        {
          "name": "Uninitialized",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        },
        {
          "name": "Initialized",
          "typeId": 3
        },
        {
          "name": "Revoked",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        }
      ]
    },
    {
      "type": "enum standards::src7::Metadata",
      "metadataTypeId": 2,
      "components": [
        {
          "name": "B256",
          "typeId": "7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b"
        },
        {
          "name": "Bytes",
          "typeId": 12
        },
        {
          "name": "Int",
          "typeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
        },
        {
          "name": "String",
          "typeId": 15
        }
      ]
    },
    {
      "type": "enum std::identity::Identity",
      "metadataTypeId": 3,
      "components": [
        {
          "name": "Address",
          "typeId": 10
        },
        {
          "name": "ContractId",
          "typeId": 14
        }
      ]
    },
    {
      "type": "enum std::option::Option",
      "metadataTypeId": 4,
      "components": [
        {
          "name": "None",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        },
        {
          "name": "Some",
          "typeId": 7
        }
      ],
      "typeParameters": [
        7
      ]
    },
    {
      "type": "enum sway_libs::asset::errors::SetMetadataError",
      "metadataTypeId": 5,
      "components": [
        {
          "name": "EmptyString",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        },
        {
          "name": "EmptyBytes",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        }
      ]
    },
    {
      "type": "enum sway_libs::ownership::errors::InitializationError",
      "metadataTypeId": 6,
      "components": [
        {
          "name": "CannotReinitialized",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        }
      ]
    },
    {
      "type": "generic T",
      "metadataTypeId": 7
    },
    {
      "type": "raw untyped ptr",
      "metadataTypeId": 8
    },
    {
      "type": "struct standards::src7::SetMetadataEvent",
      "metadataTypeId": 9,
      "components": [
        {
          "name": "asset",
          "typeId": 11
        },
        {
          "name": "metadata",
          "typeId": 4,
          "typeArguments": [
            {
              "name": "",
              "typeId": 2
            }
          ]
        },
        {
          "name": "key",
          "typeId": 15
        },
        {
          "name": "sender",
          "typeId": 3
        }
      ]
    },
    {
      "type": "struct std::address::Address",
      "metadataTypeId": 10,
      "components": [
        {
          "name": "bits",
          "typeId": "7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b"
        }
      ]
    },
    {
      "type": "struct std::asset_id::AssetId",
      "metadataTypeId": 11,
      "components": [
        {
          "name": "bits",
          "typeId": "7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b"
        }
      ]
    },
    {
      "type": "struct std::bytes::Bytes",
      "metadataTypeId": 12,
      "components": [
        {
          "name": "buf",
          "typeId": 13
        },
        {
          "name": "len",
          "typeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
        }
      ]
    },
    {
      "type": "struct std::bytes::RawBytes",
      "metadataTypeId": 13,
      "components": [
        {
          "name": "ptr",
          "typeId": 8
        },
        {
          "name": "cap",
          "typeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
        }
      ]
    },
    {
      "type": "struct std::contract_id::ContractId",
      "metadataTypeId": 14,
      "components": [
        {
          "name": "bits",
          "typeId": "7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b"
        }
      ]
    },
    {
      "type": "struct std::string::String",
      "metadataTypeId": 15,
      "components": [
        {
          "name": "bytes",
          "typeId": 12
        }
      ]
    },
    {
      "type": "struct sway_libs::ownership::events::OwnershipSet",
      "metadataTypeId": 16,
      "components": [
        {
          "name": "new_owner",
          "typeId": 3
        }
      ]
    }
  ],
  "functions": [
    {
      "inputs": [],
      "name": "get_ctr",
      "output": "1b5759d94094368cfd443019e7ca5ec4074300e544e5ea993a979f5da627261e",
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read"
          ]
        }
      ]
    },
    {
      "inputs": [
        {
          "name": "recipient",
          "concreteTypeId": "ab7cd04e05be58e3fc15d424c2c4a57f824a2a2d97d67252440a3925ebdc1335"
        },
        {
          "name": "uri",
          "concreteTypeId": "9a7f1d3e963c10e0a4ea70a8e20a4813d1dc5682e28f74cb102ae50d32f7f98c"
        },
        {
          "name": "amount",
          "concreteTypeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
        }
      ],
      "name": "mint",
      "output": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d",
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read",
            "write"
          ]
        }
      ]
    },
    {
      "inputs": [
        {
          "name": "asset",
          "concreteTypeId": "c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974"
        }
      ],
      "name": "decimals",
      "output": "2da102c46c7263beeed95818cd7bee801716ba8303dddafdcd0f6c9efda4a0f1",
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read"
          ]
        }
      ]
    },
    {
      "inputs": [
        {
          "name": "asset",
          "concreteTypeId": "c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974"
        }
      ],
      "name": "name",
      "output": "7c06d929390a9aeeb8ffccf8173ac0d101a9976d99dda01cce74541a81e75ac0",
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read"
          ]
        }
      ]
    },
    {
      "inputs": [
        {
          "name": "asset",
          "concreteTypeId": "c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974"
        }
      ],
      "name": "symbol",
      "output": "7c06d929390a9aeeb8ffccf8173ac0d101a9976d99dda01cce74541a81e75ac0",
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read"
          ]
        }
      ]
    },
    {
      "inputs": [],
      "name": "total_assets",
      "output": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0",
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read"
          ]
        }
      ]
    },
    {
      "inputs": [
        {
          "name": "asset",
          "concreteTypeId": "c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974"
        }
      ],
      "name": "total_supply",
      "output": "d852149004cc9ec0bbe7dc4e37bffea1d41469b759512b6136f2e865a4c06e7d",
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read"
          ]
        }
      ]
    },
    {
      "inputs": [],
      "name": "owner",
      "output": "192bc7098e2fe60635a9918afb563e4e5419d386da2bdbf0d716b4bc8549802c",
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read"
          ]
        }
      ]
    },
    {
      "inputs": [
        {
          "name": "asset",
          "concreteTypeId": "c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974"
        },
        {
          "name": "key",
          "concreteTypeId": "9a7f1d3e963c10e0a4ea70a8e20a4813d1dc5682e28f74cb102ae50d32f7f98c"
        }
      ],
      "name": "metadata",
      "output": "fe93748eeb5d91a422fcea06e1b374216ad4ac0b2db01be0a6316af7f90dfa4f",
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read"
          ]
        }
      ]
    },
    {
      "inputs": [
        {
          "name": "asset",
          "concreteTypeId": "c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974"
        }
      ],
      "name": "getSubId",
      "output": "7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b",
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read"
          ]
        }
      ]
    },
    {
      "inputs": [
        {
          "name": "owner",
          "concreteTypeId": "ab7cd04e05be58e3fc15d424c2c4a57f824a2a2d97d67252440a3925ebdc1335"
        }
      ],
      "name": "initialize",
      "output": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d",
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "write"
          ]
        }
      ]
    },
    {
      "inputs": [
        {
          "name": "asset_id",
          "concreteTypeId": "c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974"
        }
      ],
      "name": "uri",
      "output": "9a7f1d3e963c10e0a4ea70a8e20a4813d1dc5682e28f74cb102ae50d32f7f98c",
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read"
          ]
        }
      ]
    }
  ],
  "loggedTypes": [
    {
      "logId": "4571204900286667806",
      "concreteTypeId": "3f702ea3351c9c1ece2b84048006c8034a24cbc2bad2e740d0412b4172951d3d"
    },
    {
      "logId": "14321618427101975361",
      "concreteTypeId": "c6c09c148c1a1341c7ab81697b3545cc695fa67668a169cddc59790a9a0b6b44"
    },
    {
      "logId": "17415926155927968170",
      "concreteTypeId": "f1b1cc90b68559aa4bb5cc58201ebb5c5402ed3aa28927140761e8ff7dcd3ab8"
    },
    {
      "logId": "2161305517876418151",
      "concreteTypeId": "1dfe7feadc1d9667a4351761230f948744068a090fe91b1bc6763a90ed5d3893"
    },
    {
      "logId": "16280289466020123285",
      "concreteTypeId": "e1ef35033ea9d2956f17c3292dea4a46ce7d61fdf37bbebe03b7b965073f43b5"
    }
  ],
  "messagesTypes": [],
  "configurables": [
    {
      "name": "DECIMALS",
      "concreteTypeId": "c89951a24c6ca28c13fd1cfdc646b2b656d69e61a92b91023be7eb58eb914b6b",
      "offset": 36080
    }
  ]
};

const storageSlots: StorageSlot[] = [
  {
    "key": "4a85c26b85cd1ac73285aef6fa28d8adaa161639395a533f576358914e503aa0",
    "value": "0000000000000000000000000000000000000000000000000000000000000000"
  },
  {
    "key": "93b67ee4f0f76b71456fb4385c86aec15689e1ce5f6f6ac63b71716afa052998",
    "value": "0000000000000000000000000000000000000000000000000000000000000000"
  }
];

export class SemiFungibleCreatorInterface extends Interface {
  constructor() {
    super(abi);
  }

  declare functions: {
    get_ctr: FunctionFragment;
    mint: FunctionFragment;
    decimals: FunctionFragment;
    name: FunctionFragment;
    symbol: FunctionFragment;
    total_assets: FunctionFragment;
    total_supply: FunctionFragment;
    owner: FunctionFragment;
    metadata: FunctionFragment;
    getSubId: FunctionFragment;
    initialize: FunctionFragment;
    uri: FunctionFragment;
  };
}

export class SemiFungibleCreator extends Contract {
  static readonly abi = abi;
  static readonly storageSlots = storageSlots;

  declare interface: SemiFungibleCreatorInterface;
  declare functions: {
    get_ctr: InvokeFunction<[], BN>;
    mint: InvokeFunction<[recipient: IdentityInput, uri: StdString, amount: BigNumberish], void>;
    decimals: InvokeFunction<[asset: AssetIdInput], Option<number>>;
    name: InvokeFunction<[asset: AssetIdInput], Option<StdString>>;
    symbol: InvokeFunction<[asset: AssetIdInput], Option<StdString>>;
    total_assets: InvokeFunction<[], BN>;
    total_supply: InvokeFunction<[asset: AssetIdInput], Option<BN>>;
    owner: InvokeFunction<[], StateOutput>;
    metadata: InvokeFunction<[asset: AssetIdInput, key: StdString], Option<MetadataOutput>>;
    getSubId: InvokeFunction<[asset: AssetIdInput], string>;
    initialize: InvokeFunction<[owner: IdentityInput], void>;
    uri: InvokeFunction<[asset_id: AssetIdInput], StdString>;
  };

  constructor(
    id: string | AbstractAddress,
    accountOrProvider: Account | Provider,
  ) {
    super(id, abi, accountOrProvider);
  }
}
