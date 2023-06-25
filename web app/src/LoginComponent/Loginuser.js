import './loginScreenStyle.css'
import React from "react";
function Loginuser({setUsername}){
    const handleUserChange=(event)=>{
        setUsername(event.target.value)
    }
    return(
        <div className="input-container" id="username">
            <label htmlFor="input-username">Username</label>
            <input type="text" id="input-username" name="input-username" onChange={handleUserChange}></input>
        </div>
    )
}
export default Loginuser