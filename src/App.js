import { useDispatch, useSelector } from "react-redux";
import Router from "./components/routes/Router";
import { useContext, useEffect } from "react";
import { AuctionContext } from "./context/auction.context";
import {
  setNotStartAuction,
  setProperties,
} from "./redux/reducers/auctionSlice";

function App() {
  const notStartList = useSelector((state) => state.auction.notStartAuction);

  const auctionList = useSelector((state) => state.auction.properties);

  const dispatch = useDispatch();

  const { startAuction } = useContext(AuctionContext);

  const startAuctionFuction = async (values) => {
    const res = await startAuction(values);

    const updatedList = [...auctionList];

    updatedList.push(res.response[0]);

    dispatch(setProperties(updatedList));

    console.log(res);
  };

  useEffect(() => {
    if (notStartList.length > 0) {
      const interval = setInterval(() => {
        const currentDate = new Date(Date.now()).toLocaleString("en-US", {
          timeZone: "Asia/Ho_Chi_Minh",
        });

        // Filter the list of not started auctions to find auctions that start today
        const auctionsToOpen = notStartList?.filter((auction) => {
          console.log(auction?.startDate);
          const startDay = new Date(auction?.startDate);

          startDay.setDate(startDay.getDate() - 1);

          const vietnamStartDate = new Date(startDay).toLocaleString("en-US", {
            timeZone: "Asia/Ho_Chi_Minh",
          });

          console.log(
            vietnamStartDate,
            currentDate,
            " - ",
            vietnamStartDate < currentDate
          );

          if (vietnamStartDate <= currentDate) {
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
          dispatch(setNotStartAuction([]));
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

  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
