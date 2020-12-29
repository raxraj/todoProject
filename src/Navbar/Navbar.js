import './Navbar.css'
import { Link } from "@reach/router";

const Navbar = (props) => {
    return (
        <nav>
            <div className="branding">
                {props.title}
            </div>
            <div className="navigation">
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/login'>Login</Link></li>
                    <li>Sign up</li>
                </ul>
            </div>
        </nav>

    );
}

export default Navbar;
