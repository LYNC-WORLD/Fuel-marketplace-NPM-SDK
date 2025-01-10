"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
var index_exports = {};
__export(index_exports, {
  AllowedProviders: () => AllowedProviders,
  MarketplaceClient: () => MarketplaceClient,
  MarketplaceErrorCodes: () => MarketplaceErrorCodes,
  Networks: () => Networks,
  checkNftOwnership: () => checkNftOwnership,
  searchMarketplace: () => searchMarketplace,
  useAllNftsInCollection: () => useAllNftsInCollection,
  useCollections: () => useCollections,
  useListings: () => useListings,
  useNft: () => useNft
});
module.exports = __toCommonJS(index_exports);

// src/hooks/use-all-nfts-in-collection.ts
var import_react = require("react");
var import_fuels6 = require("fuels");

// src/utils/blockchain.ts
var import_axios2 = __toESM(require("axios"));
var import_fuels5 = require("fuels");

// src/enums/index.ts
var AllowedProviders = /* @__PURE__ */ ((AllowedProviders2) => {
  AllowedProviders2["FuelProvider"] = "FuelProvider";
  AllowedProviders2["WalletProvider"] = "WalletProvider";
  return AllowedProviders2;
})(AllowedProviders || {});
var Networks = /* @__PURE__ */ ((Networks6) => {
  Networks6["Testnet"] = "testnet";
  return Networks6;
})(Networks || {});
var MarketplaceErrorCodes = /* @__PURE__ */ ((MarketplaceErrorCodes2) => {
  MarketplaceErrorCodes2["InsufficientBalance"] = "InsufficientBalance";
  MarketplaceErrorCodes2["NetworkError"] = "NetworkError";
  MarketplaceErrorCodes2["ServerError"] = "ServerError";
  MarketplaceErrorCodes2["ValidationError"] = "ValidationError";
  return MarketplaceErrorCodes2;
})(MarketplaceErrorCodes || {});

// src/interfaces/error.ts
var MarketplaceError = class extends Error {
  constructor(message, code, errorData) {
    super(message);
    this.code = code;
    this.errorData = errorData;
    this.name = "MarketplaceError";
  }
};

// src/interfaces/marketplace-services.ts
var MarketplaceServices = class {
};

// src/configs/blockchain.ts
var publicRpcs = {
  testnet: "https://testnet.fuel.network/v1/graphql"
};

// src/contracts/non-fungible/typegen/non-fungible-creator.ts
var import_fuels = require("fuels");
var abi = {
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
      "name": "token_uri",
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
      "offset": 36064
    }
  ]
};
var storageSlots = [
  {
    "key": "4a85c26b85cd1ac73285aef6fa28d8adaa161639395a533f576358914e503aa0",
    "value": "0000000000000000000000000000000000000000000000000000000000000000"
  },
  {
    "key": "93b67ee4f0f76b71456fb4385c86aec15689e1ce5f6f6ac63b71716afa052998",
    "value": "0000000000000000000000000000000000000000000000000000000000000000"
  }
];
var NonFungibleCreator = class extends import_fuels.Contract {
  constructor(id, accountOrProvider) {
    super(id, abi, accountOrProvider);
  }
};
NonFungibleCreator.abi = abi;
NonFungibleCreator.storageSlots = storageSlots;

// src/contracts/non-fungible/typegen/non-fungible-creator-factory.ts
var import_fuels2 = require("fuels");
var bytecode = (0, import_fuels2.decompressBytecode)(
  "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"
);
var _NonFungibleCreatorFactory = class _NonFungibleCreatorFactory extends import_fuels2.ContractFactory {
  constructor(accountOrProvider) {
    super(bytecode, NonFungibleCreator.abi, accountOrProvider);
  }
  static deploy(_0) {
    return __async(this, arguments, function* (wallet, options = {}) {
      const factory = new _NonFungibleCreatorFactory(wallet);
      return factory.deploy(__spreadValues({
        storageSlots: NonFungibleCreator.storageSlots
      }, options));
    });
  }
};
_NonFungibleCreatorFactory.bytecode = bytecode;
var NonFungibleCreatorFactory = _NonFungibleCreatorFactory;

