import React, { useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"

import tokens from "../tokens"
import userInfo from "../userInfo"

import "../css/Register.css"
import Logo from "../assets/chess.png"

function Login (props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mssg, setMssg] = useState(''); 

    function validateData(userData) {
        if(!userData.email || !userData.password)
        {
            return "All fields are required!!";
        }
        if(userData.password.length < 7)
        {
            return "Invalid password!!";
        }

        if (!userData.email.includes('@') && !userData.email.includes('.') )
        {
            return "Invalid email address!!";
        }
        return "Valid";
    }
 
    const login = async (e) => {
        e.preventDefault();

        const userData = {
            "email":  email,
            "password": password
        };

        let message = validateData(userData);

        if (message !== 'Valid')
        {
            setMssg(message);
        }
        else
        {
            const response = await axios({
	            method: "post",
                url: "http://localhost:4000/api/user/login",
	            headers: {
	            "Content-Type": "application/json",
	            },
	            data: JSON.stringify(userData)
	        }).catch (function (error) {
                if (error.response) {
                    console.log("Error sending data");
                    setMssg(error.response.data.message);
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
                    console.log("Data sent successfully");
                    console.log(response.data.message);
                    setMssg(response.data.message);

                    props.isLoggedIn(true);
                    
                    tokens.refreshToken = response.data.refreshToken;
                    tokens.accessToken = response.data.accessToken;
                    localStorage.setItem('refresh-token', JSON.stringify(response.data.refreshToken))
                   
                    userInfo.name = response.data.name;
                    userInfo.email = response.data.email;
                    userInfo.skill = response.data.elo;

                    console.log(userInfo.name);
                    
                    //console.log(response.data.accessToken);
                    //console.log(response.data.refreshToken);
                }
            }

            setEmail('');
            setPassword('');
        }

        
    };

    return (
        <div className="container">
            <form action="" className="flex-container">

                <img src={Logo} alt="BugZilla Logo" />
                
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="Email"
                    className="flex-item"
                />
                
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder="Password"
                    className="flex-item"
                />

                <button type="submit" className="flex-item" onClick={login} >
                    Log in
                </button>

                <div className="flex-item ">
                    <p className="redirect"> <Link to="/signup">Don't have an account?</Link></p> <p className="redirect2"> <Link to="/resetpassword">Forgot Password?</Link></p>
                </div>

                <p style = {{color:"red"}}>{`${mssg}`} </p>

            </form>
        </div>
    );
};

export default Login;