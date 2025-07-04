import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/signUp";

const routes = (
  <Router>
    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route path="/signup" exact element={<SignUp />} />
      <Route path="/dashboard" exact element={<Home />} />
    </Routes>
  </Router>
);

const App = () => {
  return <div>{routes}</div>;
};

export default App;