// src/contracts/semi-fungible/typegen/semi-fungible-creator.ts
var import_fuels3 = require("fuels");
var abi2 = {
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
var storageSlots2 = [
  {
    "key": "4a85c26b85cd1ac73285aef6fa28d8adaa161639395a533f576358914e503aa0",
    "value": "0000000000000000000000000000000000000000000000000000000000000000"
  },
  {
    "key": "93b67ee4f0f76b71456fb4385c86aec15689e1ce5f6f6ac63b71716afa052998",
    "value": "0000000000000000000000000000000000000000000000000000000000000000"
  }
];
var SemiFungibleCreator = class extends import_fuels3.Contract {
  constructor(id, accountOrProvider) {
    super(id, abi2, accountOrProvider);
  }
};
SemiFungibleCreator.abi = abi2;
SemiFungibleCreator.storageSlots = storageSlots2;

// src/contracts/semi-fungible/typegen/semi-fungible-creator-factory.ts
var import_fuels4 = require("fuels");
var bytecode2 = (0, import_fuels4.decompressBytecode)(
  "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"
);
var _SemiFungibleCreatorFactory = class _SemiFungibleCreatorFactory extends import_fuels4.ContractFactory {
  constructor(accountOrProvider) {
    super(bytecode2, SemiFungibleCreator.abi, accountOrProvider);
  }
  static deploy(_0) {
    return __async(this, arguments, function* (wallet, options = {}) {
      const factory = new _SemiFungibleCreatorFactory(wallet);
      return factory.deploy(__spreadValues({
        storageSlots: SemiFungibleCreator.storageSlots
      }, options));
    });
  }
};
_SemiFungibleCreatorFactory.bytecode = bytecode2;
var SemiFungibleCreatorFactory = _SemiFungibleCreatorFactory;

// src/utils/helpers.ts
var sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
var checkArguments = (args, type) => {
  const validArgs = args.every((arg) => arg !== void 0 && arg !== null);
  if (!validArgs) {
    const argsString = args.map((arg) => String(arg)).join(", ");
    const errorMsg = type === "arguments" ? `Invalid argument${args.length > 1 ? "s" : ""} - ${argsString} ${args.length > 1 ? "are" : "is"} required.` : `${args.length > 1 ? "Properties" : "Property"} not found - ${argsString} ${args.length > 1 ? "are" : "is"} required.`;
    throw new MarketplaceError(errorMsg, "ValidationError" /* ValidationError */);
  }
};
var getDecimalPlaces = (n) => {
  const numStr = n.toString();
  if (numStr.includes("e-")) {
    const [base, exp] = numStr.split("e-");
    const decimals = parseInt(exp, 10) + (base.includes(".") ? base.split(".")[1].length : 0);
    return decimals;
  } else if (numStr.includes("e")) {
    const [_, exp] = numStr.split("e");
    return parseInt(exp, 10) * -1;
  } else if (numStr.includes(".")) {
    return numStr.split(".")[1].length;
  }
  return 0;
};
var getFormattedPrice = (price) => (parseFloat(price) / 10 ** 9).toFixed(getDecimalPlaces(parseFloat(price) / 10 ** 9));

// src/utils/parse-error.ts
var import_axios = require("axios");
var parseError = (error) => {
  if (error instanceof import_axios.AxiosError) {
    if (error.response) return error.response.data.message;
    if (error.request) return "Something went wrong!";
    return error.message;
  }
  if (error instanceof Error) return error.message;
  if (typeof error === "string" || typeof error === "number" || typeof error === "boolean") return String(error);
  if (error && typeof error === "object" && "message" in error && (typeof error.message === "string" || typeof error.message === "number" || typeof error.message === "boolean"))
    return String(error.message);
  return "Something went wrong!";
};

// src/utils/blockchain.ts
var getContractBalances = (network, contractAddress) => __async(void 0, null, function* () {
  const CONTRACT_BALANCES_QUERY = `
    {
      contractBalances (
        filter: { contract: "${contractAddress}" }
        first: 1000
      ) {
        nodes {
          amount
          assetId
        }
      }
    }
  `;
  try {
    const { status, data } = yield import_axios2.default.post(
      publicRpcs[network],
      { query: CONTRACT_BALANCES_QUERY },
      { headers: { "Content-Type": "application/json" } }
    );
    if (status !== 200 || "errors" in data)
      throw new MarketplaceError(
        "Error fetching data from fuel network",
        "NetworkError" /* NetworkError */,
        data.errors
      );
    return { success: true, data: data.data.contractBalances.nodes };
  } catch (error) {
    console.error("Error Log: Error fetching data from fuel network: ", error);
    return { success: false, error };
  }
});
var fetchAllNftOfContract = (network, contractAddress, nftStandard, assetIds) => __async(void 0, null, function* () {
  var _a, _b, _c, _d, _e, _f;
  let SUB_ID = "0x0000000000000000000000000000000000000000000000000000000000000000";
  const provider = yield import_fuels5.Provider.create(publicRpcs[network]);
  const allNftsOfContract = [];
  const CreatorContract = nftStandard === "NFT" ? NonFungibleCreator : SemiFungibleCreator;
  const contract = new CreatorContract(contractAddress, provider);
  for (const assetId of assetIds) {
    const metaData = yield contract.functions.metadata({ bits: assetId }, "URI").get();
    const name = yield contract.functions.name({ bits: assetId }).get();
    const symbol = yield contract.functions.symbol({ bits: assetId }).get();
    try {
      const subId = yield contract.functions.getSubId({ bits: assetId }).get();
      SUB_ID = subId.value.toString();
    } catch (error) {
      console.error("Error Log: Error fetching subId: ", error);
    }
    const tokenDetails = {
      name: "",
      image: "",
      assetMedia: "",
      description: "",
      contractAddress,
      assetId,
      tokenStandard: nftStandard,
      contractName: (_b = (_a = name.value) == null ? void 0 : _a.toString()) != null ? _b : "",
      contractSymbol: (_d = (_c = symbol.value) == null ? void 0 : _c.toString()) != null ? _d : "",
      tokenId: SUB_ID
    };
    try {
      if (!((_e = metaData.value) == null ? void 0 : _e.String)) {
        throw new MarketplaceError(
          "Error fetching NFT metadata: metadata URL is missing.",
          "ServerError" /* ServerError */
        );
      }
      const { status, data } = yield import_axios2.default.get((_f = metaData.value) == null ? void 0 : _f.String);
      if (status !== 200)
        throw new MarketplaceError("Network Error: Failed to fetch NFT metadata.", "NetworkError" /* NetworkError */);
      tokenDetails.name = data.name;
      tokenDetails.image = data.image;
      tokenDetails.assetMedia = data.assetMedia;
      tokenDetails.description = data.description;
    } catch (error) {
      console.error("Error Log: Error fetching NFT metadata: ", error);
    }
    allNftsOfContract.push(tokenDetails);
  }
  return allNftsOfContract;
});
var checkNftOwnership = (wallet, contractAddress, subId, nftStandard) => __async(void 0, null, function* () {
  var _a;
  checkArguments([wallet, contractAddress, subId, nftStandard], "arguments");
  const errors = [];
  try {
    const isAddress = import_fuels5.Address.fromB256(contractAddress.toString());
    if (!isAddress) {
      errors.push("Validation error: Invalid contract address");
    }
    const isSubId = (0, import_fuels5.isB256)(subId);
    if (!isSubId) {
      errors.push("Validation error: Invalid Sub Id");
    }
    if (errors.length) {
      return { success: false, errors };
    }
    const assetId = (0, import_fuels5.getMintedAssetId)(contractAddress, subId);
    const balance = yield wallet.getBalance(assetId);
    const CreatorContract = nftStandard === "NFT" ? NonFungibleCreator : SemiFungibleCreator;
    const contract = new CreatorContract(contractAddress, wallet);
    const decimals = yield contract.functions.decimals({ bits: assetId }).get();
    if (((_a = decimals.value) == null ? void 0 : _a.toString()) !== "0") {
      errors.push(`Validation error: Invalid ${nftStandard} contract address`);
      return { success: false, errors };
    }
    const quantityValidation = nftStandard === "NFT" ? Number(balance.toString()) === 1 : Number(balance.toString()) >= 1;
    if (!quantityValidation) {
      errors.push(`Validation error: Not a valid ${nftStandard} type`);
      return { success: false, errors };
    }
    return { success: true, data: { contractAddress, subId, nftStandard } };
  } catch (error) {
    console.error("Error Log: Error fetching owned token details: ", error);
    return { success: false, errors: [parseError(error)] };
  }
});

// src/hooks/use-all-nfts-in-collection.ts
var useAllNftsInCollection = ({
  network,
  nftStandard,
  contractAddress
}) => {
  const [fetching, setFetching] = (0, import_react.useState)(false);
  const [data, setData] = (0, import_react.useState)([]);
  const [error, setError] = (0, import_react.useState)(null);
  const fetchData = (0, import_react.useCallback)(() => __async(void 0, null, function* () {
    var _a;
    const isAddress = import_fuels6.Address.fromB256(contractAddress);
    if (!isAddress) {
      setData([]);
      setError([{ message: "Invalid contract address" }]);
      return;
    }
    setFetching(true);
    const contractBalances = yield getContractBalances(network, contractAddress);
    if (!contractBalances.success) {
      setData([]);
      setError(contractBalances.error);
      setFetching(false);
      return;
    }
    const assetIds = [];
    (_a = contractBalances.data) == null ? void 0 : _a.forEach((d) => {
      if (d.assetId !== "0x0000000000000000000000000000000000000000000000000000000000000000") {
        assetIds.push(d.assetId);
      }
    });
    const allNftsOfContract = yield fetchAllNftOfContract(network, contractAddress, nftStandard, assetIds);
    setData(allNftsOfContract);
    setError(null);
    setFetching(false);
  }), []);
  (0, import_react.useEffect)(() => {
    fetchData();
  }, [fetchData]);
  return { fetching, data, error };
};

// src/hooks/use-collections.ts
var import_react2 = require("react");

// src/services/subgraph/subgraph-client.ts
var import_axios3 = __toESM(require("axios"));
var _SubgraphClient = class _SubgraphClient {
  constructor(network, subgraphURL) {
    this.graphQLEndpoint = void 0;
    this.queryString = void 0;
    this.variables = void 0;
    checkArguments([network, subgraphURL], "arguments");
    this.graphQLEndpoint = subgraphURL;
    this.queryString = "";
    this.variables = {};
  }
  setQueryString(queryString) {
    checkArguments([queryString], "arguments");
    this.queryString = queryString;
    return this;
  }
  setVariables(variables) {
    checkArguments([variables], "arguments");
    this.variables = variables;
    return this;
  }
  query(dataKey) {
    return __async(this, null, function* () {
      checkArguments([this.graphQLEndpoint, this.queryString, this.variables], "properties");
      const currentTimestamp = (/* @__PURE__ */ new Date()).getTime();
      const timeDifference = currentTimestamp - _SubgraphClient.lastCallTimestamp;
      if (timeDifference <= 1e3) yield sleep(1e3 - timeDifference);
      try {
        const { status, data } = yield import_axios3.default.post(
          this.graphQLEndpoint,
          { query: this.queryString, variables: this.variables },
          { headers: { "Content-Type": "application/json" } }
        );
        _SubgraphClient.lastCallTimestamp = (/* @__PURE__ */ new Date()).getTime();
        if (status !== 200 || "errors" in data)
          throw new MarketplaceError(
            "Error fetching data from subgraph",
            "NetworkError" /* NetworkError */,
            data.errors
          );
        return { success: true, data: data.data[dataKey] };
      } catch (error) {
        console.error("Error Log: Error fetching data from subgraph: ", error);
        return { success: false, error };
      }
    });
  }
};
_SubgraphClient.lastCallTimestamp = 0;
var SubgraphClient = _SubgraphClient;

// src/services/orders/fetch-collections.ts
var FETCH_COLLECTION_QUERY = `
  query FetchCollection ($limit: Int = 100) {
    Collection (
      order_by: { db_write_timestamp: desc }
      limit: $limit
    ) {
      id
      nftType
      name
      symbol
      floorPrice
      listed
    }
  }
`;
var fetchCollections = (network, subgraphURL, limit = 100) => {
  checkArguments([network, subgraphURL], "arguments");
  const subgraphClient = new SubgraphClient(network, subgraphURL);
  return subgraphClient.setQueryString(FETCH_COLLECTION_QUERY).setVariables({
    limit
  }).query("Collection");
};

// src/services/orders/fetch-listings.ts
var FETCH_LISTINGS_QUERY = `
  query FetchListings ($status: status!, $limit: Int = 100) {
    Listing (
      where: {
        status: { _eq: $status }
      }
      order_by: { db_write_timestamp: desc }
      limit: $limit
    ) {
      id
      status
      nftAddress
      nftType
      tokenId
      asset_id
      quantity
      pricePerItem
      seller
    }
  }
`;
var fetchListings = (network, subgraphURL, limit = 100) => {
  checkArguments([network, subgraphURL], "arguments");
  const subgraphClient = new SubgraphClient(network, subgraphURL);
  return subgraphClient.setQueryString(FETCH_LISTINGS_QUERY).setVariables({
    status: "ACTIVE",
    limit
  }).query("Listing");
};

// src/services/orders/fetch-nft.ts
var FETCH_NFT_QUERY = `
  query FetchListings ($status: status!, $contractAddress: String!, $nftStandard: nftstandard!, $tokenId: String!, $limit: Int = 100) {
    Listing (
      where: {
        status: { _eq: $status }
        _and: [
          { nftAddress: { _eq: $contractAddress } }
          { nftType: { _eq: $nftStandard } }
          { tokenId: { _eq: $tokenId } }
        ]
      }
      order_by: { db_write_timestamp: desc }
      limit: $limit
    ) {
      id
      status
      nftAddress
      nftType
      tokenId
      asset_id
      quantity
      pricePerItem
      seller
    }
  }
`;
var fetchNft = (network, subgraphURL, contractAddress, nftStandard, tokenId, limit = 100) => {
  checkArguments([network, subgraphURL], "arguments");
  const subgraphClient = new SubgraphClient(network, subgraphURL);
  return subgraphClient.setQueryString(FETCH_NFT_QUERY).setVariables({
    status: "ACTIVE",
    contractAddress,
    nftStandard: nftStandard === "NFT" ? "NFT" : "SEMI_FT",
    tokenId,
    limit
  }).query("Listing");
};

// src/services/orders/metadata-client.ts
var import_axios4 = __toESM(require("axios"));
var import_fuels9 = require("fuels");

// src/contracts/marketplace/typegen/nft-marketplace.ts
var import_fuels7 = require("fuels");
var abi3 = {
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
      "type": "bool",
      "concreteTypeId": "b760f44fa5965c2474a3b471467a22c43185152129295af588b022ae50b50903"
    },
    {
      "type": "enum interface::Error",
      "concreteTypeId": "0fe12ec05d225d08dc236ce4be213977fa8c3aeb6ecf2ea110db0c98562addbf",
      "metadataTypeId": 0
    },
    {
      "type": "enum interface::NFTStandard",
      "concreteTypeId": "c984e6ce5860713c46055c41b15e3208ac989f19f8cb28a14907056bfce9181d",
      "metadataTypeId": 1
    },
    {
      "type": "enum standards::src5::AccessError",
      "concreteTypeId": "3f702ea3351c9c1ece2b84048006c8034a24cbc2bad2e740d0412b4172951d3d",
      "metadataTypeId": 2
    },
    {
      "type": "enum standards::src5::State",
      "concreteTypeId": "192bc7098e2fe60635a9918afb563e4e5419d386da2bdbf0d716b4bc8549802c",
      "metadataTypeId": 3
    },
    {
      "type": "enum std::identity::Identity",
      "concreteTypeId": "ab7cd04e05be58e3fc15d424c2c4a57f824a2a2d97d67252440a3925ebdc1335",
      "metadataTypeId": 4
    },
    {
      "type": "enum std::option::Option<struct interface::Listing>",
      "concreteTypeId": "8fed1de5de157d3c4f4ef8394d0836a50ae9da0050753b77bf2d9cdd0bc97463",
      "metadataTypeId": 5,
      "typeArguments": [
        "f1bbda08bb538e8732336deb2af25888830f411eec649e37dcf67e9be6b49f2b"
      ]
    },
    {
      "type": "enum sway_libs::ownership::errors::InitializationError",
      "concreteTypeId": "1dfe7feadc1d9667a4351761230f948744068a090fe91b1bc6763a90ed5d3893",
      "metadataTypeId": 6
    },
    {
      "type": "enum sway_libs::reentrancy::errors::ReentrancyError",
      "concreteTypeId": "4d216c57b3357523323f59401c7355785b41bdf832f6e1106272186b94797038",
      "metadataTypeId": 7
    },
    {
      "type": "struct interface::Buyer",
      "concreteTypeId": "57de938934a0262bf8ccf0dbac460bfa06d07a64e4309d3a55ad47dfdd9e985d",
      "metadataTypeId": 10
    },
    {
      "type": "struct interface::Listing",
      "concreteTypeId": "f1bbda08bb538e8732336deb2af25888830f411eec649e37dcf67e9be6b49f2b",
      "metadataTypeId": 11
    },
    {
      "type": "struct interface::OrderBuy",
      "concreteTypeId": "41809b993a2b7998d3c394b0c76f825a59775024524a1697848ea98580c2ee7e",
      "metadataTypeId": 12
    },
    {
      "type": "struct interface::OrderCancelled",
      "concreteTypeId": "24189fa21e2a019b0768ddbe2100cec46e9994f7cdde3c72e535885d6006494e",
      "metadataTypeId": 13
    },
    {
      "type": "struct interface::OrderListed",
      "concreteTypeId": "691e7123048b74c552d3a53e73e348d426325c390be7bd4ef2297af30436a5b8",
      "metadataTypeId": 14
    },
    {
      "type": "struct interface::OrderUpdated",
      "concreteTypeId": "52850bd86d8b56413b4a88f152bd3e544cc3f2af89798dd7cce0406fbde987ef",
      "metadataTypeId": 15
    },
    {
      "type": "struct std::asset_id::AssetId",
      "concreteTypeId": "c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974",
      "metadataTypeId": 17
    },
    {
      "type": "struct std::contract_id::ContractId",
      "concreteTypeId": "29c10735d33b5159f0c71ee1dbd17b36a3e69e41f00fab0d42e1bd9f428d8a54",
      "metadataTypeId": 18
    },
    {
      "type": "struct std::vec::Vec<struct interface::Buyer>",
      "concreteTypeId": "4fa2e5c5646bbc9771c1436b7542e53bfb9eec7c476b03bb49659bb3acccc78b",
      "metadataTypeId": 20,
      "typeArguments": [
        "57de938934a0262bf8ccf0dbac460bfa06d07a64e4309d3a55ad47dfdd9e985d"
      ]
    },
    {
      "type": "struct sway_libs::ownership::events::OwnershipSet",
      "concreteTypeId": "e1ef35033ea9d2956f17c3292dea4a46ce7d61fdf37bbebe03b7b965073f43b5",
      "metadataTypeId": 21
    },
    {
      "type": "struct sway_libs::ownership::events::OwnershipTransferred",
      "concreteTypeId": "b3fffbcb3158d7c010c31b194b60fb7857adb4ad61bdcf4b8b42958951d9f308",
      "metadataTypeId": 22
    },
    {
      "type": "u256",
      "concreteTypeId": "1b5759d94094368cfd443019e7ca5ec4074300e544e5ea993a979f5da627261e"
    },
    {
      "type": "u64",
      "concreteTypeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
    }
  ],
  "metadataTypes": [
    {
      "type": "enum interface::Error",
      "metadataTypeId": 0,
      "components": [
        {
          "name": "CommisionAlwaysLessThan10",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        },
        {
          "name": "NotValidNFTContractId",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        },
        {
          "name": "CallerNotNFTOwner",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        },
        {
          "name": "OwnerNotInitialized",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        },
        {
          "name": "AmountInvalid",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        },
        {
          "name": "PriceIsInvalid",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        },
        {
          "name": "InvalidContractIdOrSubId",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        },
        {
          "name": "NFTInvalid",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        },
        {
          "name": "NFTAlreadyListed",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        },
        {
          "name": "InvalidListingId",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        },
        {
          "name": "OrderClosed",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        },
        {
          "name": "NFTNotListed",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        },
        {
          "name": "SellerCannotBuy",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        },
        {
          "name": "InvalidQuantity",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        },
        {
          "name": "NFTQuantityInvalid",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        },
        {
          "name": "InsufficientPayment",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        },
        {
          "name": "AdminNotInitialized",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        },
        {
          "name": "OnlySeller",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        },
        {
          "name": "NFTQuantityCannotChange",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        },
        {
          "name": "InsufficientAssetAmount",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        },
        {
          "name": "ModifyListingFailed",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        }
      ]
    },
    {
      "type": "enum interface::NFTStandard",
      "metadataTypeId": 1,
      "components": [
        {
          "name": "NFT",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        },
        {
          "name": "SEMI_FT",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        }
      ]
    },
    {
      "type": "enum standards::src5::AccessError",
      "metadataTypeId": 2,
      "components": [
        {
          "name": "NotOwner",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        }
      ]
    },
    {
      "type": "enum standards::src5::State",
      "metadataTypeId": 3,
      "components": [
        {
          "name": "Uninitialized",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        },
        {
          "name": "Initialized",
          "typeId": 4
        },
        {
          "name": "Revoked",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        }
      ]
    },
    {
      "type": "enum std::identity::Identity",
      "metadataTypeId": 4,
      "components": [
        {
          "name": "Address",
          "typeId": 16
        },
        {
          "name": "ContractId",
          "typeId": 18
        }
      ]
    },
    {
      "type": "enum std::option::Option",
      "metadataTypeId": 5,
      "components": [
        {
          "name": "None",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        },
        {
          "name": "Some",
          "typeId": 8
        }
      ],
      "typeParameters": [
        8
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
      "type": "enum sway_libs::reentrancy::errors::ReentrancyError",
      "metadataTypeId": 7,
      "components": [
        {
          "name": "NonReentrant",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        }
      ]
    },
    {
      "type": "generic T",
      "metadataTypeId": 8
    },
    {
      "type": "raw untyped ptr",
      "metadataTypeId": 9
    },
    {
      "type": "struct interface::Buyer",
      "metadataTypeId": 10,
      "components": [
        {
          "name": "buyer",
          "typeId": 4
        },
        {
          "name": "quantity_bought",
          "typeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
        },
        {
          "name": "buy_price_per_item",
          "typeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
        }
      ]
    },
    {
      "type": "struct interface::Listing",
      "metadataTypeId": 11,
      "components": [
        {
          "name": "order_id",
          "typeId": "1b5759d94094368cfd443019e7ca5ec4074300e544e5ea993a979f5da627261e"
        },
        {
          "name": "seller",
          "typeId": 4
        },
        {
          "name": "nft_contract",
          "typeId": 18
        },
        {
          "name": "asset_id",
          "typeId": 17
        },
        {
          "name": "token_id",
          "typeId": "7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b"
        },
        {
          "name": "price",
          "typeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
        },
        {
          "name": "quantity",
          "typeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
        },
        {
          "name": "standard",
          "typeId": 1
        }
      ]
    },
    {
      "type": "struct interface::OrderBuy",
      "metadataTypeId": 12,
      "components": [
        {
          "name": "buyer",
          "typeId": 4
        },
        {
          "name": "order",
          "typeId": 11
        }
      ]
    },
    {
      "type": "struct interface::OrderCancelled",
      "metadataTypeId": 13,
      "components": [
        {
          "name": "order",
          "typeId": 11
        }
      ]
    },
    {
      "type": "struct interface::OrderListed",
      "metadataTypeId": 14,
      "components": [
        {
          "name": "order",
          "typeId": 11
        }
      ]
    },
    {
      "type": "struct interface::OrderUpdated",
      "metadataTypeId": 15,
      "components": [
        {
          "name": "order",
          "typeId": 11
        }
      ]
    },
    {
      "type": "struct std::address::Address",
      "metadataTypeId": 16,
      "components": [
        {
          "name": "bits",
          "typeId": "7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b"
        }
      ]
    },
    {
      "type": "struct std::asset_id::AssetId",
      "metadataTypeId": 17,
      "components": [
        {
          "name": "bits",
          "typeId": "7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b"
        }
      ]
    },
    {
      "type": "struct std::contract_id::ContractId",
      "metadataTypeId": 18,
      "components": [
        {
          "name": "bits",
          "typeId": "7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b"
        }
      ]
    },
    {
      "type": "struct std::vec::RawVec",
      "metadataTypeId": 19,
      "components": [
        {
          "name": "ptr",
          "typeId": 9
        },
        {
          "name": "cap",
          "typeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
        }
      ],
      "typeParameters": [
        8
      ]
    },
    {
      "type": "struct std::vec::Vec",
      "metadataTypeId": 20,
      "components": [
        {
          "name": "buf",
          "typeId": 19,
          "typeArguments": [
            {
              "name": "",
              "typeId": 8
            }
          ]
        },
        {
          "name": "len",
          "typeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
        }
      ],
      "typeParameters": [
        8
      ]
    },
    {
      "type": "struct sway_libs::ownership::events::OwnershipSet",
      "metadataTypeId": 21,
      "components": [
        {
          "name": "new_owner",
          "typeId": 4
        }
      ]
    },
    {
      "type": "struct sway_libs::ownership::events::OwnershipTransferred",
      "metadataTypeId": 22,
      "components": [
        {
          "name": "new_owner",
          "typeId": 4
        },
        {
          "name": "previous_owner",
          "typeId": 4
        }
      ]
    }
  ],
  "functions": [
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
          "name": "listing_id",
          "concreteTypeId": "1b5759d94094368cfd443019e7ca5ec4074300e544e5ea993a979f5da627261e"
        },
        {
          "name": "quantity",
          "concreteTypeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
        }
      ],
      "name": "buy_nft",
      "output": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d",
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read",
            "write"
          ]
        },
        {
          "name": "payable",
          "arguments": []
        }
      ]
    },
    {
      "inputs": [
        {
          "name": "listing_id",
          "concreteTypeId": "1b5759d94094368cfd443019e7ca5ec4074300e544e5ea993a979f5da627261e"
        }
      ],
      "name": "cancel_listing",
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
          "name": "new_owner",
          "concreteTypeId": "ab7cd04e05be58e3fc15d424c2c4a57f824a2a2d97d67252440a3925ebdc1335"
        }
      ],
      "name": "change_admin",
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
      "inputs": [],
      "name": "get_admin_fee",
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
          "name": "listing_id",
          "concreteTypeId": "1b5759d94094368cfd443019e7ca5ec4074300e544e5ea993a979f5da627261e"
        }
      ],
      "name": "get_buyers",
      "output": "4fa2e5c5646bbc9771c1436b7542e53bfb9eec7c476b03bb49659bb3acccc78b",
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
          "name": "contract_id",
          "concreteTypeId": "29c10735d33b5159f0c71ee1dbd17b36a3e69e41f00fab0d42e1bd9f428d8a54"
        }
      ],
      "name": "get_commission_percentage",
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
      "inputs": [],
      "name": "get_current_listing_id",
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
          "name": "listing_id",
          "concreteTypeId": "1b5759d94094368cfd443019e7ca5ec4074300e544e5ea993a979f5da627261e"
        }
      ],
      "name": "get_listing",
      "output": "8fed1de5de157d3c4f4ef8394d0836a50ae9da0050753b77bf2d9cdd0bc97463",
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
          "name": "user",
          "concreteTypeId": "ab7cd04e05be58e3fc15d424c2c4a57f824a2a2d97d67252440a3925ebdc1335"
        },
        {
          "name": "contract_id",
          "concreteTypeId": "29c10735d33b5159f0c71ee1dbd17b36a3e69e41f00fab0d42e1bd9f428d8a54"
        },
        {
          "name": "asset",
          "concreteTypeId": "c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974"
        }
      ],
      "name": "has_user_listed_nft_before",
      "output": "b760f44fa5965c2474a3b471467a22c43185152129295af588b022ae50b50903",
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
          "name": "admin",
          "concreteTypeId": "ab7cd04e05be58e3fc15d424c2c4a57f824a2a2d97d67252440a3925ebdc1335"
        }
      ],
      "name": "init",
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
          "name": "nft_contract_id",
          "concreteTypeId": "29c10735d33b5159f0c71ee1dbd17b36a3e69e41f00fab0d42e1bd9f428d8a54"
        },
        {
          "name": "price",
          "concreteTypeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
        },
        {
          "name": "token_id",
          "concreteTypeId": "7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b"
        },
        {
          "name": "quantity",
          "concreteTypeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
        },
        {
          "name": "standard",
          "concreteTypeId": "c984e6ce5860713c46055c41b15e3208ac989f19f8cb28a14907056bfce9181d"
        }
      ],
      "name": "list_nft",
      "output": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d",
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read",
            "write"
          ]
        },
        {
          "name": "payable",
          "arguments": []
        }
      ]
    },
    {
      "inputs": [
        {
          "name": "listing_id",
          "concreteTypeId": "1b5759d94094368cfd443019e7ca5ec4074300e544e5ea993a979f5da627261e"
        },
        {
          "name": "new_price",
          "concreteTypeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
        },
        {
          "name": "qtyToAdd",
          "concreteTypeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
        }
      ],
      "name": "modify_listing",
      "output": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d",
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read",
            "write"
          ]
        },
        {
          "name": "payable",
          "arguments": []
        }
      ]
    },
    {
      "inputs": [
        {
          "name": "fee",
          "concreteTypeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
        }
      ],
      "name": "set_admin_fee",
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
          "name": "nft_contract_id",
          "concreteTypeId": "29c10735d33b5159f0c71ee1dbd17b36a3e69e41f00fab0d42e1bd9f428d8a54"
        },
        {
          "name": "percentage",
          "concreteTypeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
        },
        {
          "name": "asset_id",
          "concreteTypeId": "c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974"
        }
      ],
      "name": "set_commission_percentage",
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
      "inputs": [],
      "name": "withdraw_funds",
      "output": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d",
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
      "logId": "5557842539076482339",
      "concreteTypeId": "4d216c57b3357523323f59401c7355785b41bdf832f6e1106272186b94797038"
    },
    {
      "logId": "1144247184059948296",
      "concreteTypeId": "0fe12ec05d225d08dc236ce4be213977fa8c3aeb6ecf2ea110db0c98562addbf"
    },
    {
      "logId": "4719943491892509080",
      "concreteTypeId": "41809b993a2b7998d3c394b0c76f825a59775024524a1697848ea98580c2ee7e"
    },
    {
      "logId": "2601004303446049179",
      "concreteTypeId": "24189fa21e2a019b0768ddbe2100cec46e9994f7cdde3c72e535885d6006494e"
    },
    {
      "logId": "4571204900286667806",
      "concreteTypeId": "3f702ea3351c9c1ece2b84048006c8034a24cbc2bad2e740d0412b4172951d3d"
    },
    {
      "logId": "12970362301975156672",
      "concreteTypeId": "b3fffbcb3158d7c010c31b194b60fb7857adb4ad61bdcf4b8b42958951d9f308"
    },
    {
      "logId": "2161305517876418151",
      "concreteTypeId": "1dfe7feadc1d9667a4351761230f948744068a090fe91b1bc6763a90ed5d3893"
    },
    {
      "logId": "16280289466020123285",
      "concreteTypeId": "e1ef35033ea9d2956f17c3292dea4a46ce7d61fdf37bbebe03b7b965073f43b5"
    },
    {
      "logId": "7574616018497795269",
      "concreteTypeId": "691e7123048b74c552d3a53e73e348d426325c390be7bd4ef2297af30436a5b8"
    },
    {
      "logId": "5946171907191297601",
      "concreteTypeId": "52850bd86d8b56413b4a88f152bd3e544cc3f2af89798dd7cce0406fbde987ef"
    }
  ],
  "messagesTypes": [],
  "configurables": []
};
var storageSlots3 = [
  {
    "key": "431a0ffd43c2d6ce5c6c6b925f2cee1be3bcb0dc951e0ff636e977eef83d618d",
    "value": "0000000000000000000000000000000000000000000000000000000000000000"
  },
  {
    "key": "b95b87d7f0f5f3b1a266dcf85e22f058315ecd0b4a6ac991f051d6a1b7c5f8fd",
    "value": "0000000000000000000000000000000000000000000000000000000000000000"
  }
];
var NftMarketplace = class extends import_fuels7.Contract {
  constructor(id, accountOrProvider) {
    super(id, abi3, accountOrProvider);
  }
};
NftMarketplace.abi = abi3;
NftMarketplace.storageSlots = storageSlots3;

