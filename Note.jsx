import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Note ({ items }) {
  const { id } = useParams();
  const note = items.find(note => note.id === parseInt(id));
console.log(id);
  if (!note) {
    return <h2>Note not found</h2>;
  }

  return (
    <>
    <h2 className="header" id="full">Notes
      <div className="navblock">
        <Link className="nav" to="/">Home</Link>
        {/* <Link style={{marginLeft:"10px"}} className="nav" to="/login">Login</Link>
        <Link style={{marginLeft:"10px"}} className="nav" to="/register">Register </Link> */}
        <div style={{float:"right"}}>

        </div>
      </div>
      </h2>
    <div >

      <h1 className='newtitle'>{note.inputText}</h1>
      <br />
      {/* <br /> */}
      <hr />
      <p className='newtitle'>{note.inputTextarea}</p>
      <br />
      <br />
    </div>
    </>
  );
}

export default Note;
