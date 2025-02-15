import React ,{useState, useContext} from "react";
import axios from "axios";
import { URL } from "../Constant";
import { useNavigate } from "react-router-dom";
import userContext from "../context/user/userContext";
import Alert from "./Alert";
const LogIn = () => {
  const history = useNavigate();
    const {isLoggedIn} = useContext(userContext);
    const [email,setEmail] =useState("");
    const [password,setPassword] =useState("");
    const [loading,setLoading] =useState(false);
    const [loggedin , setLoggedIn] = useState(false);
    const handleSubmit = async (e) => {
    if(localStorage.getItem('token'))
    {
      history('/yournotes')
    }
      setLoading(true);
        const response=await axios.post(`${URL}auth/login`,{email:email,password:password});
        const token =response.data.authToken;
        localStorage.setItem('token',token);
        
        if(!token)
        {
          console.log("Login failed",response.data.message)
        }
        else{
          history('/yournotes')
          console.log(isLoggedIn)
          console.log(token);
          console.log(response);
        }
        
        setLoading(false);
        setLoggedIn(true);
        setTimeout(() => {setLoggedIn(false);},3000);
    }
  return (

    <div>
      {
        loggedin && <Alert heading={"success"} message={"logged in successfully"}/>
      }
      {
    !loading?
      (<><form className="container">
        <div className="form-group my-2">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="email"
            placeholder="Enter email"
            value={email}
            onChange={(e)=>{
                setEmail(e.target.value);
            }}
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="password"
            value={password}
            onChange={(e)=>{
                setPassword(e.target.value);
            }}
          />
        </div>
        <button type="submit" onClick={handleSubmit} className="btn btn-primary">
          Submit
        </button>
      </form></>):(<>your notes are loading</>)
}
</div>
  );
};

export default LogIn;