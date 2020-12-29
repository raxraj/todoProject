import Home from "./Home/Home";
import Navbar from "./Navbar/Navbar";

import { Router } from "@reach/router";
import Login from "./Login/Login";

function App() {
  return (
    <div>
      <Navbar title="DO-ME!"/>
      <Router>
        <Home path='/'/>
        <Login path='/login'/>
      </Router>
    </div>
  );
}

export default App;
