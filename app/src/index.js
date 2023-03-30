import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

const root = createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
        <SignIn />
        <SignUp />
    </React.StrictMode>
);

reportWebVitals();
