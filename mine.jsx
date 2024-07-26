import React from 'react';

function Greet(props){
    return <>
     <div className='content'>
            <p>{props.id}</p>
            <h1 className='title'>{props.title}</h1>
            
            <h3 className='note'>{props.content}</h3>
        
        </div>
     </>
}

export default Greet ; 