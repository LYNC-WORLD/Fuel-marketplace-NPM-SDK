export function ListingCardSkeleton() {
  return (
    <div className="nft-card skeleton">
      <span className="nft-img aspect-square relative box">
        <span className="heart-icon box aspect-square circle absolute"></span>
        <span className="nft-type font-light absolute inline-box"></span>
      </span>
      <div className="nft-details column-center-stretch">
        <div className="name-price-data row-between-end">
          <p className="name"></p>
          <span className="price w-max column-center-end">
            <span className="price-label uppercase font-light"></span>
            <span className="price-amount font-bold"></span>
          </span>
        </div>
        <div className="creator-details row-start-center">
          <span className="creator-avatar square circle box"></span>
          <div className="creator-name column-center-start">
            <span className="label"></span>
            <span className="name"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
