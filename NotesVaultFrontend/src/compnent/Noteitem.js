import { useContext, useState } from "react";
import noteContext from "../context/note/noteContext";
import { URL } from "../Constant";
import axios from "axios";



const Noteitem = (props) => {
 
  const { title, description, id ,setDeleted ,setSaved} = props;
  const a = useContext(noteContext);
  const [isEditing, setisEditing] = useState(false);
  const [newTitle, setnewTitle] = useState(title);
  const [newDescription, setnewDescription] = useState(description);

  const handleDelete = async (e) => {
    e.preventDefault();
   
    try {
      const auth=localStorage.getItem('token');
      const response = await axios.delete(`${URL}notes/deletenote/${id}`, {
        headers: { token: auth },
      });

      if (response?.data?.success) {
        const arr = a.notes.filter((note) => note._id !== id);
        a.setNotes(arr);
        setDeleted(true);
        setTimeout(() =>{setDeleted(false)},2500);

      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error during note deletion:", error);
    }
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    setisEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const auth=localStorage.getItem('token');   
    const response = await axios.put(
      `${URL}notes/updateNote/${id}`,
      { title: newTitle, description: newDescription },
      {
        headers: { token: auth },
      }
    );
    if (response?.data?.success) {
      const updatedNotes = a.notes.map((note) => {
        if (note._id === id) {
          return { ...note, title: newTitle, description: newDescription };
        }
        setSaved(true);
        return note;
      });
      a.setNotes(updatedNotes);
      setSaved(true);
      setTimeout(() => {setSaved(false);},2500);
      setisEditing(false);
    } else {
      return response.data.message;
    }
  };
  const handleCancel = (e) => {
    e.preventDefault();
    setisEditing(false);
  };
  return (
    <>
    
    <div className="card col-md-3 my-3 mx-3">
  
      <div className="card-body">
        {!isEditing ? (
          <>
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
          </>
        ) : (
          <>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={newTitle}
              onChange={(e) => setnewTitle(e.target.value)}
            />
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={newDescription}
              onChange={(e) => setnewDescription(e.target.value)}
            />
          </>
        )}
        {isEditing ? (
          <>
            <button className="btn btn-primary mx-2" onClick={handleSave}>
              Save
            </button>
            <button className="btn btn-primary" onClick={handleCancel}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button className="btn btn-primary mx-2" onClick={handleDelete}>
              Delete Note
            </button>
            <button className="btn btn-primary" onClick={handleEdit}>
              Edit Note
            </button>
          </>
        )}
      </div>
    </div>
    </>
  );
};

export default Noteitem;