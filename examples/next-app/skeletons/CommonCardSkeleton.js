export function CommonCardSkeleton() {
  return (
    <>
      <div className="grid-card-container skeleton">
        <span className="nft-img aspect-square box">
          <span className="nft-type font-light absolute inline-box"></span>
        </span>
        <div className="details column-center-stretch">
          <div className="name-price-data row-between-end">
            <p className="name"></p>
            <span className="price w-max column-center-start">
              <span className="price-label uppercase font-light"></span>
              <span className="price-amount"></span>
            </span>
          </div>
          <div className="creator-details row-start-center">
            <span className="creator-avatar square circle box"></span>
            <div className="creator-name column-center-start">
              <span className="label uppercase"></span>
              <span className="name"></span>
            </div>
            <div className="quantity column-center-center ml-auto">
              <span className="label uppercase"></span>
              <span className="name"></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
