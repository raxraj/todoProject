import './Login.css'

const Login = (props) => {
    return ( 
        <div>
            <form>
                <input type="username" placeholder="Enter your username" />
                <br/>
                <input type="password" placeholder="Enter your password" />
            </form>
        </div>
     );
}
 
export default Login;