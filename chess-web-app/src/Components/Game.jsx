import React, { useState, useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import Board from "./Board";
import TimeFormatSelector from "./TimeFormatSelector"; 
import "./user.scss";

function Game(props) {

  return (
    <div>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          
            <Board />
        </div>
      </div>
    </div>
  );
}

export default Game;