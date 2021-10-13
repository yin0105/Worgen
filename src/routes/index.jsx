// import Pages from "layouts/Pages.jsx";
// import RTL from "layouts/RTL.jsx";
import Dashboard from "../layouts/Dashboard.jsx";
import AllProfiles from "../views/Profiles/AllProfiles.jsx";

var indexRoutes = [
  // { path: "/rtl", name: "RTL", component: RTL },
  // { path: "/pages", name: "Pages", component: Pages },
  { path: "/", name: "Home", component: Dashboard},
  {path: "/profile", name: "All Profiles", component: AllProfiles},
  { path: "/account", name: "All Accounts", component: AllProfiles  },
  // {
];

export default indexRoutes;
