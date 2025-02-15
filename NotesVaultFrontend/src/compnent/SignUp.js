import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from './Alert';
import {URL} from "./../Constant"
const SignUp = () => {
  const history = useNavigate()
    const [registered , setRegistred] = useState(false);
    const [name,setName]= useState("");
    const [email,setEmail] =useState("");
    const [password,setPassword] =useState("");
    const handleSubmit = async (e) => {
       e.preventDefault();
        const response=await axios.post(`${URL}auth/register`,{name:name,email:email,password:password});
        if (response.data.success) {
        const token =response.data.authToken;
        localStorage.setItem('token',token); 
        setRegistred(true);
        setTimeout(() =>{setRegistred(false);
           history('/home')},1500);
        }
        else{
            console.log("error")
            alert(response.data.message);
        }
    }
  return (
    <>
    {
      registered && <Alert heading={"success"} message={"User registred successfully"} />
    }
    <form className="container">
    <div className="form-group my-2">
          <label htmlFor="name">Name</label>
          <input
            type="name"
            className="form-control"
            id="name"
            aria-describedby="name"
            placeholder="Enter name"
            value={name}
            onChange={(e)=>{
                setName(e.target.value);
            }}
          />
        </div>
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
      </form>
    </>
  )
}

export default SignUp