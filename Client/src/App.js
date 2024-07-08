import "./App.css";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import { createHashRouter, RouterProvider } from "react-router-dom";

import Login from "./Login/Login";
import PrivateRoutes from "./Services/PrivateRoutes";
import Aplications from "./Components/Aplications";
import Failure from "./Components/Failure";

import ResetPassword from "./pages/ResetPassword";

import { ToastContainer } from "react-toastify";
import Dashboard from "./Components/Dashboard";
import Welcome from "./Components/Welcome";
import Traiding from "./Components/Traiding";
import Products from "./Components/Products";

const sampleUsers = [
  {
    id: 1,
    name: "Alice",
    status: "Online",
    avatar: "/path/to/avatar1.jpg",
    online: true,
  },
  {
    id: 2,
    name: "Bob",
    status: "Offline",
    avatar: "/path/to/avatar2.jpg",
    online: false,
  },
  // More users...
];

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* <Route path="chat-web" element={<ChatAppMain users={sampleUsers} />} /> */}

        <Route path="/home-page/" element={<PrivateRoutes />}>
          <Route path="welcome" element={<Welcome />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="apps" element={<Aplications />} />
          <Route path="traiding" element={<Traiding />} />
          <Route path="products" element={<Products />} />
        </Route>

        {/* <Route path="/" element={<PrivateRoutes />}>
            <Route path="/soccer" element={<Soccer />} />
          </Route> */}
        <Route path="*" element={<Failure />} />
      </Routes>
      <ToastContainer />
    </HashRouter>
  );
}

export default App;
