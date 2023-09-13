// import Index from "views/Index.js";
// import Profile from "views/examples/Profile.js";
// import Maps from "views/examples/Maps.js";
// import Register from "views/examples/Register.js";
// import Login from "views/examples/Login.js";
// import Tables from "views/examples/Tables.js";
// import Icons from "views/examples/Icons.js";
// import Rentals from "views/examples/Rentals.js";
// import Leaseing from "views/examples/Leaseing.js";
// import TenantsTable from "views/examples/TenantsTable.js";
// var routes = [
//   {
//     path: "/index",
//     name: "Dashboard",
//     icon: "ni ni-tv-2 text-primary",
//     component: <Index />,
//     layout: "/admin",
//   },

//   {
//     path: "/rentals",
//     name: "Rentals",
//     icon: "ni ni-pin-3 text-orange",
//     component: <Rentals />,
//     layout: "/admin",
//   },
//   {
//     path: "/Leaseing",
//     name: "Leaseing",
//     icon: "ni ni-pin-3 text-orange",
//     component: <Leaseing />,
//     layout: "/admin",
//   },

//   {
//     path: "/user-profile",
//     name: "User Profile",
//     icon: "ni ni-single-02 text-yellow",
//     component: <Profile />,
//     layout: "/admin",
//   },
//   {
//     path: "/tables",
//     name: "Property",
//     icon: "ni ni-bullet-list-67 text-red",
//     component: <Tables />,
//     layout: "/admin",
//   },
//   {
//     path: "/TenantsTable",
//     name: "Tenants",
//     icon: "ni ni-bullet-list-67 text-red",
//     component: <TenantsTable />,
//     layout: "/admin",
//   },
//   {
//     path: "/login",
//     name: "Login",
//     icon: "ni ni-key-25 text-info",
//     component: <Login />,
//     layout: "/auth",
//   },

// ];
// export default routes;

import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Rentals from "views/examples/Rentals.js";
import PropertiesTable from "views/examples/PropertiesTable";
import Leaseing from "views/examples/Leaseing.js";
import TenantsTable from "views/examples/TenantsTable.js";
import PropertyType from "views/examples/PropertyType";
import AddPropertyType from "views/examples/AddPropertyType";
import AddStaffMember from "views/examples/AddStaffMember";
import StaffMember from "views/examples/StaffMember";
import Rentalowner from "views/examples/Rentalowner";
import Login from "views/examples/Login";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/rentals",
    name: "Add Property",
    icon: "ni ni-pin-3 text-orange",
    component: <Rentals />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/propertiesTable",
    name: "Property",
    icon: "ni ni-bullet-list-67 text-red",
    component: <PropertiesTable />,
    layout: "/admin",
  },
  {
    path: "/TenantsTable",
    name: "Tenants",
    icon: "ni ni-bullet-list-67 text-red",
    component: <TenantsTable />,
    layout: "/admin",  
  },
  {
    path: "/Leaseing",
    name: "Leaseing",
    icon: "ni ni-home-3 text-orange",
    component: <Leaseing />,
    layout: "/admin",    
  },
  {
    path: "/PropertyType",
    name: "Add Property Type",
    icon: "ni ni-building",
    component: <PropertyType />,
    layout: "/admin",    
  },
  {
    path: "/AddPropertyType",
    name:"Add Property",
    component: <AddPropertyType />,
    layout: "/admin",    
  },
  {
    path: "/AddStaffMember",
    name:"Staff Member",
    component: <AddStaffMember />,
    layout: "/admin",    
  },
  {
    path: "/StaffMember",
    name:"Add Staff Member",
    icon: "ni ni-single-02 text-green",
    component: <StaffMember />,
    layout: "/admin",    
  },

  {
    path: "/Rentalowner",
    
    component: <Rentalowner/>,
    layout: "/admin",    
  },

  {
        path: "/login",
        name: "Login",
        icon: "ni ni-key-25 text-info",
        component: <Login />,
        layout: "/auth",
      },


];
export default routes;


