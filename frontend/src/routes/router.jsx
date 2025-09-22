import { createBrowserRouter } from "react-router";

import Home from "../pages/Home";
import FindStation from "../pages/FindStation";
import Directions from "../pages/Directions";

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
]);

export default router;
