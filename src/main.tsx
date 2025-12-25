import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "react-express-auth-kit";
import { Toaster } from "sonner";

const authConfig = {
  // loginRoute: "http://localhost:4100/api/v1/admin/login",
  // logoutRoute: "http://localhost:4100/api/v1/admin/logout",
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider config={authConfig}>
      <App />
      <Toaster />
    </AuthProvider>
  </StrictMode>
);
