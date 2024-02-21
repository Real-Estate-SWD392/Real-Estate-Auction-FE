import MyBids from "./MyBids/MyBids";
import SavedAuctions from "./SavedAuctions/SavedAuctions";
import UserProfile from "./UserProfile";
import WinningBids from "./WinningBids/WinningBids";

export const tabs = [
  {
    tabName: "My Profile",
    component: <UserProfile />,
  },
  {
    tabName: "My Bids",
    component: <MyBids />,
  },
  {
    tabName: "Saved Auction",
    component: <SavedAuctions />,
  },
  {
    tabName: "My Winning Bids",
    component: <WinningBids />,
  },
];
