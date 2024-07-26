import React from "react";
import { Link } from "react-router-dom";
function Emoji(props){
    return <div>
       <Link to='/'>Home</Link>
       <Link to='/keeper'>Keeper</Link>
       <Link to='/emoji/:name'>Emoji</Link>
    </div>
}
export default Emoji;