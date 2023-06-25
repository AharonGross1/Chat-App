import './loginScreenStyle.css'
function Loginpass({setPassword}){
    const handlePasswordChange=(event)=>{
        setPassword(event.target.value)
    }
    return(<div className="input-container" id="password">
        <label htmlFor="input-password">Password</label>
        <input type="password" id="input-password" name="input-password" onChange={handlePasswordChange} />
    </div>)
}

export default Loginpass