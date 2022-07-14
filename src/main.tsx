import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const target = document.getElementById("root");

if (target) {
  const root = ReactDOM.createRoot(target);
  root.render(<App />);
}
