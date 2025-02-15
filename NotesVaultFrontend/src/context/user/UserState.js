import userContext from "./userContext";
import { useState } from "react";

const UserState = (props) => {
    const [isLoggedIn , setisLoggedIn] = useState(false);
    const setLogin =(newVal) =>{
      setisLoggedIn(newVal);
    }
    return (
      <userContext.Provider value={{ isLoggedIn , setLogin }}>
        {props.children}
      </userContext.Provider>
    );
  };

  export default UserState;