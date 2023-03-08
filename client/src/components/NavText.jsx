import React from "react";

const NavText = () => {
  return (
    <div
      className=""
      style={{ display: "flex", flexDirection: "column", height: "100vh" }}
    >
      <nav
        className=""
        style={{
          height: "60px",
          backgrounColor: "#333",
          color: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Navbar
      </nav>
      <div
        className=""
        style={{ flex: "1", overflowY: "scroll", padding: "20px" }}
      >
        {[...Array(20)].map((_, index) => (
          <p key={index}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        ))}
      </div>
    </div>
  );
};

export default NavText;
