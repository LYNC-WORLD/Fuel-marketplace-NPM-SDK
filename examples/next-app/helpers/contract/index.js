import { bn, format, Provider } from "fuels";
import { NftMarketplace } from "@/artifacts/marketplace/typegen";
import blockchain from "../../config/blockchain.json";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { NFTStandardOutput } from "@/artifacts/marketplace/typegen/NftMarketplace";

import { errors } from "ethers";
import { NonFungibleCreator } from "@/artifacts/non_fungible/typegen";
import { SemiFungibleCreator } from "@/artifacts/semi_fungible/typegen";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const List_Token = async (isConnected, wallet, asset_id, contract_id, sub_id, price, amount, standard) => {
  try {
    if (isConnected && wallet) {
      const baseAssetId = wallet.provider.getBaseAssetId();

      const contract_id_input = {
        bits: contract_id,
      };

      const contract = new NftMarketplace(blockchain["fuel_testnet"].marketPlaceAddress, wallet);

      const tx_list = await contract.functions
        .list_nft(contract_id_input, bn(price * 10 ** 9), sub_id, bn(amount), standard)
        .callParams({
          forward: [bn(amount), asset_id],
        })
        .call();

      await tx_list.waitForResult();

      if (tx_list.transactionId) {
        return {
          ok: true,
          error: null,
          data: null,
        };
      }
    } else {
      return {
        ok: false,
        error: "Wallet not present",
        data: null,
      };
    }
  } catch (e) {
    console.error("Error in listing asset", e.message);
    // Add error toast here
    return {
      ok: false,
      error: `${e.message}`,
      data: null,
    };
  }
};

export const getAllListingData = async () => {
  try {
    const provider = await Provider.create(blockchain["fuel_testnet"].publicRpc);
    const contract = new NftMarketplace(blockchain["fuel_testnet"].marketPlaceAddress, provider);
    const listing_id = await contract.functions.get_current_listing_id().get();
    const currentListingId = Number(listing_id.value);

    const listings = [];

    if (currentListingId > 0) {
      for (let i = 1; i <= currentListingId; i++) {
        const listing = await contract.functions.get_listing(bn(i)).get();
        const listingData = listing.value;

        const newListing = {
          id: Number(listingData.order_id), // This is a BN
          status: Number(listingData.quantity) > 0, //status true or false
          nftAddress: listingData.nft_contract.bits, // NFT Contract Address
          nftType: listingData.standard, // Use standard as nftType
          tokenId: listingData.tokenId, // This is the sub id string
          assetId: listingData.asset_id.bits, // This is assetid string
          quantity: Number(listingData.quantity), // This is a BN
          pricePerItem: Number(listingData.price) / 10 ** 9, // This is a BN converted to a number
          seller: listingData.seller.Address.bits, // Seller Address
          buyers: [], // Initialize as empty array, assuming this will be filled later
          buyerQtys: [], // Initialize as empty array, assuming this will be filled later
          soldFors: [], // Initialize as empty array, assuming this will be filled later
        };

        if (Number(listingData.quantity) > 0) {
          listings.push(newListing);
        }
      }
    } else {
      return [];
    }

    return listings;
  } catch (e) {
    console.error("Error in listing asset", e.message);
    return [];
  }
};

export const getNftMetadata = async (nft_contract, asset_id, standard) => {
  try {
    const provider = await Provider.create(blockchain["fuel_testnet"].publicRpc);
    const assetIdInput = {
      bits: asset_id,
    };
    let metadataUrl;
    if (standard == NFTStandardOutput.NFT) {
      const contract = new NonFungibleCreator(nft_contract, provider);
      const metadata = await contract.functions.metadata(assetIdInput, "URI").get();
      metadataUrl = metadata.value.String;
    } else {
      const contract = new SemiFungibleCreator(nft_contract, provider);
      const metadata = await contract.functions.metadata(assetIdInput, "URI").get();
      metadataUrl = metadata.value.String;
    }

    try {
      const response = await fetch(metadataUrl);
      if (!response.ok) {
        throw new Error("Network Error: Failed to fetch metadata.");
      }

      const metadata = await response.json();
      return metadata;
    } catch (error) {
      console.error("Error fetching metadata: ", error);
      return null;
    }
  } catch (e) {
    console.error("Error in listing asset", e.message);
    return null;
  }
};

