import AddProperties from "./AddProperties";
import MyListings from "./MyListings/MyListings";
import MyProfile from "./MyProfile";
import UpdateProperty from "./UpdateProperty/UpdateProperty";
import UpdatePropertyList from "./UpdateProperty/UpdatePropertyList";

export const tabs = [
  {
    tabName: "My Profile",
    component: <MyProfile />,
    link: "profile",
  },

  {
    tabName: "Add Properties",
    component: <AddProperties />,
    link: "add",
  },

  {
    tabName: "Property List",
    component: <UpdatePropertyList />,
    link: "property-list",
  },

  {
    tabName: "Update Property",
    component: <UpdateProperty />,
    link: "update",
  },

  {
    tabName: "My Listings",
    component: <MyListings />,
    link: "auction-list",
  },
];
