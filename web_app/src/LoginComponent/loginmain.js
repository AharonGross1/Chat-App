import React, { useState } from 'react';

import './loginScreenStyle.css';

import Loginpass from "./Loginpass";
import Loginuser from "./Loginuser";
import { Link, useNavigate } from "react-router-dom";

function Loginmain({ usersetchat, setusertoken }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setmsg] = useState('');
    const navigate = useNavigate();
    const handleKeyDown = async (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            clicklogin();
        }
    };
    /**clicklogin-check if there is username and password the user enter are in the local storge
     *
     */
    const clicklogin = async () => {

        //the password on storage is the right one
        const userJSON2 = JSON.stringify({ username, password });
        //send the data to the server
        //get the token from the server by username and password the user enter
        const res2 = await fetch('http://localhost:5000/api/Tokens', {
            'method': 'post',
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': userJSON2
        })
        if (res2.status === 404) {//if dont find the user so cant make token
            setmsg("Incorrect username and/or password")
            return;
        }
        //set the token and save the username
        const token = await res2.text();
        usersetchat(username)//if the user login, save the username and go to chat
        setusertoken(token)
        navigate('/chat'); //move to chat
    }

    return (
        <>
            <div id="top-part"></div>
            <div id="login-screen" onKeyDown={handleKeyDown}>
                <Loginuser setUsername={setUsername}></Loginuser>
                <Loginpass setPassword={setPassword} />
                <div className="button-container">
                    <a>
                        <button type="submit" id="login-button" onClick={clicklogin}>Login</button>
                    </a>
                    {msg && <div className="error-message-for-sumbit">{msg}</div>}
                    <Link to="/" id="go-to-register">Not registered? Click here register</Link>
                </div>
            </div>
        </>
    );
}

export default Loginmain;
