import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

function Header({ items, setItems }) {
  const [inputText, setInputText] = useState("");
  const [inputTextarea, setInputTextarea] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [idCounter, setIdCounter] = useState(0);
  const [searchInput, setSearchInput] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const popupRef = useRef(null);

  useEffect(() => {
    if (location.state?.loggedIn) {
      toast.success('Successfully logged in!');
    }
  }, [location.state]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("notes"));
    if (storedItems) {
      setItems(storedItems);
      const maxId = Math.max(...storedItems.map(item => item.id), 0);
      setIdCounter(maxId + 1);
    }
  }, [setItems]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(items));
  }, [items]);

  function handleOpenPopup() {
    setShowPopup(true);
  }

  function handleClosePopup() {
    setShowPopup(false);
    setSelectedItem(null);
    setInputText("");
    setInputTextarea("");
    setIsEditing(false);
  }

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  function handleChangearea(event) {
    const newValuearea = event.target.value;
    setInputTextarea(newValuearea);
  }

  function addItem(e) {
    e.preventDefault();
    if (inputText === "" || inputTextarea === "") {
      return;
    }

    const newNote = {
      id: idCounter,
      inputText,
      inputTextarea,
    };

    if (isEditing) {
      setItems((prevItems) =>
        prevItems.map((item, index) =>
          index === editIndex ? newNote : item
        )
      );
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setItems((prevItems) => [...prevItems, newNote]);
      setIdCounter(idCounter + 1);
    }

    setInputText("");
    setInputTextarea("");
    setShowPopup(false);
  }

  function len(text) {
    return text.length > 102 ? "..." : "";
  }

  function deleteItem(index) {
    setItems((prevItems) => prevItems.filter((item, i) => i !== index));
  }

  function editItem(index) {
    const item = items[index];
    setInputText(item.inputText);
    setInputTextarea(item.inputTextarea);
    setIsEditing(true);
    setEditIndex(index);
    handleOpenPopup();
  }

  function search(e) {
    setSearchInput(e.target.value.toLowerCase());
  }

  const filteredItems = items.filter(item =>
    item.inputText.toLowerCase().includes(searchInput)
  );

  const handleLogout = () => {
    navigate('/login', { state: { loggedout: true } });
  };

  return (
    <div>
      <Toaster position='bottom-right' />
      <h2 className="header" id="full">Notes
        <div className="navblock">
          <Link className="nav" to="/">Home</Link>
          {/* <Link style={{ marginLeft: "200px" }} className="nav" to="/login">Login</Link> */}
          <input onChange={search} className="search" type="text" placeholder="Search your task..." />
          <div style={{marginLeft:"1100px", marginTop:"-20px",fontSize:"13px",cursor:"pointer"}}>
            <p style={{width:"50px"}}>zeel_patel</p>
            <img src="https://static-00.iconduck.com/assets.00/user-icon-1024x1024-dtzturco.png" alt="user" style={{height:"22px",width:"22px",marginLeft:"70px",marginTop:"-18px",position:"absolute"}} />
          </div>
          <button onClick={handleLogout} className="nav" style={{ fontSize: "13px", float: "right", marginLeft: "1250px",marginTop:"-18px", border: "none", background: "none", cursor: "pointer" }}>
          <b><b>Logout</b> </b> 
          </button>
        </div>
      </h2>
      <button onClick={handleOpenPopup} className="btn">+</button>

      {showPopup && (
        <div className="modal-overlay2" onClick={handleClosePopup}>
          <div className="modal-content2" ref={popupRef} onClick={(e) => e.stopPropagation()}>
            <button className="exp" onClick={handleClosePopup}>X</button>
            <form onSubmit={addItem}>
              <input
                placeholder="Title"
                name="title"
                className="form1"
                onChange={handleChange}
                type="text"
                value={inputText}
                required
              />
              <br />
              <input
                className="form1"
                name="content"
                placeholder="Take a note..."
                rows="3"
                onChange={handleChangearea}
                value={inputTextarea}
                required
              />
              <br />
              <button className="btn3" type="submit">
                {isEditing ? "Edit" : "Add"}
              </button>
            </form>
          </div>
        </div>
      )}
      {selectedItem && (
        <div className="modal-overlay" onClick={handleClosePopup}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="exp" onClick={handleClosePopup}>X</button>
            <h3>{selectedItem.inputText}</h3>
            <p>{selectedItem.inputTextarea}</p>
          </div>
        </div>
      )}
      {filteredItems.map((todoItem, index) => (
        <div className="content" key={todoItem.id} id="full">
          <div className="d">
            <button onClick={() => deleteItem(index)} style={{ border: "none", cursor: "pointer" }}>
              <i className="fa fa-trash" aria-hidden="false"></i>
            </button>
          </div>
          <div className="e">
            <button onClick={() => editItem(index)} style={{ border: "none", cursor: "pointer" }}>
              <i style={{ marginLeft: "-140px" }} className="fas fa-edit"></i>
            </button>
          </div>
          <Link style={{ textDecoration: "none" }} to={`/note/${todoItem.id}`}>
            <h1 key={todoItem.id} className="title">{todoItem.inputText}</h1>
          </Link>
          <h3 className="decscription">{todoItem.inputTextarea}</h3>
          <div id="txt">
            <b style={{ backgroundColor: "rgb(250, 241, 241)", marginTop: "-40px" }}>{len(todoItem.inputTextarea)}</b>
          </div>
          <div className="btn-01">
            <button className="expand-btn" onClick={() => setSelectedItem(todoItem)}>
              <i className="fa-solid fa-expand"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Header;