// src/contracts/marketplace/typegen/nft-marketplace-factory.ts
var import_fuels8 = require("fuels");
var bytecode3 = (0, import_fuels8.decompressBytecode)(
  "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"
);
var _NftMarketplaceFactory = class _NftMarketplaceFactory extends import_fuels8.ContractFactory {
  constructor(accountOrProvider) {
    super(bytecode3, NftMarketplace.abi, accountOrProvider);
  }
  static deploy(_0) {
    return __async(this, arguments, function* (wallet, options = {}) {
      const factory = new _NftMarketplaceFactory(wallet);
      return factory.deploy(__spreadValues({
        storageSlots: NftMarketplace.storageSlots
      }, options));
    });
  }
};
_NftMarketplaceFactory.bytecode = bytecode3;
var NftMarketplaceFactory = _NftMarketplaceFactory;

// src/services/orders/metadata-client.ts
var NftMetadataClient = class {
  constructor(network) {
    this.contract = void 0;
    this.rpcURL = void 0;
    this.provider = void 0;
    checkArguments([network], "arguments");
    if (!publicRpcs[network])
      throw new MarketplaceError(
        `Marketplace config not found for network: ${network}`,
        "ValidationError" /* ValidationError */
      );
    this.rpcURL = publicRpcs[network];
  }
  useProvider(provider, userWallet = void 0) {
    return __async(this, null, function* () {
      checkArguments([provider], "arguments");
      if (provider === "WalletProvider" /* WalletProvider */ && !userWallet)
        throw new MarketplaceError(
          "Error setting NftMetadataClient: user wallet is required when provider type is 'wallet'.",
          "ValidationError" /* ValidationError */
        );
      if (!this.rpcURL)
        throw new MarketplaceError(
          "Error setting NftMetadataClient: marketplaceConfig is missing.",
          "ValidationError" /* ValidationError */
        );
      if (provider === "FuelProvider" /* FuelProvider */) this.provider = yield import_fuels9.Provider.create(this.rpcURL);
      else this.provider = userWallet;
      return this;
    });
  }
  setContract(contractAddress, nftStandard) {
    checkArguments([contractAddress, nftStandard], "arguments");
    checkArguments([this.provider], "properties");
    if (nftStandard === "NFT" /* NFT */) this.contract = new NonFungibleCreator(contractAddress, this.provider);
    else if (nftStandard === "SEMI_FT" /* SEMI_FT */)
      this.contract = new SemiFungibleCreator(contractAddress, this.provider);
    return this;
  }
  getMetadata(assetId) {
    return __async(this, null, function* () {
      var _a;
      checkArguments([assetId], "arguments");
      checkArguments([this.contract], "properties");
      const assetIdInput = { bits: assetId };
      try {
        const metadata = yield this.contract.functions.metadata(assetIdInput, "URI").get();
        const metadataURL = (_a = metadata.value) == null ? void 0 : _a.String;
        if (!metadataURL)
          throw new MarketplaceError(
            "Error fetching NFT metadata: metadata URL is missing.",
            "ServerError" /* ServerError */
          );
        const { status, data } = yield import_axios4.default.get(metadataURL);
        if (status !== 200)
          throw new MarketplaceError("Network Error: Failed to fetch NFT metadata.", "NetworkError" /* NetworkError */);
        return { success: true, data };
      } catch (error) {
        console.error("Error Log: Error fetching NFT metadata: ", error);
        return { success: false, error };
      }
    });
  }
};

