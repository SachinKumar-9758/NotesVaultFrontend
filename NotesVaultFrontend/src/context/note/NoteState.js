import noteContext from "./noteContext";
import { useState , useEffect } from "react";
import {URL} from "../../Constant";
import axios from "axios";

const auth=localStorage.getItem('token');



const NoteState = (props) => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    (async ()=>{
    const response = await axios.get(`${URL}notes/getnotes`,{headers:{token:auth}})
    setNotes(response.data.notes)
    })();
    
  },[]);
  
  
  return (
    <noteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;