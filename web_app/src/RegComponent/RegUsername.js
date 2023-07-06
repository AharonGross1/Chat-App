import React, {useState} from 'react';
import "../LoginComponent/loginScreenStyle.css"
export default RegUsername


function RegUsername({name,value, onInputChange,setvalue}) {
    const [username, setUsername] = useState('');
    const [isUsernameValid, setIsUsernameValid] = useState();
    const [meg, megset] = useState('');


    const handleUsernameChange = (event) => {
        const usernameValue = event.target.value;
        setUsername(usernameValue);
        setvalue(usernameValue)
        setIsUsernameValid(ifvalid(usernameValue)); // some validation logic, e.g. checking if the input is not empty
        onInputChange(ifvalid(usernameValue)); // pass the validity to the parent component,return if true or f
    };
    const inputClassName = isUsernameValid ? 'valid ' : 'invalid';
    const ifvalid = (usernameValue) => {
        if (usernameValue.trim().length > 3){
            const myItem = localStorage.getItem(usernameValue);
            if (myItem === null){
                return true
            }else {
                megset("The name already exists, choose another name")
                return false
            }
        }else
            megset("Invalid input need at least 4 characters ")
            return false
    }


    return (
        <>
            <div className="input-container" id="username">
                <label htmlFor="input-username">{name}</label>
                <input type="text" value={username} id="input-username" name="input-username"
                       onChange={handleUsernameChange} className={inputClassName}/>
                {!isUsernameValid && <div className="error-message">{meg}</div>}
            </div>
            </>
    )
}