// src/services/orders/search-marketplace.ts
var SEARCH_MARKETPLACE_QUERY = `
  query SearchMarketplace($searchString: String!, $limit: Int = 100) {
    Listing(
      where: {
        status: { _eq: "ACTIVE" }
        _or: [
          { nftAddress: { _ilike: $searchString } }
          { tokenId: { _ilike: $searchString } }
          { asset_id: { _ilike: $searchString } }
          { seller: { _ilike: $searchString } }
        ]
      }
      order_by: { db_write_timestamp: desc }
      limit: $limit
    ) {
      id
      status
      nftAddress
      nftType
      tokenId
      asset_id
      quantity
      pricePerItem
      seller
      }
  }
`;
var searchMarketplace = (network, subgraphURL, searchString, limit = 100) => __async(void 0, null, function* () {
  checkArguments([network, searchString], "arguments");
  const subgraphClient = new SubgraphClient(network, subgraphURL);
  const response = yield subgraphClient.setQueryString(SEARCH_MARKETPLACE_QUERY).setVariables({
    searchString: `%${searchString}%`,
    limit
  }).query("Listing");
  if (!response.success || !response.data) return response;
  const searchData = response.data;
  const meteDataClient = new NftMetadataClient(network);
  const metaDataClientWithProvider = yield meteDataClient.useProvider("FuelProvider" /* FuelProvider */);
  const formattedData = searchData.map(
    (d) => ({
      itemId: Number(d.id),
      isActive: d.status === "ACTIVE",
      nftAddress: d.nftAddress,
      itemStandard: d.nftType === "NFT" ? "NFT" : "SFT",
      tokenId: d.tokenId,
      assetId: d.asset_id,
      itemQuantity: parseInt(d.quantity),
      pricePerItem: getFormattedPrice(d.pricePerItem),
      sellerAddress: d.seller,
      itemName: "",
      itemImage: "",
      itemMedia: ""
    })
  );
  const fetchMetadata = (d) => {
    return metaDataClientWithProvider.setContract(d.nftAddress, d.itemStandard === "NFT" ? "NFT" /* NFT */ : "SEMI_FT" /* SEMI_FT */).getMetadata(d.assetId);
  };
  const searchMetadataPromises = yield Promise.allSettled(formattedData.map(fetchMetadata));
  const searchResultsWithMetadata = searchMetadataPromises.map((p, i) => {
    var _a, _b, _c, _d, _e, _f;
    const result = formattedData[i];
    if (p.status === "fulfilled") {
      const metadata = p.value;
      if (metadata.success) {
        result.itemName = (_b = (_a = metadata.data) == null ? void 0 : _a.name) != null ? _b : "";
        result.itemImage = (_d = (_c = metadata.data) == null ? void 0 : _c.image) != null ? _d : "";
        result.itemMedia = (_f = (_e = metadata.data) == null ? void 0 : _e.assetMedia) != null ? _f : "";
      }
    }
    return result;
  });
  return { success: true, data: searchResultsWithMetadata };
});

