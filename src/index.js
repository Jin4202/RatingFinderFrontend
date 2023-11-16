import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import BrowseItem from "./pages/item/BrowseItem";
import Item from "./pages/item/Item";
import Signup from "./pages/login/Signup";
import Login from "./pages/login/Login";
import Confirmation from "./pages/confirmation/Confirmation";
import AuthContext from "./contexts/AuthContext";
import { AuthProvider } from "./contexts/AuthContext";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="browse" element={<BrowseItem />} />
      <Route path="item" element={<Item />} />
      <Route path="signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/confirmation" element={<Confirmation />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
