import { CompressAddress, GetContractType, typeOFContract } from "@/helpers";
import { fetchContractMetaDataWithFirstNFt } from "@/helpers/helperFn";
import { ContractDetailsCardSkeleton } from "@/skeletons/ContractDetailsCardSkeleton";
import { ethers } from "ethers";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ExplorCard({ item }) {
  return (
    <Link href={`/collection/${item.contractAddress}`}>
      <tr className="table-row">
        <td className="table-data capitalize row-start-center">
          <span className="collection-image relative box aspect-square">
            {item.image ? (
              <img
                src={`https://ipfs.io/ipfs/${item.image}`}
                width="100%"
                height="100%"
                alt={"itsuki"}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            ) : (
              <img src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80" />
            )}
          </span>
          {item.contractName || "Untitled"}
        </td>
        <td className="table-data">
          {item.contractAddress ? CompressAddress(item.contractAddress).compressedAddress : null}
        </td>
        <td className="table-data">{item?.symbol}</td>
        <td className="table-data">
          {item.networkType}
          {/* {ethers.utils.formatEther(item.floorPrice)} */}
        </td>
        <td className="table-data">{GetContractType(item?.contractType)}</td>
      </tr>
    </Link>
  );
}