// src/hooks/use-collections.ts
var import_fuels10 = require("fuels");
var useCollections = ({
  network,
  subgraphURL,
  limit
}) => {
  const [fetching, setFetching] = (0, import_react2.useState)(false);
  const [data, setData] = (0, import_react2.useState)([]);
  const [error, setError] = (0, import_react2.useState)(null);
  const fetchData = (0, import_react2.useCallback)(() => __async(void 0, null, function* () {
    setFetching(true);
    const response = yield fetchCollections(network, subgraphURL, limit != null ? limit : 100);
    if (response.success) {
      const collectionData = response.data;
      const meteDataClient = new NftMetadataClient(network);
      const metaDataClientWithProvider = yield meteDataClient.useProvider("FuelProvider" /* FuelProvider */);
      const formattedData = collectionData.map(
        (d) => ({
          collectionId: d.id,
          collectionStandard: d.nftType === "SEMI_FT" ? "SFT" : "NFT",
          collectionName: d.name,
          collectionSymbol: d.symbol,
          floorPrice: getFormattedPrice(d.floorPrice),
          totalItemsListed: parseInt(d.listed),
          bannerImage: ""
        })
      );
      const fetchMetadata = (d) => {
        const assetId = (0, import_fuels10.getMintedAssetId)(
          d.collectionId,
          "0x0000000000000000000000000000000000000000000000000000000000000000"
        );
        const metadataPromise = metaDataClientWithProvider.setContract(
          d.collectionId,
          d.collectionStandard === "NFT" ? "NFT" /* NFT */ : "SEMI_FT" /* SEMI_FT */
        ).getMetadata(assetId);
        return metadataPromise;
      };
      const collectionMetadataPromises = yield Promise.allSettled(formattedData.map(fetchMetadata));
      const collectionsWithBannerImages = collectionMetadataPromises.map((p, i) => {
        var _a, _b;
        const collection = formattedData[i];
        if (p.status === "fulfilled") {
          const metadata = p.value;
          if (metadata.success) collection.bannerImage = (_b = (_a = metadata.data) == null ? void 0 : _a.image) != null ? _b : "";
        }
        return collection;
      });
      setData(collectionsWithBannerImages);
      setError(null);
    } else {
      setError(response.error);
      setData([]);
    }
    setFetching(false);
  }), []);
  (0, import_react2.useEffect)(() => {
    fetchData();
  }, [fetchData]);
  return { fetching, data, error };
};

