import React, { useContext } from "react";
import Noteitem from "./Noteitem";

import noteContext from "../context/note/noteContext";
const Note = (props) => {
  const a = useContext(noteContext);
  const { setDeleted, setSaved } = props;
  const notes = a.notes;
  return (
    <>
      <div className="container">
        <div className=" row">
          {notes.length > 0 ? (
            notes.map((note) => {
              return (
                <Noteitem
                  key={note._id}
                  title={note.title}
                  description={note.description}
                  id={note._id}
                  setDeleted={setDeleted}
                  setSaved={setSaved}
                />
              );
            })
          ) : (
            <div className="container">No Notes to display</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Note;