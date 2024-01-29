import React from "react";
import ResponsiveAppBar from "../layout/navbar/Navbar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import SearchBody from "./SearchBody";
import RelatedPropList from "../home/related-prop/RelatedPropList";

const SEARCH_ROUTE = "Search";

const SearchComponent = () => {
  return (
    <>
      <ResponsiveAppBar route={SEARCH_ROUTE} />
      <SearchBody
        searchTerm={"192/4 TTH12, Tan Thoi Hiep Ward, Dist 12, HCMC"}
        resultCount={"12.300"}
        searchFrequency={"Most popular"}
      />
    </>
  );
};

export default SearchComponent;
