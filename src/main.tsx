import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import QueryProvider from "./components/QueryProvider";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryProvider>
      <App />
    </QueryProvider>
  </BrowserRouter>
);
