import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { FiltersProvider } from "./Context/Filter";

//window.BaseUrlGeneral = "https://172.20.10.2:45455/House-App/";

window.BaseUrlGeneral = "https://192.168.1.68:45455/House-App/";
window.BaseUrl = "https://localhost:44383/House-App/";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FiltersProvider>
    <App />
  </FiltersProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
