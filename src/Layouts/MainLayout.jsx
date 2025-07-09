import React from "react";
import Navbar from "../Shared/Navbar";
import { Outlet, useLocation } from "react-router";
import Carousel from "@/Pages/HomePage/Carousel";

function MainLayout() {
  const location = useLocation();
  return (
    <>
      <Navbar />
      {location.pathname && <Carousel />}
      <main className="px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
