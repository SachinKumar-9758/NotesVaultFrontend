import React ,{useState} from "react";
import Alert from "./Alert"
import { Link, useLocation ,useNavigate} from "react-router-dom";
function Navbar() {
  const history = useNavigate();
  let location = useLocation();
  const [loggedOut , setLoggedOut] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedOut(true);
    setTimeout(()=>{
      setLoggedOut(false);
    })
    history('/login');
  };
  return (
    <div>
      {
        loggedOut && <Alert heading={"success"} message={"You have been logged out successfully"}/>
      }
      <nav className="navbar navbar-expand-md navbar-light bg-dark">
        <div className="container-fluid">
          <Link
            style={
              location.pathname === "/" ? { color: "grey" } : { color: "white" }
            }
            className="navbar-brand"
            to="/"
          >
            iNotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  style={
                    location.pathname === "/home"
                      ? { color: "grey" }
                      : { color: "white" }
                  }
                  className={`nav-link ${
                    location.pathname === "/home" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  style={
                    location.pathname === "/about"
                      ? { color: "grey" }
                      : { color: "white" }
                  }
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/about"
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  style={
                    location.pathname === "/yournotes"
                      ? { color: "grey" }
                      : { color: "white" }
                  }
                  className={`nav-link ${
                    location.pathname === "/home" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/yournotes"
                >
                  YourNotes
                </Link>
              </li>
            </ul>
            {
              !localStorage.getItem('token') ?
              <>
            (<Link className="btn btn-primary mx-1" to="/login" role="button" >Login</Link>
            <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>)</>:
            <>
                <Link className="btn btn-primary mx-1" to="/login" role="button" onClick={handleLogout} >Logout</Link>
            </>
            } 
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;