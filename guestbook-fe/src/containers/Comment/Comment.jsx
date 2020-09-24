import React, {useEffect, useState} from 'react';
import { useHistory, Link } from "react-router-dom";
import axios from 'axios'
import Reply from '../../components/Reply/Reply.js'
function Comment() {
   
    const [comments , setComments] = useState([{}])
    const [comment , setComment] = useState("")
    const [reply , setReply] = useState([""])
    const [editedComment , setEditedComment] = useState("")
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

    async function editComment (comment) {
        // const res = await axios.patch(`/comment/edit/${comment._id}`,{
        //     content: 
        // })
        // window.location.reload(false);
    
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



    const onEditCommentChange =async (e) => {
        const {value} = e.target
        await setEditedComment(value)
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

                           <form onSubmit={editComment} className=" flex self-start align-center  h-16 p-2 mt-10 ml-2" >
                                 <input className="text-gray-600 font-serif text-xl ml-2 h-1/2 border border-gray-700" name="editedComment" id="editedComment" onChange={onEditCommentChange} value={editedComment} />
                                  <button  className="bg-blue-500 pb-2 px-2 py-2 pt-2" type="submit" >Edit Comment</button>

                                   <button onClick={()=>{deleteComment(comm)}} className="ml-4">
                                    <img style={{"width":"auto", "height":"25px"}} src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUxMnB0IiB2aWV3Qm94PSItNDcgMCA1MTIgNTEyIiB3aWR0aD0iNTEycHQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0ibTQxNi44NzUgMTE0LjQ0MTQwNi0xMS4zMDQ2ODgtMzMuODg2NzE4Yy00LjMwNDY4Ny0xMi45MDYyNS0xNi4zMzk4NDMtMjEuNTc4MTI2LTI5Ljk0MTQwNi0yMS41NzgxMjZoLTk1LjAxMTcxOHYtMzAuOTMzNTkzYzAtMTUuNDYwOTM4LTEyLjU3MDMxMy0yOC4wNDI5NjktMjguMDI3MzQ0LTI4LjA0Mjk2OWgtODcuMDA3ODEzYy0xNS40NTMxMjUgMC0yOC4wMjczNDMgMTIuNTgyMDMxLTI4LjAyNzM0MyAyOC4wNDI5Njl2MzAuOTMzNTkzaC05NS4wMDc4MTNjLTEzLjYwNTQ2OSAwLTI1LjY0MDYyNSA4LjY3MTg3Ni0yOS45NDUzMTMgMjEuNTc4MTI2bC0xMS4zMDQ2ODcgMzMuODg2NzE4Yy0yLjU3NDIxOSA3LjcxNDg0NC0xLjI2OTUzMTIgMTYuMjU3ODEzIDMuNDg0Mzc1IDIyLjg1NTQ2OSA0Ljc1MzkwNiA2LjU5NzY1NiAxMi40NDUzMTIgMTAuNTM5MDYzIDIwLjU3ODEyNSAxMC41MzkwNjNoMTEuODE2NDA2bDI2LjAwNzgxMyAzMjEuNjA1NDY4YzEuOTMzNTk0IDIzLjg2MzI4MiAyMi4xODM1OTQgNDIuNTU4NTk0IDQ2LjEwOTM3NSA0Mi41NTg1OTRoMjA0Ljg2MzI4MWMyMy45MjE4NzUgMCA0NC4xNzU3ODEtMTguNjk1MzEyIDQ2LjEwNTQ2OS00Mi41NjI1bDI2LjAwNzgxMi0zMjEuNjAxNTYyaDYuNTQyOTY5YzguMTMyODEyIDAgMTUuODI0MjE5LTMuOTQxNDA3IDIwLjU3ODEyNS0xMC41MzUxNTcgNC43NTM5MDYtNi41OTc2NTYgNi4wNTg1OTQtMTUuMTQ0NTMxIDMuNDg0Mzc1LTIyLjg1OTM3NXptLTI0OS4zMjAzMTItODQuNDQxNDA2aDgzLjA2MjV2MjguOTc2NTYyaC04My4wNjI1em0xNjIuODA0Njg3IDQzNy4wMTk1MzFjLS42Nzk2ODcgOC40MDIzNDQtNy43OTY4NzUgMTQuOTgwNDY5LTE2LjIwMzEyNSAxNC45ODA0NjloLTIwNC44NjMyODFjLTguNDA2MjUgMC0xNS41MjM0MzgtNi41NzgxMjUtMTYuMjAzMTI1LTE0Ljk4MDQ2OWwtMjUuODE2NDA2LTMxOS4xODM1OTNoMjg4Ljg5ODQzN3ptLTI5OC41NjY0MDYtMzQ5LjE4MzU5MyA5LjI2OTUzMS0yNy43ODkwNjNjLjIxMDkzOC0uNjQwNjI1LjgwODU5NC0xLjA3MDMxMyAxLjQ4NDM3NS0xLjA3MDMxM2gzMzMuMDgyMDMxYy42NzU3ODIgMCAxLjI2OTUzMi40Mjk2ODggMS40ODQzNzUgMS4wNzAzMTNsOS4yNjk1MzEgMjcuNzg5MDYzem0wIDAiLz48cGF0aCBkPSJtMjgyLjUxNTYyNSA0NjUuOTU3MDMxYy4yNjU2MjUuMDE1NjI1LjUyNzM0NC4wMTk1MzEuNzkyOTY5LjAxOTUzMSA3LjkyNTc4MSAwIDE0LjU1MDc4MS02LjIxMDkzNyAxNC45NjQ4NDQtMTQuMjE4NzVsMTQuMDg1OTM3LTI3MC4zOTg0MzdjLjQyOTY4Ny04LjI3MzQzNy01LjkyOTY4Ny0xNS4zMzIwMzEtMTQuMTk5MjE5LTE1Ljc2MTcxOS04LjI5Mjk2OC0uNDQxNDA2LTE1LjMyODEyNSA1LjkyNTc4Mi0xNS43NjE3MTggMTQuMTk5MjE5bC0xNC4wODIwMzIgMjcwLjM5ODQzN2MtLjQyOTY4NyA4LjI3MzQzOCA1LjkyNTc4MiAxNS4zMzIwMzIgMTQuMTk5MjE5IDE1Ljc2MTcxOXptMCAwIi8+PHBhdGggZD0ibTEyMC41NjY0MDYgNDUxLjc5Mjk2OWMuNDM3NSA3Ljk5NjA5MyA3LjA1NDY4OCAxNC4xODM1OTMgMTQuOTY0ODQ0IDE0LjE4MzU5My4yNzM0MzggMCAuNTU0Njg4LS4wMDc4MTIuODMyMDMxLS4wMjM0MzcgOC4yNjk1MzEtLjQ0OTIxOSAxNC42MDkzNzUtNy41MTk1MzEgMTQuMTYwMTU3LTE1Ljc5Mjk2OWwtMTQuNzUzOTA3LTI3MC4zOTg0MzdjLS40NDkyMTktOC4yNzM0MzgtNy41MTk1MzEtMTQuNjEzMjgxLTE1Ljc5Mjk2OS0xNC4xNjAxNTctOC4yNjk1MzEuNDQ5MjE5LTE0LjYwOTM3NCA3LjUxOTUzMi0xNC4xNjAxNTYgMTUuNzkyOTY5em0wIDAiLz48cGF0aCBkPSJtMjA5LjI1MzkwNiA0NjUuOTc2NTYyYzguMjg1MTU2IDAgMTUtNi43MTQ4NDMgMTUtMTV2LTI3MC4zOTg0MzdjMC04LjI4NTE1Ni02LjcxNDg0NC0xNS0xNS0xNXMtMTUgNi43MTQ4NDQtMTUgMTV2MjcwLjM5ODQzN2MwIDguMjg1MTU3IDYuNzE0ODQ0IDE1IDE1IDE1em0wIDAiLz48L3N2Zz4=" />                            
                                   </button>
                             </form>
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