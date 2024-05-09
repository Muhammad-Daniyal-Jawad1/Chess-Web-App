import React from "react";
import Navbar from "./Navbar/Navbar"
import Sidebar from "./Sidebar/Sidebar"
import "./user.scss"

function Developer(props) {
  return (
    <div >
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
        </div>
      </div>
    </div>
  );
}

export default Developer;