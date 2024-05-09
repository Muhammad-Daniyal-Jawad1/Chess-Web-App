import React, { useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"

import "../css/Register.css"
import Logo from "../assets/chess.png"

function ResetPassword () {

    
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const [mssg, setMssg] = useState(''); 
    
    function validateData(userData) {
        if( !userData.email || !userData.oldPassword || !userData.newPassword)
        {
            return "All fields are required!!";
        }

        if(userData.newPassword.length < 7 || userData.oldPassword.length < 7)
        {
            return "Password must be 8 characters long!!";
        }

        if (!userData.email.includes('@') && !userData.email.includes('.'))
        {
            return "Invalid email address!!";
        }

        return "Valid";
    }
 
    const Reset = async (e) => {
        e.preventDefault();

        const userData = {
            "email":  email,
            "oldPassword": oldPassword,
            "newPassword": newPassword
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
                url: "http://localhost:4000/api/user/reset",
                headers: {
                "Content-Type": "application/json"
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
                if (response.status === 201) {
                    console.log("Data sent successfully");
                    console.log(response.data.message);
                    setMssg(response.data.message);
                }
            }
            
            
            setEmail('');
            setOldPassword('');
            setNewPassword('');
        }
    };

    return (
        <div className="container">
            <form action="" className="flex-container">

                <img src={Logo} alt="ChessHub Logo" />
                
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="Email"
                    className="flex-item"
                />
                
                <input
                    type="password"
                    onChange={(e) => setOldPassword(e.target.value)}
                    value={oldPassword}
                    placeholder="Old Password"
                    className="flex-item"
                />
                
                <input
                    type="password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                    placeholder=" New Password"
                    className="flex-item"
                />
                

                <button type="submit" className="flex-item" onClick={Reset} >
                    Reset Password
                </button>

                <div className="flex-item redirect">
                    <p>Log In to your account <Link to="/">Log in</Link></p>
                </div>

                <p style = {{color:"red"}}>{`${mssg}`} </p>

            </form>
        </div>
    );
};

export default ResetPassword;