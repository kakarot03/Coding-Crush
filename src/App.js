import React from "react";
import Game from "./pages/Game";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Game /> : <Navigate to="/login" />}></Route>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
