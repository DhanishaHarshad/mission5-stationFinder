// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter } from "react-router";

function App() {
  return (
    <>
      <div>
        {/* After doing some research, This code is trying to route through itself. In the main.jsx file 
        there is another route configuration linked to our pages causing an error. An easy fix is import 
        router provider from react-router-dom and the router from the router.jsx file then in the return 
        remove the current code and replace it with the router provider component with the router config passed as props
        */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
