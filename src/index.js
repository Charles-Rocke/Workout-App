import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

if (typeof window !== "undefined") {
  window.React = React;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* Checking for React app */}
    {window.React === React ? <App /> : <h1>Not a React App</h1>}
  </React.StrictMode>
);
