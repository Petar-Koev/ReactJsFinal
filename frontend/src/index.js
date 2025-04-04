import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { WatchlistProvider } from "./contexts/WatchlistContext";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <WatchlistProvider>
      <App />
    </WatchlistProvider>
  </AuthProvider>
);
