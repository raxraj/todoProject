import './Login.css'
import { Link } from "@reach/router";

const Login = (props) => {
    return (
        <div className="center">
            <h1>Login</h1>
            <form action method="post">
                <div className="text_field">
                    <input type="text" placeholder="Username" required />
                </div>
                <div className="text_field">
                    <input type="password" placeholder="Password" required />
                </div>
                <br/>
                <button className="login-register-btn">Login</button>
                <div className="signup_link">
                    Not a member? <Link to='/signup'> Sign up </Link>
                </div>
            </form>
        </div>
    );
}

export default Login;