export const getNftMetadata_wallet = async (isConnected, wallet, nft_contract, asset_id, standard) => {
  try {
    if (isConnected && wallet) {
      const assetIdInput = {
        bits: asset_id,
      };
      let metadataUrl;
      if (standard == NFTStandardOutput.NFT) {
        const contract = new NonFungibleCreator(nft_contract, wallet);
        const metadata = await contract.functions.metadata(assetIdInput, "URI").get();
        metadataUrl = metadata.value.String;
      } else {
        const contract = new SemiFungibleCreator(nft_contract, wallet);
        const metadata = await contract.functions.metadata(assetIdInput, "URI").get();
        metadataUrl = metadata.value.String;
      }

      try {
        const response = await fetch(metadataUrl);
        if (!response.ok) {
          throw new Error("Network Error: Failed to fetch metadata.");
        }

        const metadata = await response.json();
        return metadata;
      } catch (error) {
        console.error("Error fetching metadata: ", error);
        return null;
      }
    } else {
      return null;
    }
  } catch (e) {
    console.error("Error in listing asset", e.message);
    return null;
  }
};

export const buyListing = async (isConnected, wallet, listingId, qty, pricePerItem) => {
  try {
    if (isConnected && wallet) {
      const contract = new NftMarketplace(blockchain["fuel_testnet"].marketPlaceAddress, wallet);
      const balance = await wallet.getBalance(wallet.provider.getBaseAssetId());

      if (Number(balance.toString()) < Number(pricePerItem) * 10 ** 9 * Number(qty)) {
        return {
          ok: false,
          errors: "Insufficient Wallet Balance",
        };
      }

      const tx_buy = await contract.functions
        .buy_nft(bn(listingId), bn(qty))
        .callParams({
          forward: [bn(Number(pricePerItem) * 10 ** 9 * Number(qty)), wallet.provider.getBaseAssetId()],
        })
        .call();
      await tx_buy.waitForResult();
      return {
        ok: true,
        errors: null,
      };
    } else {
      return {
        ok: false,
        errors: "Wallet not connected",
      };
    }
  } catch (e) {
    console.error("Error in fetching metadata", e.message);
    return {
      ok: false,
      errors: e.message,
    };
  }
};

export const cancelListing = async (isConnected, wallet, listingId) => {
  try {
    if (isConnected && wallet) {
      const contract = new NftMarketplace(blockchain["fuel_testnet"].marketPlaceAddress, wallet);

      const tx_cancel = await contract.functions.cancel_listing(bn(listingId)).call();
      await tx_cancel.waitForResult();
      return {
        ok: true,
        errors: null,
      };
    } else {
      return {
        ok: false,
        errors: "Wallet not connected",
      };
    }
  } catch (e) {
    console.error("Error in cancel Listing", e.message);
    return {
      ok: false,
      errors: e.message,
    };
  }
};

export const modifyListing = async (isConnected, wallet, listingId, new_price, qty_to_add, asset_id) => {
  try {
    if (isConnected && wallet) {
      const contract = new NftMarketplace(blockchain["fuel_testnet"].marketPlaceAddress, wallet);

      const modifyListingCall = contract.functions.modify_listing(
        bn(listingId),
        bn(new_price * 10 ** 9),
        bn(qty_to_add)
      );

      if (qty_to_add > 0 && asset_id) {
        modifyListingCall.callParams({
          forward: [bn(qty_to_add), asset_id],
        });
      }

      const tx_modify = await modifyListingCall.call();
      await tx_modify.waitForResult();
      return {
        ok: true,
        errors: null,
      };
    } else {
      return {
        ok: false,
        errors: "Wallet not connected",
      };
    }
  } catch (e) {
    console.error("Error in modifying asset", e.message);
    return {
      ok: false,
      errors: e.message,
    };
  }
};
