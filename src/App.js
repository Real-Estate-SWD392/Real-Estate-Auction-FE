import { useDispatch, useSelector } from "react-redux";
import Router from "./components/routes/Router";
import { useContext, useEffect } from "react";
import { AuctionContext } from "./context/auction.context";
import {
  setNotStartAuction,
  setProperties,
} from "./redux/reducers/auctionSlice";
import { useLocation } from "react-router-dom";
import { setSearchResults } from "./redux/reducers/searchAuctionSlice";

function App() {
  const notStartList = useSelector((state) => state.auction.notStartAuction);

  const auctionList = useSelector((state) => state.auction.properties);

  const dispatch = useDispatch();

  const { startAuction, getInAuctionRealEstate, getNotStartAuction } =
    useContext(AuctionContext);

  const startAuctionFuction = async (values) => {
    const res = await startAuction(values);

    const inAuctionList = await getInAuctionRealEstate();

    const updatedList = [...inAuctionList.response];

    console.log(inAuctionList);

    console.log(updatedList);

    dispatch(setProperties(updatedList));
    dispatch(setSearchResults(updatedList));
  };

  useEffect(() => {
    const fetchNotStartAuction = async () => {
      const res = await getNotStartAuction();
      dispatch(setNotStartAuction(res?.response));
    };

    fetchNotStartAuction();
  }, []);

  useEffect(() => {
    if (notStartList.length > 0) {
      const interval = setInterval(() => {
        // const currentDate = new Date(Date.now()).toLocaleString("en-US", {
        //   timeZone: "Asia/Ho_Chi_Minh",
        // });

        // Filter the list of not started auctions to find auctions that start today
        const auctionsToOpen = notStartList?.filter((auction) => {
          const now = new Date();

          const startDay = new Date(auction?.startDate);
          startDay.setHours(startDay.getHours() - 7); // Add 7 hours
          console.log(startDay, "-", now);

          // startDay.setDate(startDay.getDate() - 1);

          // const vietnamStartDate = new Date(startDay).toLocaleString("en-US", {
          //   timeZone: "Asia/Ho_Chi_Minh",
          // });

          // console.log(
          //   vietnamStartDate,
          //   currentDate,
          //   " - ",
          //   vietnamStartDate < currentDate
          // );

          if (startDay <= now) {
            return auction;
          }

          return null;

          // Set the daysLeft property on each auction

          // return (
          //   startDay.getFullYear() === currentDate.getFullYear() &&
          //   startDay.getMonth() === currentDate.getMonth() &&
          //   startDay.getDate() === currentDate.getDate()
          // );
        });

        console.log(auctionsToOpen);

        if (auctionsToOpen?.length > 0) {
          startAuctionFuction(auctionsToOpen);
          const updatedNotStartAuction = notStartList.filter(
            (item) => !auctionsToOpen.includes(item)
          );

          console.log(updatedNotStartAuction);

          dispatch(setNotStartAuction(updatedNotStartAuction));

          if (notStartList.length <= 0) {
            clearInterval(interval);
          }
        }

        // Set the open state for the found auctions
        // setOpenAuctions((prevOpenAuctions) => [
        //   ...prevOpenAuctions,
        //   ...auctionsToOpen.map((auction) => auction.id),
        // ]);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [notStartList]);

  // console.log(auctionList);

  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
