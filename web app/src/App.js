import './App.css';
import loginmain from "./LoginComponent/loginmain";
import Registrationmain from "./RegComponent/Registrationmain"
import {BrowserRouter, Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import Loginmain from "./LoginComponent/loginmain";
import Chatmain from "./ChatComponents/Chatmain";
import {useState} from "react";
function App() {
    const [chatdateforuser, chatdateforuserset] = useState('0');
    const [token, setusertoken] = useState('0');//global state for save the user name that
//global state for save the user name that
    //want to login or Registrat
//there is check if the chatdateforuser dont 0, should not be possible to enter the site from outdide  when try enter
// to /chat.
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Registrationmain chatdateforuserset={chatdateforuserset} setusertoken={setusertoken} />} />
                <Route path="/login" element={<Loginmain usersetchat={chatdateforuserset} setusertoken={setusertoken} />} />
                <Route path="/chat" element={chatdateforuser === '0' ? <Navigate to="/login" /> : <Chatmain userid={chatdateforuser} token={token} />} />
            </Routes>
        </BrowserRouter>
  );
}


export default App;
