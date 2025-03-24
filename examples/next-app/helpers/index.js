import { useContext } from "react";
import { NFTStandardOutput } from "@/artifacts/marketplace/typegen/NftMarketplace";
export function CompressAddress(address) {
  let compressedAddress = address?.slice(0, 5) + "...." + address?.slice(-4);

  return {
    compressedAddress: compressedAddress,
    completeAddress: address,
  };
}

export function isOwner(checkAddress, wallet) {
  if (String(checkAddress).toLowerCase() === String(wallet?.address.toB256()).toLowerCase()) {
    return true;
  } else {
    return false;
  }
}

export function getSkeletonList(total, Skeleton) {
  const skeletonList = [];

  for (let i = 0; i < total; i++) {
    skeletonList.push(<Skeleton />);
  }

  return skeletonList;
}

export function typeOFContract(type) {
  let contractType;
  if (type === NFTStandardOutput.NFT) contractType = type;
  else if (type === NFTStandardOutput.SEMI_FT) contractType = "SFT";
  return contractType;
}

export function reloadWindow(delay = 1500) {
  let reloadTimeout = setTimeout(() => {
    window.location.reload();
    clearTimeout(reloadTimeout);
  }, delay);
}

export function isInteger(value) {
  const integerRegex = /^\d+$/;
  return integerRegex.test(value);
}

export function getTimings(hours) {
  const fraction = hours - Math.floor(hours);

  const mins = Math.round(60 * fraction);
  const days = Math.floor(Math.floor(hours) / 24);
  const hrs = Math.floor(hours) % 24;

  return days + " D " + hrs + " H";
}

export function getFilteredData(list, query) {
  if (query === "") {
    return list;
  } else {
    return list?.filter((nft) => {
      return nft.tokenStandard === query;
    });
  }
}

export function GetContractType(contractTypeFromBackend) {
  const contractType = {
    ERC721: "ERC-721",
    ERC721A: "ERC-721A",
    ERC1155: "ERC-1155",
    biconomy: "ERC721A (Gassless)",
    ERC721ACollection: "ERC-721A",
    ERC1155Collection: "ERC-1155",
    multiple: "Multiple Editions",
    oneOnone: "1/1 NFT",
    collection: "Collection",
  };
  return contractType[contractTypeFromBackend];
}

export const getDecimalPlaces = (num) => {
  const numStr = num.toString();

  if (numStr.includes("e-")) {
    const [base, exp] = numStr.split("e-");
    const decimals = parseInt(exp, 10) + (base.includes(".") ? base.split(".")[1].length : 0);

    return decimals;
  } else if (numStr.includes("e")) {
    const [base, exp] = numStr.split("e");

    return parseInt(exp, 10) * -1;
  } else if (numStr.includes(".")) {
    return numStr.split(".")[1].length;
  }

  return 0;
};
