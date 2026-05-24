import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import FoodDonation from "./pages/FoodDonation";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DonateNow from "./pages/DonateNow";

import Layout from "./dashboard/Layout";
import Profile from "./dashboard/Profile";
import Food from "./dashboard/Food";

import Navbar from "./components/Navbar/Navbar";
import AboutUs from "./components/About Us/AboutUs";
import Vision from "./components/Our Visison/Vision";
import Contact from "./pages/Contact";
import Apply from "./pages/Apply";
function App() {
  const token = localStorage.getItem("token");
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      {!pathname.includes("/login") &&
        !pathname.includes("/signup") &&
        !pathname.includes("/dashboard") && <Navbar token={token} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donation" element={<FoodDonation />} />
        <Route path="/DonateNow" element={<DonateNow />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/ourwork" element={<Vision />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/apply" element={<Apply />} />


        {token ? (
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<FoodDonation />} />
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route path="/dashboard/food" element={<Food />} />
          </Route>
        ) : (
          <Route path="*" element={<Login />} />
        )}
      </Routes>
    </>
  );
}

export default App;
