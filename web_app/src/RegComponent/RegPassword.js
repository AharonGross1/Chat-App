import React, { useState } from "react";
import "./registrationScreenStyle.css"
export default RegPassword

function RegPassword({ value, setvalue, onInputChange }) {
    const [password, setpassword] = useState('');
    const [ispasswordValid, setIspasswordValid] = useState();
    const [errorMessage, setErrorMessage] = useState('');
    /**
     * handleUsernameChange-when the user change the passowrd, we set the state name and check if the value valid
     * @param event
     */
    const handleUsernameChange = (event) => {
        const passwordValue = event.target.value;
        setpassword(passwordValue);
        setvalue(passwordValue) //TODO need to enter here valid fun
        setIspasswordValid(ifvalid(passwordValue)); // some validation logic, e.g. checking if the input is not empty
        onInputChange(ifvalid(passwordValue)); // pass the validity to the parent component,return if true or f
    };
    const ifvalid = (passwordValue) => {
        if (passwordValue.trim().length > 7) {
            return true
        } else
            setErrorMessage("At least 8 digits must be entered")
        return false
    }
    const inputClassName = ispasswordValid ? 'valid ' : 'invalid';

    return (
        <>
            <div className="input-container" id="password">
                <label htmlFor="input-password">Password</label>
                <input type="password" id="input-password" name="input-password" onChange={handleUsernameChange} className={inputClassName} />
                {!ispasswordValid && <div className="error-message">{errorMessage}</div>}
            </div>
        </>
    );
}