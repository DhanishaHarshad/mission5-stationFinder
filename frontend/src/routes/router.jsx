import { createBrowserRouter } from "react-router";

import Home from "../pages/Home";
import FindStation from "../pages/FindStation";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/find-station",
    Component: FindStation,
  },
]);

export default router;
