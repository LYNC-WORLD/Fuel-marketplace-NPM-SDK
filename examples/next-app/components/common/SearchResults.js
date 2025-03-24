import { SearchResultCards } from "../cards/SearchResultCards";
import { forwardRef, useEffect, useState } from "react";
import { Minus, Search } from "lucide-react";
import { SearchResultCardsSkeleton } from "@/skeletons/SearchResultCardSkeletion";
import { Networks, searchMarketplace } from "@lyncworld/fuel-marketplace";

export const SearchResults = forwardRef(({ searchQuery, setShowSearchList, setSearchQuery }, ref) => {
  const [searchResults, setSearchResults] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const search = async () => {
      setFetching(true);

      if (!searchQuery) {
        setSearchResults([]);
        setFetching(false);
        return;
      }

      const response = await searchMarketplace(Networks.Testnet, searchQuery);
      if (response.success) {
        setSearchResults(response.data);
      } else {
        console.error("Error fetching search results: ", { error: response.error });
        setSearchResults([]);
      }

      setFetching(false);
    };

    search();
  }, [searchQuery]);

  if (fetching) {
    return (
      <div className="search-results-container absolute w-full column-center-stretch" ref={ref}>
        <SearchResultCardsSkeleton />
      </div>
    );
  }

  if (!searchResults.length) {
    return (
      <div className="search-results-container absolute w-full column-center-stretch" ref={ref}>
        <div className="no-search-results column-center-start w-full">
          <div className="search-icons-container w-full row-start-center">
            <Search className="search-icon" size={20} />
            <Minus className="minus-icon" size={20} />
            <p className="search-query">{searchQuery}</p>
          </div>
          <p className="no-search-result-msg w-full">No expected results? Try something else!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="search-results-container absolute w-full column-center-stretch" ref={ref}>
      {searchResults.map((result) => (
        <SearchResultCards
          key={result.listingId}
          {...result}
          setShowSearchList={setShowSearchList}
          setSearchQuery={setSearchQuery}
        />
      ))}
    </div>
  );
});

SearchResults.displayName = "SearchResults";
