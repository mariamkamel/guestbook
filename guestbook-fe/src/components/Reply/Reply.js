import React, { useState } from 'react';

function Reply (props)  {
    const [reply, setReply] = useState('')
    const editChange =async (e) => {
        const {value} = e.target
        await setReply(value)
    }
return(
    <form onSubmit={(e)=>{console.log("hereee"); e.preventDefault(); console.log("hereee"); props.addReply(reply, props.comment)}} className=" flex  self-start align-center w-full h-16 p-2 mt-10 ml-2" >
    <input className="w-1/2 shadow-2xl " type="text" placeholder="Add a reply" name="reply" id="reply" value={reply} onChange={editChange}/>
    <button className="bg-blue-500 pb-2 px-2 py-2 pt-2" type="submit">ADD REPLY</button>
</form>
);
}



export default Reply;