// src/hooks/use-listings.ts
var import_react3 = require("react");
var useListings = ({
  network,
  subgraphURL,
  limit
}) => {
  const [fetching, setFetching] = (0, import_react3.useState)(false);
  const [data, setData] = (0, import_react3.useState)([]);
  const [error, setError] = (0, import_react3.useState)(null);
  const fetchData = (0, import_react3.useCallback)(() => __async(void 0, null, function* () {
    setFetching(true);
    const response = yield fetchListings(network, subgraphURL, limit != null ? limit : 100);
    if (!response.success) {
      setError(response.error);
      setData([]);
      setFetching(false);
      return;
    }
    const listingData = response.data;
    const meteDataClient = new NftMetadataClient(network);
    const metaDataClientWithProvider = yield meteDataClient.useProvider("FuelProvider" /* FuelProvider */);
    const formattedData = listingData.map(
      (d) => ({
        itemId: Number(d.id),
        isActive: d.status === "ACTIVE",
        nftAddress: d.nftAddress,
        itemStandard: d.nftType === "NFT" ? "NFT" : "SFT",
        tokenId: d.tokenId,
        assetId: d.asset_id,
        itemQuantity: parseInt(d.quantity),
        pricePerItem: getFormattedPrice(d.pricePerItem),
        sellerAddress: d.seller,
        itemName: "",
        itemImage: "",
        itemMedia: ""
      })
    );
    const fetchMetadata = (d) => {
      return metaDataClientWithProvider.setContract(d.nftAddress, d.itemStandard === "NFT" ? "NFT" /* NFT */ : "SEMI_FT" /* SEMI_FT */).getMetadata(d.assetId);
    };
    const listingMetadataPromises = yield Promise.allSettled(formattedData.map(fetchMetadata));
    const listingsWithMetadata = listingMetadataPromises.map((p, i) => {
      var _a, _b, _c, _d, _e, _f;
      const listing = formattedData[i];
      if (p.status === "fulfilled") {
        const metadata = p.value;
        if (metadata.success) {
          listing.itemName = (_b = (_a = metadata.data) == null ? void 0 : _a.name) != null ? _b : "";
          listing.itemImage = (_d = (_c = metadata.data) == null ? void 0 : _c.image) != null ? _d : "";
          listing.itemMedia = (_f = (_e = metadata.data) == null ? void 0 : _e.assetMedia) != null ? _f : "";
        }
      }
      return listing;
    });
    setData(listingsWithMetadata);
    setError(null);
    setFetching(false);
  }), []);
  (0, import_react3.useEffect)(() => {
    fetchData();
  }, [fetchData]);
  return { fetching, data, error };
};

