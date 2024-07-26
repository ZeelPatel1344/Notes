import React,{useState} from "react";

function Count(){
    // let now = new Date().toLocaleTimeString();
    const [time , settime] =useState("Time");
    const [count , setCount]=useState(0);
    function add()
    {
        setCount(count+1);
    }
    function dec()
    {
        setCount(count-1);
    }
    function gettime(){
        
        const newtime = new Date().toLocaleTimeString();

        settime(newtime);
        // console.log(newtime);
    }
        setInterval(gettime,1000);
    return <div className="con">
        <h1 className="count">{count}</h1>
        <button className="add" onClick={add}>+</button>
        <button className="dec" onClick={dec}>-</button>

        <h1>{time}</h1>
        <button className="timebtn" onClick={gettime}>Get current time</button>
    </div>
}
export default Count;