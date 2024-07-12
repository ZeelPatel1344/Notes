import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [inputText, setInputText] = useState("");
  const [inputTextarea, setInputTextarea] = useState("");
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("notes");
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const popupRef = useRef(null);

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

    if (isEditing) {
      setItems((prevItems) =>
        prevItems.map((item, index) =>
          index === editIndex ? { inputText, inputTextarea } : item
        )
      );
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setItems((prevItems) => [
        ...prevItems,
        { inputText, inputTextarea },
      ]);
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

  return (
    <div>
      <h2 className="header" id="full">Notes</h2>
      <div className="navblock">
        <Link className="nav" to="/">Home</Link>
        <Link className="nav nav2" to="/aboutus">About Us</Link>
      </div>
      <button onClick={handleOpenPopup} className="btn">+ Add Note</button>

      {showPopup && (
        <div className="modal-overlay2" onClick={handleClosePopup}>
          <div className="modal-content2" ref={popupRef} onClick={(e) => e.stopPropagation()}>
            <button className="exp" onClick={handleClosePopup}>X</button>
            <form onSubmit={addItem}>
              <textarea
                placeholder="Title"
                name="title"
                className="form1"
                onChange={handleChange}
                type="text"
                value={inputText}
                required
              />
              <br />
              <textarea
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
                {isEditing ? "Update" : "Add"}
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

      {items.map((todoItem, index) => (
        <div className="content" key={index} id="full">
          <div className="d">
            <button onClick={() => deleteItem(index)} style={{ border: "none", cursor: "pointer" }}>
              <i className="fa fa-trash" aria-hidden="true"></i>
            </button>
          </div>
          <div className="e">
            <button onClick={() => editItem(index)} style={{ border: "none", cursor: "pointer" }}>
              <i style={{ marginLeft: "-140px" }} className="fas fa-edit"></i>
            </button>
          </div>
          <h1 className="title">{todoItem.inputText}</h1>
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
