import React from "react";
// import { useParams  } from "react-router-dom";
import { Link } from "react-router-dom";
function Form(){
  // const param = useParams();
    return <div>
       <h2 className="header" id="full">Notes</h2>
      <div className="navblock">

      <Link className="nav" to='/'>Home</Link>
       <Link className="nav nav2" to='/aboutus'>About Us</Link>
      </div>
        <h1 style={{marginTop:"30px"}}>It's Aboutus page</h1>
       
    </div>
}
export default Form;