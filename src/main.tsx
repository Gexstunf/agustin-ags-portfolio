import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/inter/latin-700.css";
import { Desktop } from "./desktop/Desktop";
import "./styles/global.css";
import "./styles/refinements.css";
import "./styles/effects.css";
import "./styles/pages.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Desktop />
  </React.StrictMode>,
);
