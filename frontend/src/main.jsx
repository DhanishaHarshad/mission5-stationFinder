// import { StrictMode } from "react";
// import ReactDom from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
// import router from "./routes/router.jsx";
// import { Route, RouterProvider } from "react-router";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <RouterProvider router={router} />
//     <App />
//   </StrictMode>
// );

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