// src/hooks/use-nft.ts
var import_react4 = require("react");
var useNft = ({
  network,
  subgraphURL,
  limit,
  contractAddress,
  nftStandard,
  tokenId
}) => {
  const [fetching, setFetching] = (0, import_react4.useState)(false);
  const [data, setData] = (0, import_react4.useState)([]);
  const [error, setError] = (0, import_react4.useState)(null);
  const fetchData = (0, import_react4.useCallback)(() => __async(void 0, null, function* () {
    setFetching(true);
    const response = yield fetchNft(network, subgraphURL, contractAddress, nftStandard, tokenId, limit != null ? limit : 100);
    if (!response.success) {
      setError(response.error);
      setData([]);
      setFetching(false);
      return;
    }
    const listingData = response.data;
    const meteDataClient = new NftMetadataClient(network);
    const metaDataClientWithProvider = yield meteDataClient.useProvider("FuelProvider" /* FuelProvider */);
    const formattedData = listingData.map(
      (d) => ({
        itemId: Number(d.id),
        isActive: d.status === "ACTIVE",
        nftAddress: d.nftAddress,
        itemStandard: d.nftType === "NFT" ? "NFT" : "SFT",
        tokenId: d.tokenId,
        assetId: d.asset_id,
        itemQuantity: parseInt(d.quantity),
        pricePerItem: getFormattedPrice(d.pricePerItem),
        sellerAddress: d.seller,
        itemName: "",
        itemImage: "",
        itemMedia: "",
        description: ""
      })
    );
    const fetchMetadata = (d) => {
      return metaDataClientWithProvider.setContract(d.nftAddress, d.itemStandard === "NFT" ? "NFT" /* NFT */ : "SEMI_FT" /* SEMI_FT */).getMetadata(d.assetId);
    };
    const listingMetadataPromises = yield Promise.allSettled(formattedData.map(fetchMetadata));
    const listingsWithMetadata = listingMetadataPromises.map((p, i) => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      const listing = formattedData[i];
      if (p.status === "fulfilled") {
        const metadata = p.value;
        if (metadata.success) {
          listing.itemName = (_b = (_a = metadata.data) == null ? void 0 : _a.name) != null ? _b : "";
          listing.itemImage = (_d = (_c = metadata.data) == null ? void 0 : _c.image) != null ? _d : "";
          listing.itemMedia = (_f = (_e = metadata.data) == null ? void 0 : _e.assetMedia) != null ? _f : "";
          listing.description = (_h = (_g = metadata.data) == null ? void 0 : _g.description) != null ? _h : "";
        }
      }
      return listing;
    });
    setData(listingsWithMetadata);
    setError(null);
    setFetching(false);
  }), []);
  (0, import_react4.useEffect)(() => {
    fetchData();
  }, [fetchData]);
  return { fetching, data, error };
};

