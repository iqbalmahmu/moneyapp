import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./../pages/Home";
import Login from "./../pages/Login";
import Register from "./../pages/Register";

export default function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" exact Component={Home} />
          <Route path="/Login" Component={Login} />
          <Route path="/Register" Component={Register} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
