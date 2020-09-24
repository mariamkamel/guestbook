import React, {useEffect, useState} from 'react';
import { useHistory, Link } from "react-router-dom";
import axios from 'axios'
import Reply from '../../components/Reply/Reply.js'
import EditComment from '../../components/EditComment/EditComment.js'

function Comment() {
   
    const [comments , setComments] = useState([{}])
    const [comment , setComment] = useState("")
    const [isLoaded, setIsLoaded] = useState(false)
    const [authorId, setAuthorId] = useState("")

    useEffect(async () => {
     await axios.get('/comments/').then(res => {setComments(res.data); console.log(res.data)}, console.log(comments))
     var base64Url = localStorage['token'].split('.')[1];
     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
     var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
     }).join(''));
   await  setAuthorId(JSON.parse(jsonPayload).id)
     setIsLoaded(true)
    }, []);
    
    useEffect(()=>{
        console.log("comment",comment)
    },[comment])

    async function editComment (editedComment, comment) {
        const res = await axios.patch(`/comments/edit/${comment._id}`,{
            content: editedComment
        })
        window.location.reload(false);
    
    }  

    

    async function deleteComment(comment) {
         const res  = await axios.delete(`/comments/delete/${comment._id}`)
         window.location.reload(false);
         console.log(res)
    
    }  

    async function addComment (event) {
        event.preventDefault();
       const res = await axios.post('/comments',{
            author: authorId,
            content: comment
        })
    }      
    
    async function addReply(reply, comm) {
        const newReply = {
            author: authorId,
            content: reply
        }
        console.log(newReply)
       const res = await axios.patch(`/comments/edit/${comm._id}`,{
            replies: [newReply]
        })
        console.log(res)
    }      
    

    const onChange =async (e) => {
        const {value} = e.target
        await setComment(value)
    }


    
        return (
            <div className=" grid  w-screen h-screen bg-gray-400 ">
                
            <form onSubmit={addComment} className=" flex self-start align-center w-full h-16 p-2 mt-10 ml-2" >
            <input className="w-1/2" type="text" placeholder="Enter your comment" name="comment" id="comment" value={comment} onChange={onChange}/>
            <button className="bg-blue-500 pb-2 px-2 py-2 pt-2" type="submit">ADD COMMENT</button>
            </form>

            <span className="flex self-start w-full text-blue-800 text-xl px-4 pt-3 pb-4 mb-4 font-bold">All Comments</span>
           <ul className=" px-4 pt-3 pb-4 mb-4 ">
                    { !isLoaded? <div>FETCHING COMMENTS</div>: comments.map((comm, index)=>
                    <li className="bg-gray-500 px-4 pt-3 pb-4 mb-4 " key={index}>

                        <div className="bg-gray-200 shadow-2xl  flex items-center rounded px-4 pt-3 pb-4 mb-4">

                            <div className="text-sm">
                            <p className="text-gray-900 leading-none text-lg font-bold mb-2">{comm.author.username}</p>
                            <p className="text-gray-600 font-serif text-xl ml-2 h-1/2   ">{comm.content}</p>
                            {console.log("HHHHHHHH",authorId==comm.author._id, authorId, comm.author._id )}
                            { !(authorId==comm.author._id )?   "" :
                            <div>
                                <EditComment editComment = {editComment} deleteComment={deleteComment} comment ={comm}/> 
                            </div>
                            }
                            
                            <Reply addReply={addReply} comment = {comm}/>
                            
                            </div>
                        </div>
                            <div>        
                                {comm.replies.map((reply, index)=>

                                    <li className=" px-4 pt-3 pb-4 mb-4" key={index}>
                                    <div className="bg-white  flex items-center   rounded px-4 pt-3 pb-4 mb-4">
                                        <div className="text-sm">
                                        <p className="text-gray-900 leading-none text-lg font-bold mb-2">{reply.author.username}</p>
                                        <p className="text-gray-600 font-serif ml-2 ">{reply.content}</p>
                                        </div>
                                    </div>   
                                 </li>)}
                            </div>
                    </li> )}
                        </ul>    
            </div>
        );
            
        
    
}
export default Comment