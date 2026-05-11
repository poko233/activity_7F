import React from "react"
import ReactDOM from "react-dom/client"

import { GoogleOAuthProvider } from "@react-oauth/google"

import App from "./App"
import "./index.css"
import { AuthProvider } from "./context/AuthContext"
import { BrowserRouter } from "react-router-dom"

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <GoogleOAuthProvider clientId="1027528359954-usl5u60tkerjq9at9iknblkgulglb0p7.apps.googleusercontent.com">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </AuthProvider>
)