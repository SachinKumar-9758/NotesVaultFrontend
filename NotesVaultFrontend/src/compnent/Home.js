import React, { useContext, useState } from "react";
import noteContext from "../context/note/noteContext";
import Alert from "./Alert";
import {URL} from "../Constant";
import axios from "axios";
// import userContext from "../context/user/userContext";
// const auth="eyJhbGciOiJIUzI1NiJ9.NjU2MjM5YzkyOWUzMGVjMWQwN2Y2MTE5.FIsDQhD05ryZ5fYDU0pA1gXxAYxV7K_hf6KlEBTP2zw";

function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const a = useContext(noteContext);
  const [noteAdded, setnoteAdded] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const auth=localStorage.getItem('token')
      const response = await axios.post(
        `${URL}notes/addNote`,
        { title: title, description: description },
        { headers: { token: auth } }
      );
  
      if (response?.data?.success) {
        console.log(response.data);
        const note = response.data.note;
  
        a.setNotes(a.notes.concat(note));
        setnoteAdded(true);
  
        setTimeout(() => {
          setnoteAdded(false);
        }, 5000);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error during note submission:', error);
      // Handle error appropriately
    }
  };
  
  return (
    <>
    {
        noteAdded && (<Alert heading={"success"} message={"note added successfully"}/>)
    }
    <div className="container">
      <h2>Add a Note</h2>

      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={title}
            aria-describedby="noteTitle"
            onChange={(e) => setTitle(e.target.value)}
          />
          <div id="title1" className="form-text">
            Title for your Note goes here.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            name="description"
            rows="5"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <div id="description1" className="form-text">
            Description for your Note goes here.
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Add Note
        </button>
      </form>
      
    </div>
    </>
  );
}

export default Home;