// src/services/marketplace/buy-token.ts
var import_fuels11 = require("fuels");
var BuyTokenService = class extends MarketplaceServices {
  constructor(contract, wallet) {
    super();
    this.contract = void 0;
    this.wallet = void 0;
    this.listingId = void 0;
    this.quantity = void 0;
    this.pricePerItem = void 0;
    checkArguments([contract, wallet], "arguments");
    this.contract = contract;
    this.wallet = wallet;
  }
  setProperties(listingId, quantity, pricePerItem) {
    checkArguments([listingId, quantity, pricePerItem], "arguments");
    this.listingId = listingId;
    this.quantity = quantity;
    this.pricePerItem = pricePerItem;
    return this;
  }
  execute() {
    return __async(this, null, function* () {
      checkArguments([this.contract, this.wallet, this.listingId, this.quantity, this.pricePerItem], "properties");
      try {
        const balance = yield this.wallet.getBalance(this.wallet.provider.getBaseAssetId());
        const totalOrderPrice = parseFloat(this.pricePerItem.toString()) * 10 ** 9 * parseInt(this.quantity.toString());
        if (parseFloat(balance.toString()) < totalOrderPrice) {
          throw new MarketplaceError(
            "Insufficient balance - At least ${totalOrderPrice} ETH is required to complete this transaction.",
            "InsufficientBalance" /* InsufficientBalance */,
            { balance, pricePerItem: this.pricePerItem, quantity: this.quantity, totalOrderPrice }
          );
        }
        const transactionAwaited = yield this.contract.functions.buy_nft((0, import_fuels11.bn)(this.listingId), (0, import_fuels11.bn)(this.quantity)).callParams({
          forward: [(0, import_fuels11.bn)(totalOrderPrice), this.wallet.provider.getBaseAssetId()]
        }).call();
        const finalTransaction = yield transactionAwaited.waitForResult();
        return finalTransaction;
      } catch (error) {
        console.error("Error Log: Error executing buy token transaction: ", { error });
        return error;
      }
    });
  }
};

// src/services/marketplace/cancel-listing.ts
var import_fuels12 = require("fuels");
var CancelListingService = class extends MarketplaceServices {
  constructor(contract) {
    super();
    this.contract = void 0;
    this.listingId = void 0;
    checkArguments([contract], "arguments");
    this.contract = contract;
  }
  setProperties(listingId) {
    checkArguments([listingId], "arguments");
    this.listingId = listingId;
    return this;
  }
  execute() {
    return __async(this, null, function* () {
      checkArguments([this.contract, this.listingId], "properties");
      try {
        const transactionAwaited = yield this.contract.functions.cancel_listing((0, import_fuels12.bn)(this.listingId)).call();
        const finalTransaction = yield transactionAwaited.waitForResult();
        return finalTransaction;
      } catch (error) {
        console.error("Error Log: Error executing cancel listing transaction: ", { error });
        return error;
      }
    });
  }
};

// src/services/marketplace/list-token.ts
var import_fuels13 = require("fuels");
var ListTokenService = class extends MarketplaceServices {
  constructor(contract) {
    super();
    this.contract = void 0;
    this.assetId = void 0;
    this.contractId = void 0;
    this.subId = void 0;
    this.price = void 0;
    this.amount = void 0;
    this.tokenStandard = void 0;
    checkArguments([contract], "arguments");
    this.contract = contract;
  }
  setProperties(assetId, contractId, subId, price, amount, tokenStandard) {
    checkArguments([assetId, contractId, subId, price, amount, tokenStandard], "arguments");
    this.assetId = assetId;
    this.contractId = contractId;
    this.subId = subId;
    this.price = price;
    this.amount = amount;
    this.tokenStandard = tokenStandard;
    return this;
  }
  execute() {
    return __async(this, null, function* () {
      checkArguments(
        [this.contract, this.assetId, this.contractId, this.subId, this.price, this.amount, this.tokenStandard],
        "properties"
      );
      try {
        const contractIdInput = {
          bits: this.contractId
        };
        const transactionAwaited = yield this.contract.functions.list_nft(
          contractIdInput,
          (0, import_fuels13.bn)(this.price * 10 ** 9),
          this.subId,
          (0, import_fuels13.bn)(this.amount),
          this.tokenStandard
        ).callParams({
          forward: [(0, import_fuels13.bn)(this.amount), this.assetId]
        }).call();
        const finalTransaction = yield transactionAwaited.waitForResult();
        if (!finalTransaction.transactionId) return null;
        return finalTransaction;
      } catch (error) {
        console.error("Error Log: Error executing list token transaction: ", { error });
        return error;
      }
    });
  }
};

// src/services/marketplace/modify-listing.ts
var import_fuels14 = require("fuels");
var ModifyListingService = class extends MarketplaceServices {
  constructor(contract) {
    super();
    this.contract = void 0;
    this.assetId = void 0;
    this.listingId = void 0;
    this.newPrice = void 0;
    this.quantityToAdd = void 0;
    checkArguments([contract], "arguments");
    this.contract = contract;
  }
  setProperties(assetId, listingId, newPrice, quantityToAdd) {
    checkArguments([assetId, listingId, newPrice, quantityToAdd], "arguments");
    this.assetId = assetId;
    this.listingId = listingId;
    this.newPrice = newPrice;
    this.quantityToAdd = quantityToAdd;
    return this;
  }
  execute() {
    return __async(this, null, function* () {
      checkArguments([this.contract, this.assetId, this.listingId, this.newPrice, this.quantityToAdd], "properties");
      try {
        const contractCall = this.contract.functions.modify_listing(
          (0, import_fuels14.bn)(this.listingId),
          (0, import_fuels14.bn)(this.newPrice * 10 ** 9),
          (0, import_fuels14.bn)(this.quantityToAdd)
        );
        if (this.quantityToAdd > 0) {
          contractCall.callParams({
            forward: [(0, import_fuels14.bn)(this.quantityToAdd), this.assetId]
          });
        }
        const transactionAwaited = yield contractCall.call();
        const finalTransaction = yield transactionAwaited.waitForResult();
        return finalTransaction;
      } catch (error) {
        console.error("Error Log: Error executing buy token transaction: ", { error });
        return error;
      }
    });
  }
};

// src/services/marketplace/marketplace-client.ts
var MarketplaceClient = class {
  constructor(network, marketplaceAddress, wallet) {
    this.contract = void 0;
    this.wallet = void 0;
    this.service = void 0;
    checkArguments([network, marketplaceAddress, wallet], "arguments");
    this.contract = new NftMarketplace(marketplaceAddress, wallet);
    this.wallet = wallet;
  }
  useService(service) {
    checkArguments([service], "arguments");
    if (service instanceof BuyTokenService) {
      checkArguments([this.contract, this.wallet], "properties");
      this.service = new BuyTokenService(this.contract, this.wallet);
      return this;
    }
    checkArguments([this.contract], "properties");
    if (service instanceof CancelListingService) this.service = new CancelListingService(this.contract);
    if (service instanceof ListTokenService) this.service = new ListTokenService(this.contract);
    if (service instanceof ModifyListingService) this.service = new ModifyListingService(this.contract);
    return this;
  }
  setProperties(...properties) {
    checkArguments(properties, "arguments");
    if (this.service instanceof BuyTokenService)
      this.service.setProperties(properties[0], properties[1], properties[2]);
    if (this.service instanceof CancelListingService) this.service.setProperties(properties[0]);
    if (this.service instanceof ListTokenService)
      this.service.setProperties(
        properties[0],
        properties[1],
        properties[2],
        properties[3],
        properties[4],
        properties[5]
      );
    if (this.service instanceof ModifyListingService)
      this.service.setProperties(
        properties[0],
        properties[1],
        properties[2],
        properties[3]
      );
    return this;
  }
  executeTransaction() {
    checkArguments([this.service], "properties");
    return this.service.execute();
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AllowedProviders,
  MarketplaceClient,
  MarketplaceErrorCodes,
  Networks,
  checkNftOwnership,
  searchMarketplace,
  useAllNftsInCollection,
  useCollections,
  useListings,
  useNft
});
