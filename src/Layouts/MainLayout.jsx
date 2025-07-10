import React, { useEffect } from "react";
import Navbar from "../Shared/Navbar";
import { Outlet, useLocation } from "react-router";
import Carousel from "@/Pages/HomePage/Carousel";
import Footer from "../Shared/Footer";

function MainLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);
  
  return (
    <>
      <Navbar />
      {location.pathname && <Carousel />}
      <main className="px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
