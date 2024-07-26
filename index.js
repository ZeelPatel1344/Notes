import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./list";
import Note from "./Note";
import Login from "./Login";
import Register from "./Register";
import PrivateRoute from './PrivateRoute';

function App() {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("notes");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute><Header items={items} setItems={setItems} /></PrivateRoute>} />
        <Route path="/note/:id" element={<PrivateRoute><Note items={items} /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));