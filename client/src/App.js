// import Signup from './components/signup'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import { AuthProvider } from "./auth/AuthProvider";
import AnimatedRoutes from "./Routes/AnimatedRoutes";
import "./styles.css"

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
            <AnimatedRoutes />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
