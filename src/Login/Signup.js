import './Login.css'
import { Link } from "@reach/router";
import { useState } from 'react';
import axios from 'axios';
const SignUp = () => {
    const [fullName, setFullName] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    let registeredUser = () => {
        axios.post('http://127.0.0.1:5500/register',
            {
                fullName: fullName,
                userName: userName,
                password: password
            })
            .then((response) => {
                if (response.data.done) {
                    /*
                        this.setState({fullName: '', userName: '', password:'', message:'Registere'})
                    */
                    setFullName("")
                    setUserName('')
                    setPassword('')
                    setMessage("Successfully Registered!")
                }
                else{
                    if(response.data.message == 'userName'){
                        setMessage('username is invalid')
                    }
                    else if(response.data.message == 'fullName'){
                        setMessage('fullname should be atleast 3 characters long and atmost 20 char')
                    }
                    else{
                        setMessage('password is invalid')
                    }
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <div className="center">
            <h1>Register</h1>
            <form>
                <h3>{message}</h3>
                <div className="text_field">
                    <input id="fullName" type="text" placeholder="FullName"
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                    />
                </div>
                <div className="text_field">
                    <input id="userName" type="text" placeholder="Username"
                        value={userName}
                        onChange={(event) => setUserName(event.target.value)}
                    />
                </div>
                <div className="text_field">
                    <input id="password" type="password" placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />

                </div>
                <br />
            </form>
            <button class='login-register-btn' onClick={registeredUser}> Register</button>
            <div className="signup_link">
                Already a member? <Link to='/login'>Login</Link>
            </div>
        </div>
    );
}

export default SignUp;