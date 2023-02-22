import axios from "axios";
import React, { useState } from "react";

const AuthContext = React.createContext();
const AuthProvider = ({ children }) => {
  const login = async (username, password) => {
    console.log("login");
    let result = await axios
      .post("http://localhost:3001/login", { username, password })
      .then((res) => {
        res = res.data;
        console.log(res);
        if (res.user) localStorage.setItem("user", JSON.stringify(res.user));
        else console.log(res.error);
        return res;
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
    return result;
  };

  const logout = () => {
    // AuthService.logout();
    // setUser(null);
    console.log("logout");
    const user = JSON.parse(localStorage.getItem("user"));
    localStorage.removeItem("user");
    return user;
  };

  const getCurrentUser = () => {
    // Get user session info from local storage
    return JSON.parse(localStorage.getItem("user"));
  };

  return (
    <AuthContext.Provider value={{ login, logout, getCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
