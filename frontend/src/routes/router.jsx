import { createBrowserRouter } from "react-router";

import App from "../App";
import Home from "../pages/Home/Home";
import FindStation from "../pages/FindStation/FindStation";
import Directions from "../pages/Directions/Directions";


//=====================================
import StationCard from "../shared/stationCard/StationCard"
//=====================================


const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/find-station",
    Component: FindStation,
  },
  {
    path: "/directions",
    Component: Directions,
  },
//=====================================
  {
    path: "/station-card",
    Component: StationCard,
  },

// =====================================
]);

export default router;
