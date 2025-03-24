import Link from "next/link";

export default function ContractDetailsCard({ item }) {
  return (
    <Link href={`/collection/${item.tokenStandard}/${item.contractAddress}`}>
      <tr className="table-row">
        <td className="table-data capitalize row-start-center">
          <span className="collection-image relative box aspect-square">
            <img
              src={
                item.bannerImage ||
                "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80"
              }
              width="100%"
              height="100%"
              alt={item.collectionName}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </span>
          {item.collectionName || item.collectionSymbol || "Unknown"}
        </td>
        <td className="table-data">
          {item.contractAddress ? item.contractAddress.slice(0, 7) + "...." + item.contractAddress.slice(-6) : null}
        </td>
        <td className="table-data">{item.floorPrice} ETH</td>
        <td className="table-data">{item.totalItemsListed}</td>
        <td className="table-data">{item.tokenStandard === "NFT" ? "NFT" : "SFT"}</td>
      </tr>
    </Link>
  );
}
