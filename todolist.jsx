import React, { useState } from "react";

function List()
{
    const [text , settext]=useState("");
    const [item , setitem]=useState([]);

    function handelchange(event)
    {
       const newvalue= event.target.value;
       settext(newvalue);
    }
    function additem(){
        setitem( (previous) =>{
            return [...previous,text];
        });
        settext("");
    }

    return <div>
        <input onChange={handelchange} type="text" value={settext} />
        <button onClick={additem}>submit</button>
        {item.map( todo => (
            <li>{item}</li>
        ))}
    </div>
}
export default List;