import Link from "next/link";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80";

const compressAddress = (address) => {
  if (!address) return "...";
  if (address.length <= 24) return address;

  return `${address.slice(0, 10)}...${address.slice(-10)}`;
};

export const SearchResultCards = (props) => {
  return (
    <Link
      href={`/nft/${props.nftAddress}/${props.tokenStandard}/${props.tokenId}`}
      onClick={() => {
        props.setShowSearchList(false);
        props.setSearchQuery("");
      }}
    >
      <div className="search-data row-center-stretch w-full">
        <span className="data-avatar aspect-square relative inline-box">
          <img
            src={props.tokenImage || PLACEHOLDER_IMAGE}
            alt={props.tokenName}
            style={{ width: "100%", height: "100%" }}
          />
        </span>
        <div style={{ gap: "0.2rem" }} className="data-name column-center-start">
          <p className="name capitalize">{props.tokenName || "Unknown"}</p>
          <div style={{ gap: "0.5rem" }} className="row-start-center">
            <span className="address font-light">{compressAddress(props.nftAddress)}</span>
            {props.tokenStandard && (
              <p
                style={{
                  fontSize: "0.625rem",
                  padding: "0.1875rem 0.3750rem",
                  borderRadius: "3px",
                  letterSpacing: "0.1em",
                  backgroundColor: "hsl(var(--skeleton-bg) / 1)",
                }}
              >
                {props.tokenStandard === "NFT" ? "NFT" : "SFT"}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
