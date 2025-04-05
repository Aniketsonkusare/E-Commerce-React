import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../Pages/Home/Home";
import Category from "../../Pages/Category/Category";

function AppRoute() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:categoryId" element={<Category />}></Route>
      </Routes>
    </div>
  );
}

export default AppRoute;
