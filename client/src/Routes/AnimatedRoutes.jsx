import React from "react";
import Home from "../components/home";
import { Login } from "../components/LoginPage/login";
import { Signup } from "../components/SignupPage/signup";
import { Testing } from "../components/Testing";
import PrivateRoute from "./PrivateRoute";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion/dist/framer-motion";
import Notes from "../components/Notes/Notes";
import Students from "../components/Students/Students";
import NavText from "../components/NavText";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/notes" element={<Notes />} />
        <Route path="/testing" element={<Testing />} />
        <Route path="/students" element={<Students />} />
        <Route path="/lax" element={<NavText />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
