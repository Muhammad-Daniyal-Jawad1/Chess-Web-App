import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom';

import Register from "./Components/Register"
import Login from "./Components/Login"
import Home from "./Components/Home"
import Error from "./Components/Error"
import ResetPassword from './Components/ResetPassword';
import Game from './Components/Game'
import GameHistory from './Components/GameHistory'

import tokens from "./tokens"
import userInfo from "./userInfo"

import axios from 'axios'

function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);

  if (!isLoggedin)
  {
    if (JSON.parse(localStorage.getItem('refresh-token')))
    {
      sendRefreshRequest();
    }
    else
    {
      return (
        <>
          <div className="App">
            <Routes>
              <Route path='/' element={<Login isLoggedIn={setIsLoggedin}/>} />
              <Route path='/signup' element={<Register/>} />
              <Route path='/resetpassword' element={<ResetPassword/>} />
              <Route path='/home' element={<Home/>} />
              <Route path='/game' element={<Game/>} />
              <Route path='/history' element={<GameHistory/>} />
              <Route path="*" element={<Error />} />
            </Routes>
          </div>
        </>
      );
    }
    
  }
  else {
    return (
      <>
        <div className="App">
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/game' element={<Game/>} />
            <Route path='/gamehistory' element={<GameHistory/>} />
          </Routes>
        </div>
      </>
    )
  }

  
  async function sendRefreshRequest() {

    const response = await axios({
      method: "get",
        url: "http://localhost:4000/api/refresh",
      headers: {
      "Content-Type": "application/json",
      "refresh-token": `${JSON.parse(localStorage.getItem('refresh-token'))}`
      }
  }).catch (function (error) {
        if (error.response) {
            console.log("Error");
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
        console.log(error.config);
    });

    if(response)
    {
        if (response.status === 200) {
            setIsLoggedin(true);
            
            tokens.accessToken = response.data.accessToken;
            //console.log(tokens.accessToken)

            userInfo.name = response.data.name;
            userInfo.email = response.data.email;
            userInfo.skill = response.data.elo;

            //console.log(userInfo.name);
            
        }
    }
  }
 
}

export default App
