// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter } from "react-router";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
