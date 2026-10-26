import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

console.log("1 -> main.tsx started");

const rootElement = document.getElementById("root");

console.log("2 -> root element found");

createRoot(rootElement!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

console.log("3 -> App rendered");