import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { PizzariaProvider } from "./modules/views/pizzaria-provider.tsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PizzariaProvider>
      <ToastContainer position="top-center" autoClose={3000} />
      <App />
    </PizzariaProvider>
  </StrictMode>
);
