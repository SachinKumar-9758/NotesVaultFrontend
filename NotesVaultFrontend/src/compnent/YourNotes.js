import React ,{useState}from 'react'
import Note from './Note'
import Alert from './Alert';
const YourNotes = () => {
  const [deleted,setDeleted] = useState(false);
  const [saved, setSaved] = useState(false);
  return (
    <>
    {
      deleted &&  <Alert message={"note deleted successfully "} heading={"success"}/>
    }
    {
      saved && <Alert message={"note saved successfully"} heading={"success"}/>
    }
    <div className="container row">
        <Note setDeleted={setDeleted} setSaved={setSaved}/>
    </div>
    </>
  )
}

export default YourNotes