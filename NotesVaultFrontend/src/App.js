import React,{useContext} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './component/Navbar';
import About from './component/About';
import Home from './component/Home';
import YourNotes from './component/YourNotes';
import NoteState from './context/note/NoteState';
import LogIn from './component/LogIn';
import SignUp from './component/SignUp';
import Unauthorized from "./component/Unauthorized";
import UserState from "./context/user/UserState";
import userContext from "./context/user/userContext";
import Mainscreen from "./component/Mainscreen";
function App() {
  const user=useContext(userContext);
  console.log(user.isLoggedIn);
  return (
    <>
      <Router>
        <Navbar />
        <UserState>
          <NoteState>
            <Routes>
              <Route exact path="/login" element={<LogIn />} />
              <Route exact path="/signup" element={<SignUp />} />
              <Route exact path="/" element={<Mainscreen/>}/>
              <Route exact path="/home" element= {user? <Home /> : <Unauthorized />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/yournotes" element={localStorage.getItem('token') ? <YourNotes /> : <Unauthorized />} />
            </Routes>
          </NoteState>
        </UserState>
      </Router>
    </>
  );
}

export default App;