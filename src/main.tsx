import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { initAuth0 } from "./AuthProvider/Authorization.ts";

import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import "./style.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
