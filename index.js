import React from "react";
import ReactDom from "react-dom";
import Header from "./list";
// import App from "./form";
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BrowserRouter, Routes , Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Form from "./form";
import Emoji from "./emoji";
// import Footer from "./footer";
// import Greet from "./mine";
// import Footer from "./footer";
// import contacts from "./contents";
// import notes from "./contents";
// import Count from "./counter";
// import Form from "./form";
// import List from "./todolist";

   


ReactDom.render(
    <div>
        {/* // it's a keeper app */}
        {/* <Header /> */}
        {/* <Router> */}
        
            <BrowserRouter>
      {/* <Routes> */}
        <Routes>

        <Route path="/" element={<Header />} />
        <Route path="/aboutus" element={<Form />} />
        </Routes>
      {/* </Routes> */}
      </BrowserRouter>

    {/* </Router> */}
        {/* <Heade /> */}
        {/* <App /> */}
        {/* {notes.map( (contact)=>
         <Greet 
        id = {contact.id}
        title={contact.title}
        content={contact.content}
        
         />
    )} */}
        {/* <Count /> */}

        {/* <Form /> */}
        {/* <List /> */}
       {/* {emojipedia.map(emojii)} */}
        {/* <Greet title="this is the note title" content="this is the note content" />
        <Greet title="this is the second note title" content="this is the second note content" /> */}
           {/* <Footer /> */}
    </div>
    ,document.getElementById("root")
);
