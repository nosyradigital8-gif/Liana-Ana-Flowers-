import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

try {
  const rootElement = document.getElementById("root");
  
  if (!rootElement) {
    document.body.innerHTML = '<div style="padding: 20px; color: red;">Error: Root element not found</div>';
    throw new Error("Root element not found");
  }

  console.log("Starting app...");
  
  createRoot(rootElement).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  
  console.log("App rendered successfully");
} catch (error) {
  console.error("Failed to render app:", error);
  document.body.innerHTML = `<div style="padding: 20px; color: red;">Error loading app: ${error}</div>`;
}