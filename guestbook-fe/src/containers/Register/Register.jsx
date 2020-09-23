import React, {useState} from 'react';
import { useHistory, Link } from "react-router-dom";
import axios from 'axios'


function Register() {
    let history = useHistory();
    const [state , setState] = useState({
        email : "",
        password : "",
        username: ""
    })
  

   async function onSubmit (event) {
       event.preventDefault();
       console.log("e",state.email, "p",state.password, "u",state.username)
       try{
           const res =  await axios.post('/users/register/', {
               email: state.email,
               password: state.password,
               username: state.username
           })
           history.push('/login')   
       } catch(err){
           console.log(err)
       }
    }
    
    const onChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }


     const { email, password, username } = state
        return (
            <div className="flex justify-center content-center bg-blue-800 h-screen ">
                <div className="flex items-center content-center">

                 <form className="bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
                  <div  className=" flex justify-center font-mono font-bold content-center">
                        <span className="text-center text-blue-800 text-2xl">Register</span>
                  </div>  
                  <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email" >
                            Email
                        </label>
                        <input className="border rounded w-full py-2 px-3 text-gray-700 " id="email" type="text" placeholder="Email"  value={email} onChange={onChange}/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username" >
                            Username
                        </label>
                        <input className="border rounded w-full py-2 px-3 text-gray-700 " id="username" type="text" placeholder="Username"  value={username} onChange={onChange}/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input className="border rounded w-full py-2 px-3 text-gray-700 " id="password" type="password" placeholder="Password" value={password} onChange={onChange} />
                    </div>
                    <div className="flex justify-center mb-2">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Register
                        </button>
                    </div>
                    <p className="text-center text-gray-500 text-xs">
                    
                    <Link className="text-blue-500 hover:text-blue-800" to="/login">Login</Link>
                    </p>
                </form>
             </div>
        </div> 
        );
    
}
export default Register