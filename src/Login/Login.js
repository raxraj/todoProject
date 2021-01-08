import './Login.css'
import axios from 'axios'
import { Link } from "@reach/router";
import { useState } from "react";

const Login = (props) => {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('');

    let loginUser = () => {
        axios.post('http://127.0.0.1:5500/login',
            {
                userName: userName,
                password: password
            }
        )
            .then((response) => {
                if (response.data.done) {
                    setUserName('')
                    setPassword('')
                    setMessage("Successfully Logged In!")
                }
                else{
                    setUserName('')
                    setPassword('')
                    setMessage(response.data.message)
                }
            })
            
    }

    return (
        <div className="center">
            <h1>Login</h1>
            <form>
            {message}
                <div className="text_field">
                    <input type="text" placeholder="Username" required
                        value={userName}
                        onChange={(event)=>setUserName(event.target.value)}
                     />
                </div>
                <div className="text_field">
                    <input type="password" placeholder="Password"
                        value = {password}
                        onChange = {(event)=>setPassword(event.target.value)}
                     required />
                </div>
                <br />
            </form>
            <button className="login-register-btn"
                    onClick={loginUser}
                >Login</button>
                <div className="signup_link">
                    Not a member? <Link to='/signup'> Sign up </Link>
                </div>
        </div>
    );
}

export default Login;