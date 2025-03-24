export const SearchResultCardsSkeleton = () => {
  return (
    <div className="search-data row-center-stretch w-full skeleton">
      <span className="data-avatar aspect-square relative inline-box skeleton"></span>
      <div style={{ gap: "0.2rem" }} className="data-name column-center-start w-full">
        <p className="name skeleton"></p>
        <div className="address skeleton"></div>
      </div>
    </div>
  );
};
