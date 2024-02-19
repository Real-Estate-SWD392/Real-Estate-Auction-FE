import React, { useEffect } from "react";
import ResponsiveAppBar from "../layout/navbar/Navbar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import SearchBody from "./SearchBody";
import RelatedPropList from "../home/related-prop/RelatedPropList";
import { useSelector } from "react-redux";

const SearchComponent = () => {
  const searchTerm = useSelector((state) => state.search.searchTerm);
  const searchResults = useSelector((state) => state.search.searchResults);

  console.log(searchTerm);
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <SearchBody
      searchTerm={searchTerm}
      resultCount={searchResults?.length}
      searchFrequency={"Most popular"}
    />
  );
};

export default SearchComponent;
