import AddProperties from "./AddProperties";
import MyListings from "./MyListings/MyListings";
import MyProfile from "./MyProfile";
import UpdatePropertyList from "./UpdateProperty/UpdatePropertyList";

export const tabs = [
  {
    tabName: "My Profile",
    component: <MyProfile />,
  },
  {
    tabName: "Add Properties",
    component: <AddProperties />,
  },
  {
    tabName: "Update Property Details",
    component: <UpdatePropertyList />,
  },
  {
    tabName: "My Listings",
    component: <MyListings />,
  },
];
