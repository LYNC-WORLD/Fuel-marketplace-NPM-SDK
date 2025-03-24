import { Network, Alchemy } from "alchemy-sdk";
import { Contract, getMintedAssetId, Provider, sleep } from "fuels";
import blockchain from "../config/blockchain.json";
import { NFTStandardOutput } from "@/artifacts/marketplace/typegen/NftMarketplace";
import { NonFungibleCreator } from "@/artifacts/non_fungible/typegen";
import { SemiFungibleCreator } from "@/artifacts/semi_fungible/typegen";
const settings = {
  apiKey: process.env.ALCHEMY_KEY,
  network: Network.MATIC_MUMBAI,
};
const alchemy = new Alchemy(settings);
export async function fetchNFTMetaData(nftAddress, tokenID) {
  const response = await alchemy.nft.getNftMetadata(nftAddress, tokenID, {});
  return response;
}

export async function fetchContractMetaData(nftAddress) {
  const response = await alchemy.nft.getContractMetadata(nftAddress, {});
  return response;
}

export async function fetchAllNftOfContract(nftAddress, assetIds, type) {
  const Response = [];
  let SUBID = "0x0000000000000000000000000000000000000000000000000000000000000000";

  const provider = await Provider.create(blockchain["fuel_testnet"].publicRpc);

  if (type === NFTStandardOutput.NFT) {
    const contract = new NonFungibleCreator(nftAddress, provider);
    for (const assetId of assetIds) {
      const metaData = await contract.functions.metadata({ bits: assetId }, "URI").get();
      const name = await contract.functions.name({ bits: assetId }).get();

      const symbol = await contract.functions.symbol({ bits: assetId }).get();

      try {
        const subId = await contract.functions.getSubId({ bits: assetId }).get();
        SUBID = subId.value.toString();
      } catch (error) {
        console.error(error);
      }

      const response = await fetch(metaData.value.String);
      const responseData = await response.json();

      Response.push({
        title: responseData.name,
        image: responseData.image,
        mediaType: responseData.assetMedia,
        description: responseData.description,
        contractAddress: nftAddress,
        assetId: assetId,
        type: type,
        ContractName: name.value.toString(),
        ContractSymbol: symbol.value.toString(),
        tokenId: SUBID,
      });
    }
  }
  if (type === NFTStandardOutput.SEMI_FT) {
    const contract = new SemiFungibleCreator(nftAddress, provider);

    for (const assetId of assetIds) {
      //await sleep(1000);
      const metaData = await contract.functions.metadata({ bits: assetId }, "URI").get();

      const name = await contract.functions.name({ bits: assetId }).get();

      const symbol = await contract.functions.symbol({ bits: assetId }).get();

      try {
        const subId = await contract.functions.getSubId({ bits: assetId }).get();
        SUBID = subId.value.toString();
      } catch (error) {
        console.error(error);
      }

      const response = await fetch(metaData.value.String);
      const responseData = await response.json();

      Response.push({
        title: responseData.name,
        image: responseData.image,
        mediaType: responseData.assetMedia,
        description: responseData.description,
        contractAddress: nftAddress,
        assetId: assetId,
        type: type,
        ContractName: name.value.toString(),
        ContractSymbol: symbol.value.toString(),
        tokenId: SUBID,
      });
    }
  }

  return Response;
}

export async function fetchAllNftOfContract_wallet(isConnected, wallet, nftAddress, assetIds, type) {
  const Response = [];
  let SUBID = "0x0000000000000000000000000000000000000000000000000000000000000000";

  if (wallet && isConnected) {
    if (type === NFTStandardOutput.NFT) {
      const contract = new NonFungibleCreator(nftAddress, provider);
      for (const assetId of assetIds) {
        await sleep(1000);
        const metaData = await contract.functions.metadata({ bits: assetId }, "URI").get();
        const name = await contract.functions.name({ bits: assetId }).get();

        const symbol = await contract.functions.symbol({ bits: assetId }).get();

        try {
          const subId = await contract.functions.getSubId({ bits: assetId }).get();
          SUBID = subId.value.toString();
        } catch (error) {
          console.error(error);
        }

        const response = await fetch(metaData.value.String);
        const responseData = await response.json();

        Response.push({
          title: responseData.name,
          image: responseData.image,
          mediaType: responseData.assetMedia,
          description: responseData.description,
          contractAddress: nftAddress,
          assetId: assetId,
          type: type,
          ContractName: name.value.toString(),
          ContractSymbol: symbol.value.toString(),
          tokenId: SUBID,
        });
      }
    }
    if (type === NFTStandardOutput.SEMI_FT) {
      const contract = new SemiFungibleCreator(nftAddress, provider);

      for (const assetId of assetIds) {
        await sleep(1000);
        const metaData = await contract.functions.metadata({ bits: assetId }, "URI").get();

        const name = await contract.functions.name({ bits: assetId }).get();

        const symbol = await contract.functions.symbol({ bits: assetId }).get();

        try {
          const subId = await contract.functions.getSubId({ bits: assetId }).get();
          SUBID = subId.value.toString();
        } catch (error) {
          console.error(error);
        }

        const response = await fetch(metaData.value.String);
        const responseData = await response.json();

        Response.push({
          title: responseData.name,
          image: responseData.image,
          mediaType: responseData.assetMedia,
          description: responseData.description,
          contractAddress: nftAddress,
          assetId: assetId,
          type: type,
          ContractName: name.value.toString(),
          ContractSymbol: symbol.value.toString(),
          tokenId: SUBID,
        });
      }
    }

    return Response;
  }
}

