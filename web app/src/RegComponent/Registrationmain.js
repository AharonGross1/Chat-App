import './registrationScreenStyle.css'
import RegUsername from "./RegUsername";
import RegPassword from "./RegPassword";
import RegPic from "./RegPic";
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

export default Registrationmain

function Registrationmain({ chatdateforuserset, setusertoken }) {
    let invalidinput;
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [password, setPassword] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [users, setUsers] = useState([]);
    const [usernameIsgood, setusernameIsgood] = useState('');
    const [displayNameIsgood, setdisplayNameIsgood] = useState('');
    const [passwordIsgood, setpasswordIsgood] = useState('');
    const [profilePicIsgood, setprofilePicIsgood] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegister = (newUser) => {
        setUsers([...users, newUser]);

    }
    /**
     * handleUsernameValidity-this function send to username compant that return if the user name is valid
     * @param isValid
     */
    const handleUsernameValidity = (isValid) => {
        setusernameIsgood(isValid);
    }
    /**
     * handledeprofilePicValidity-this function send to profile-pic compant that return if the profile-pic is valid
     * @param isValid
     */
    const handledeprofilePicValidity = (isValid) => {
        setprofilePicIsgood(isValid);
    }
    /**
     * handlepasswordValidity-this function send to password compant that return if the password is valid
     * @param isValid
     */
    const handlepasswordValidity = (isValid) => {
        setpasswordIsgood(isValid);
    }
    /**
     *  handledisplayNameValidity -this function send to display name compant that return if the displayname is valid
     * @param isValid
     */
    const handledisplayNameValidity = (isValid) => {
        setdisplayNameIsgood(isValid);
    }
    /**
     * allfielsok check if the input of the user if ok. save the the user date on localstroge.
     * and save on the global state the user date
     * @returns {boolean}
     */
    const allfielsok = async () => {
        if (displayNameIsgood && passwordIsgood && profilePicIsgood && usernameIsgood) {
            handleRegister({ username, password, displayName, profilePic })
            const userJSON = JSON.stringify({ username, password, displayName, profilePic });
            // localStorage.setItem(username, userJSON);
            //add new user
            const res = await fetch('http://localhost:5000/api/Users', {
                'method': 'post',
                'headers': {
                    'Content-Type': 'application/json'
                },
                'body': userJSON
            })
            if (res.status == 404) {
                setErrorMessage('The username already exists in the system!');
                return false;
            }
            const userJSON2 = JSON.stringify({ username, password });
            ///get token from the sever
            const res2 = await fetch('http://localhost:5000/api/Tokens', {
                'method': 'post',
                'headers': {
                    'Content-Type': 'application/json'
                },
                'body': userJSON2
            })
            const token = await res2.text();
            setusertoken(token)//save the token
            chatdateforuserset(username)//save the name of usernmae on global state
            navigate('/chat');//go to the chat
            return true
        } else
            setErrorMessage('Please fill in all fields correctly(Image should be smaller than 220kb)');
        return false
    }

    return (

        <>
            <body>
                <div id="top-part"></div>
                <div id="registration-screen">
                    <RegUsername
                        name="Username"
                        value={username}
                        setvalue={setUsername}
                        onInputChange={handleUsernameValidity}//return if the value is valid or not
                    />
                    <RegPassword onInputChange={handlepasswordValidity} value={password}
                        setvalue={setPassword}></RegPassword>

                    <RegUsername name={"Display Name"} value={displayName} setvalue={setDisplayName}
                        onInputChange={handledisplayNameValidity}>
                    </RegUsername>
                    <RegPic value={profilePic} onInputChange={handledeprofilePicValidity} setvalue={setProfilePic}></RegPic>

                    <div className="button-container">
                        <a>
                            <button type="submit" id="register-button" onClick={allfielsok}>Register</button>
                        </a>
                        {errorMessage && <div className="error-message-for-sumbit">{errorMessage}</div>}
                        <Link to="/login" id="go-to-login">Already registered? click here to login</Link></div>
                </div>
            </body>
        </>
    );
}
