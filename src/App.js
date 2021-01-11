import Home from "./Home/Home";
import Navbar from "./Navbar/Navbar";

import { Router } from "@reach/router";
import Login from "./Login/Login";
import SignUp from "./Login/Signup";
import  Dashboard from "./Dashboard/Dashboard";

function App() {
  return (
    <div>
      <Navbar title="DO-ME!"/>
      <Router>
        <Home path='/'/>
        <Login path='/login'/>
        <SignUp path='/signup'/>
        <Dashboard path='/dashboard'/>
      </Router>
    </div>
  );
}

export default App;