export async function fetchContractMetaDataWithFirstNFt(nftAddress, type) {
  const provider = await Provider.create(blockchain["fuel_testnet"].publicRpc);

  const asset = getMintedAssetId(nftAddress, "0x0000000000000000000000000000000000000000000000000000000000000000");

  if (type === NFTStandardOutput.NFT) {
    const contract = new NonFungibleCreator(nftAddress, provider);

    const name = await contract.functions.name({ bits: asset }).get();

    const symbol = await contract.functions.symbol({ bits: asset }).get();

    const metaData = await contract.functions.metadata({ bits: asset }, "URI").get();

    const response = await fetch(metaData.value.String);
    const responseData = await response.json();

    return {
      contractName: name.value.toString(),
      contractSymbol: symbol.value.toString(),
      img: responseData.image,
    };
  }
  if (type === NFTStandardOutput.SEMI_FT) {
    const contract = new SemiFungibleCreator(nftAddress, provider);

    const name = await contract.functions.name({ bits: asset }).get();

    const symbol = await contract.functions.symbol({ bits: asset }).get();

    const metaData = await contract.functions.metadata({ bits: asset }, "URI").get();

    const response = await fetch(metaData.value.String);
    const responseData = await response.json();

    return {
      contractName: name.value.toString(),
      contractSymbol: symbol.value.toString(),
      img: responseData.image,
    };
  }
}

export async function fetchContractMetaDataWithFirstNFt_wallet(isConnected, wallet, nftAddress, type) {
  if (wallet && isConnected) {
    const asset = getMintedAssetId(nftAddress, "0x0000000000000000000000000000000000000000000000000000000000000000");

    if (type === NFTStandardOutput.NFT) {
      const contract = new NonFungibleCreator(nftAddress, wallet);

      const name = await contract.functions.name({ bits: asset }).get();

      const symbol = await contract.functions.symbol({ bits: asset }).get();

      const metaData = await contract.functions.metadata({ bits: asset }, "URI").get();

      const response = await fetch(metaData.value.String);
      const responseData = await response.json();

      return {
        contractName: name.value.toString(),
        contractSymbol: symbol.value.toString(),
        img: responseData.image,
      };
    }
    if (type === NFTStandardOutput.SEMI_FT) {
      const contract = new SemiFungibleCreator(nftAddress, wallet);

      const name = await contract.functions.name({ bits: asset }).get();

      const symbol = await contract.functions.symbol({ bits: asset }).get();

      const metaData = await contract.functions.metadata({ bits: asset }, "URI").get();

      const response = await fetch(metaData.value.String);
      const responseData = await response.json();

      return {
        contractName: name.value.toString(),
        contractSymbol: symbol.value.toString(),
        img: responseData.image,
      };
    }
  } else {
    return null;
  }
}

export const getErrorMessage = (statusCode) => {
  const METAMASK_ERRORS = {
    "-32700": {
      standard: "JSON RPC 2.0",
      message: "Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text.",
    },
    "-32600": {
      standard: "JSON RPC 2.0",
      message: "The JSON sent is not a valid Request object.",
    },
    "-32601": {
      standard: "JSON RPC 2.0",
      message: "The method does not exist / is not available.",
    },
    "-32602": {
      standard: "JSON RPC 2.0",
      message: "Invalid method parameter(s).",
    },
    "-32603": {
      standard: "JSON RPC 2.0",
      message: "Internal JSON-RPC error.",
    },
    "-32000": {
      standard: "EIP-1474",
      message: "Invalid input.",
    },
    "-32001": {
      standard: "EIP-1474",
      message: "Resource not found.",
    },
    "-32002": {
      standard: "EIP-1474",
      message: "Resource unavailable.",
    },
    "-32003": {
      standard: "EIP-1474",
      message: "Transaction rejected.",
    },
    "-32004": {
      standard: "EIP-1474",
      message: "Method not supported.",
    },
    "-32005": {
      standard: "EIP-1474",
      message: "Request limit exceeded.",
    },
    4001: {
      standard: "EIP-1193",
      message: "User rejected the request.",
    },
    4100: {
      standard: "EIP-1193",
      message: "The requested account and/or method has not been authorized by the user.",
    },
    4200: {
      standard: "EIP-1193",
      message: "The requested method is not supported by this Ethereum provider.",
    },
    4900: {
      standard: "EIP-1193",
      message: "The provider is disconnected from all chains.",
    },
    4901: {
      standard: "EIP-1193",
      message: "The provider is disconnected from the specified chain.",
    },
  };

  if (METAMASK_ERRORS[statusCode]) {
    return METAMASK_ERRORS[statusCode].message;
  } else {
    return "Something went wrong! Please try after sometime";
  }
};
