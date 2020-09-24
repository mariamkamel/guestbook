import React, {useEffect, useState} from 'react';
import { useHistory, Link } from "react-router-dom";
import axios from 'axios'

function Comment() {
   
    const [comments , setComments] = useState([{}])
    const [comment , setComment] = useState("")
    const [editedComment , setEditedComment] = useState("")
    const [isLoaded, setIsLoaded] = useState(false)
    const [authorId, setAuthorId] = useState("")
    useEffect(async () => {
     await axios.get('/comments/').then(res => {setComments(res.data); console.log(res.data)}, console.log(comments))
     setIsLoaded(true)
     var base64Url = localStorage['token'].split('.')[1];
     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
     var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
     }).join(''));
     setAuthorId(JSON.parse(jsonPayload).id)

    }, []);
    
    useEffect(()=>{
        console.log("comment",comment)
    },[comment])

 

    async function deleteComment(comment) {
         const res  = await axios.delete(`/comments/delete/${comment._id}`)
         window.localion.reload(false);
         console.log(res)
    
    }  

    async function addComment (event) {
        event.preventDefault();
       const res = await axios.post('/comments',{
            author: authorId,
            content: comment
        })
    }        

    const onChange =async (e) => {
        console.log(e.target, comment )
        
        const {value} = e.target
        console.log(comment)
            await setComment(value)
    }

        return (
            <div className=" grid flex items-center content-center w-screen h-screen bg-gray-400 ">

            <form onSubmit={addComment} className=" flex self-start align-center w-full h-16 p-2 mt-10 ml-2" >
            <input className="w-1/2" type="text" placeholder="Enter your comment" name="comment" id="comment" value={comment} onChange={onChange}/>
            <button className="bg-blue-500 pb-2 px-2 py-2 pt-2" type="submit">ADD COMMENT</button>
            </form>

            <span className="flex self-start w-full text-blue-800 text-xl px-4 pt-3 pb-4 mb-4 font-bold">All Comments</span>
           <ul className=" px-4 pt-3 pb-4 mb-4 ">
                    { !isLoaded? <div>FETCHING COMMENTS</div>: comments.map((comm)=>
                    <li className="bg-gray-500 px-4 pt-3 pb-4 mb-4 ">
                        <div className="bg-white shadow-2xl  flex items-centerrounded px-4 pt-3 pb-4 mb-4">
                            <div className="text-sm">
                            <p className="text-gray-900 leading-none text-lg font-bold mb-2">{comm.author.username}</p>
                            <p className="text-gray-600 font-serif ml-2 ">{comm.content}</p>
                            <div className=" grid grid-rows-1 grid-flow-col m-2 ">
                                   <button onClick={()=>{deleteComment(comm)}}>
                                    <img style={{"width":"auto", "height":"15px"}} src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUxMnB0IiB2aWV3Qm94PSItNDcgMCA1MTIgNTEyIiB3aWR0aD0iNTEycHQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0ibTQxNi44NzUgMTE0LjQ0MTQwNi0xMS4zMDQ2ODgtMzMuODg2NzE4Yy00LjMwNDY4Ny0xMi45MDYyNS0xNi4zMzk4NDMtMjEuNTc4MTI2LTI5Ljk0MTQwNi0yMS41NzgxMjZoLTk1LjAxMTcxOHYtMzAuOTMzNTkzYzAtMTUuNDYwOTM4LTEyLjU3MDMxMy0yOC4wNDI5NjktMjguMDI3MzQ0LTI4LjA0Mjk2OWgtODcuMDA3ODEzYy0xNS40NTMxMjUgMC0yOC4wMjczNDMgMTIuNTgyMDMxLTI4LjAyNzM0MyAyOC4wNDI5Njl2MzAuOTMzNTkzaC05NS4wMDc4MTNjLTEzLjYwNTQ2OSAwLTI1LjY0MDYyNSA4LjY3MTg3Ni0yOS45NDUzMTMgMjEuNTc4MTI2bC0xMS4zMDQ2ODcgMzMuODg2NzE4Yy0yLjU3NDIxOSA3LjcxNDg0NC0xLjI2OTUzMTIgMTYuMjU3ODEzIDMuNDg0Mzc1IDIyLjg1NTQ2OSA0Ljc1MzkwNiA2LjU5NzY1NiAxMi40NDUzMTIgMTAuNTM5MDYzIDIwLjU3ODEyNSAxMC41MzkwNjNoMTEuODE2NDA2bDI2LjAwNzgxMyAzMjEuNjA1NDY4YzEuOTMzNTk0IDIzLjg2MzI4MiAyMi4xODM1OTQgNDIuNTU4NTk0IDQ2LjEwOTM3NSA0Mi41NTg1OTRoMjA0Ljg2MzI4MWMyMy45MjE4NzUgMCA0NC4xNzU3ODEtMTguNjk1MzEyIDQ2LjEwNTQ2OS00Mi41NjI1bDI2LjAwNzgxMi0zMjEuNjAxNTYyaDYuNTQyOTY5YzguMTMyODEyIDAgMTUuODI0MjE5LTMuOTQxNDA3IDIwLjU3ODEyNS0xMC41MzUxNTcgNC43NTM5MDYtNi41OTc2NTYgNi4wNTg1OTQtMTUuMTQ0NTMxIDMuNDg0Mzc1LTIyLjg1OTM3NXptLTI0OS4zMjAzMTItODQuNDQxNDA2aDgzLjA2MjV2MjguOTc2NTYyaC04My4wNjI1em0xNjIuODA0Njg3IDQzNy4wMTk1MzFjLS42Nzk2ODcgOC40MDIzNDQtNy43OTY4NzUgMTQuOTgwNDY5LTE2LjIwMzEyNSAxNC45ODA0NjloLTIwNC44NjMyODFjLTguNDA2MjUgMC0xNS41MjM0MzgtNi41NzgxMjUtMTYuMjAzMTI1LTE0Ljk4MDQ2OWwtMjUuODE2NDA2LTMxOS4xODM1OTNoMjg4Ljg5ODQzN3ptLTI5OC41NjY0MDYtMzQ5LjE4MzU5MyA5LjI2OTUzMS0yNy43ODkwNjNjLjIxMDkzOC0uNjQwNjI1LjgwODU5NC0xLjA3MDMxMyAxLjQ4NDM3NS0xLjA3MDMxM2gzMzMuMDgyMDMxYy42NzU3ODIgMCAxLjI2OTUzMi40Mjk2ODggMS40ODQzNzUgMS4wNzAzMTNsOS4yNjk1MzEgMjcuNzg5MDYzem0wIDAiLz48cGF0aCBkPSJtMjgyLjUxNTYyNSA0NjUuOTU3MDMxYy4yNjU2MjUuMDE1NjI1LjUyNzM0NC4wMTk1MzEuNzkyOTY5LjAxOTUzMSA3LjkyNTc4MSAwIDE0LjU1MDc4MS02LjIxMDkzNyAxNC45NjQ4NDQtMTQuMjE4NzVsMTQuMDg1OTM3LTI3MC4zOTg0MzdjLjQyOTY4Ny04LjI3MzQzNy01LjkyOTY4Ny0xNS4zMzIwMzEtMTQuMTk5MjE5LTE1Ljc2MTcxOS04LjI5Mjk2OC0uNDQxNDA2LTE1LjMyODEyNSA1LjkyNTc4Mi0xNS43NjE3MTggMTQuMTk5MjE5bC0xNC4wODIwMzIgMjcwLjM5ODQzN2MtLjQyOTY4NyA4LjI3MzQzOCA1LjkyNTc4MiAxNS4zMzIwMzIgMTQuMTk5MjE5IDE1Ljc2MTcxOXptMCAwIi8+PHBhdGggZD0ibTEyMC41NjY0MDYgNDUxLjc5Mjk2OWMuNDM3NSA3Ljk5NjA5MyA3LjA1NDY4OCAxNC4xODM1OTMgMTQuOTY0ODQ0IDE0LjE4MzU5My4yNzM0MzggMCAuNTU0Njg4LS4wMDc4MTIuODMyMDMxLS4wMjM0MzcgOC4yNjk1MzEtLjQ0OTIxOSAxNC42MDkzNzUtNy41MTk1MzEgMTQuMTYwMTU3LTE1Ljc5Mjk2OWwtMTQuNzUzOTA3LTI3MC4zOTg0MzdjLS40NDkyMTktOC4yNzM0MzgtNy41MTk1MzEtMTQuNjEzMjgxLTE1Ljc5Mjk2OS0xNC4xNjAxNTctOC4yNjk1MzEuNDQ5MjE5LTE0LjYwOTM3NCA3LjUxOTUzMi0xNC4xNjAxNTYgMTUuNzkyOTY5em0wIDAiLz48cGF0aCBkPSJtMjA5LjI1MzkwNiA0NjUuOTc2NTYyYzguMjg1MTU2IDAgMTUtNi43MTQ4NDMgMTUtMTV2LTI3MC4zOTg0MzdjMC04LjI4NTE1Ni02LjcxNDg0NC0xNS0xNS0xNXMtMTUgNi43MTQ4NDQtMTUgMTV2MjcwLjM5ODQzN2MwIDguMjg1MTU3IDYuNzE0ODQ0IDE1IDE1IDE1em0wIDAiLz48L3N2Zz4=" />                            
                                   </button>
                                   <button onClick={()=>{editComment(comm)}}>
                                        <img  style={{"width":"15px", "height":"15px"}}src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjQ4NHB0IiB2aWV3Qm94PSItMTUgLTE1IDQ4NC4wMDAxOSA0ODQiIHdpZHRoPSI0ODRwdCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtNDAxLjY0ODQzOCAxOC4yMzQzNzVjLTI0LjM5NDUzMi0yNC4zNTE1NjMtNjMuODk4NDM4LTI0LjM1MTU2My04OC4yOTI5NjkgMGwtMjIuMTAxNTYzIDIyLjIyMjY1Ni0yMzUuMjY5NTMxIDIzNS4xNDQ1MzEtLjUuNTAzOTA3Yy0uMTIxMDk0LjEyMTA5My0uMTIxMDk0LjI1LS4yNS4yNS0uMjUuMzc1LS42MjUuNzQ2MDkzLS44NzEwOTQgMS4xMjEwOTMgMCAuMTI1LS4xMjg5MDYuMTI1LS4xMjg5MDYuMjUtLjI1LjM3NS0uMzcxMDk0LjYyNS0uNjI1IDEtLjEyMTA5NC4xMjUtLjEyMTA5NC4yNDYwOTQtLjI0NjA5NC4zNzUtLjEyNS4zNzUtLjI1LjYyNS0uMzc4OTA2IDEgMCAuMTIxMDk0LS4xMjEwOTQuMTIxMDk0LS4xMjEwOTQuMjVsLTUyLjE5OTIxOSAxNTYuOTY4NzVjLTEuNTMxMjUgNC40Njg3NS0uMzY3MTg3IDkuNDE3OTY5IDIuOTk2MDk0IDEyLjczNDM3NiAyLjM2MzI4MiAyLjMzMjAzMSA1LjU1MDc4MiAzLjYzNjcxOCA4Ljg2NzE4OCAzLjYyNSAxLjM1NTQ2OC0uMDIzNDM4IDIuNjk5MjE4LS4yMzQzNzYgMy45OTYwOTQtLjYyNWwxNTYuODQ3NjU2LTUyLjMyNDIxOWMuMTIxMDk0IDAgLjEyMTA5NCAwIC4yNS0uMTIxMDk0LjM5NDUzMS0uMTE3MTg3Ljc3MzQzNy0uMjg1MTU2IDEuMTIxMDk0LS41MDM5MDYuMDk3NjU2LS4wMTE3MTkuMTgzNTkzLS4wNTQ2ODguMjUzOTA2LS4xMjEwOTQuMzcxMDk0LS4yNS44NzEwOTQtLjUwMzkwNiAxLjI0NjA5NC0uNzUzOTA2LjM3MTA5My0uMjQ2MDk0Ljc1LS42MjEwOTQgMS4xMjUtLjg3MTA5NC4xMjUtLjEyODkwNi4yNDYwOTMtLjEyODkwNi4yNDYwOTMtLjI1LjEyODkwNy0uMTI1LjM3ODkwNy0uMjQ2MDk0LjUwMzkwNy0uNWwyNTcuMzcxMDkzLTI1Ny4zNzEwOTRjMjQuMzUxNTYzLTI0LjM5NDUzMSAyNC4zNTE1NjMtNjMuODk4NDM3IDAtODguMjg5MDYyem0tMjMyLjI3MzQzOCAzNTMuMTQ4NDM3LTg2LjkxNDA2Mi04Ni45MTAxNTYgMjE3LjUzNTE1Ni0yMTcuNTM1MTU2IDg2LjkxNDA2MiA4Ni45MTAxNTZ6bS05OS4xNTYyNS02My44MDg1OTMgNzUuOTI5Njg4IDc1LjkyNTc4MS0xMTQuMDE1NjI2IDM3Ljk2MDkzOHptMzQ3LjY2NDA2Mi0xODQuODIwMzEzLTEzLjIzODI4MSAxMy4zNjMyODItODYuOTE3OTY5LTg2LjkxNzk2OSAxMy4zNjcxODgtMTMuMzU5Mzc1YzE0LjYyMTA5NC0xNC42MDkzNzUgMzguMzIwMzEyLTE0LjYwOTM3NSA1Mi45NDUzMTIgMGwzMy45NjQ4NDQgMzMuOTY0ODQ0YzE0LjUxMTcxOSAxNC42ODc1IDE0LjQ1NzAzMiAzOC4zMzIwMzEtLjEyMTA5NCA1Mi45NDkyMTh6bTAgMCIvPjwvc3ZnPg==" />
                                   </button>
                            </div>
                            </div>
                        </div>
                            <div>
                                {comm.replies.map((reply)=>

                                    <li className=" px-4 pt-3 pb-4 mb-4">
                                    <div className="bg-white  flex items-center   rounded px-4 pt-3 pb-4 mb-4">
                                        <div className="text-sm">
                                        <p className="text-gray-900 leading-none text-lg font-bold mb-2">{reply.author.username}</p>
                                        <p className="text-gray-600 font-serif ml-2 ">{reply.content}</p>
                                        </div>
                                    </div>   
                                 </li>
                                )
                                }
                            </div>

                    </li>
                        )}
                        </ul>    
            </div>
        );
            
        
    
}
export default Comment