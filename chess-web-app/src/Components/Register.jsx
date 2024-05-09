import React, { useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"

import "../css/Register.css"
import Logo from "../assets/chess.png"

function Register () {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [skill, setSkill] = useState(null);
    const [mssg, setMssg] = useState(''); 
    
    function validateData(userData) {
        if(!userData.name || !userData.email || !userData.password || !userData.skill)
        {
            return "All fields are required!!";
        }

        if(userData.password.length < 7)
        {
            return "Password must be 8 characters long!!";
        }

        if (!userData.email.includes('@') && !userData.email.includes('.'))
        {
            return "Invalid email address!!";
        }

        return "Valid";
    }
 
    const signup = async (e) => {
        e.preventDefault();

        const userData = {
            "name": name,
            "email":  email,
            "password": password,
            "skill": skill
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
                url: "http://localhost:4000/api/user/register",
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
            
            setName('');
            setEmail('');
            setPassword('');
        }
    };

    return (
        <div className="container">
            <form action="" className="flex-container">

                <img src={Logo} alt="ChessHub Logo" />

                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder="Name"
                    className="flex-item"
                />
                
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
                
                <select name="role" onChange={(e) => setSkill(e.target.value)} className="flex-item">
                    <option value="">Choose your skill level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>

                <button type="submit" className="flex-item" onClick={signup} >
                    Register
                </button>

                <div className="flex-item redirect">
                    <p>Already have an account? <Link to="/">Log in</Link></p>
                </div>

                <p style = {{color:"red"}}>{`${mssg}`} </p>

            </form>
        </div>
    );
};

export default Register;