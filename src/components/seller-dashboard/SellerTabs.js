import AddProperties from "./AddProperties";
import MyListings from "./MyListings/MyListings";
import MyProfile from "./MyProfile";
import UpdateProperty from "./UpdateProperty";

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
    component: <UpdateProperty />,
  },
  {
    tabName: "My Listings",
    component: <MyListings />,
  },
];
