import Link from "next/link";
import { CompressAddress } from "@/helpers";

function ContractCard({ item, index }) {
  return (
    <Link href={`/collection/${item.tokenStandard}/${item.contractAddress}`}>
      <div className="activities-data row-center-stretch w-full">
        <span className="counter inline-box">{index + 1}</span>
        <span className="data-avatar aspect-square relative inline-box">
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
        <div style={{ gap: 0 }} className="data-name column-center-start">
          <p className="name capitalize">{item.collectionName || item.collectionSymbol || "Unknown"}</p>
          <div style={{ gap: "0.25rem" }} className="row-start-center">
            <span className="at-text font-light">
              {item.contractAddress ? CompressAddress(item.contractAddress).compressedAddress : null}
            </span>
            {item.tokenStandard && (
              <p
                style={{
                  fontSize: "var(--fs-xs)",
                  padding: "0.1875rem 0.5rem",
                  borderRadius: "3px",
                  letterSpacing: "0.1em",
                  backgroundColor: "hsl(var(--skeleton-bg) / 1)",
                }}
              >
                {item.tokenStandard === "NFT" ? "NFT" : "SFT"}
              </p>
            )}
          </div>
        </div>
        <div style={{ gap: 0 }} className="floor-price column-center-end">
          <p className="uppercase">Floor Price</p>
          <span className="data-amount font-light">{item.floorPrice} ETH</span>
        </div>
      </div>
    </Link>
  );
}

export default ContractCard;
