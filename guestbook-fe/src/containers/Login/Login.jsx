import React, {useState} from 'react';
import { useHistory, Link } from "react-router-dom";
import  loginUser  from '../../auth'

function Login() {
    let history = useHistory();
    const [state , setState] = useState({
        email : "",
        password : "",
    })
  

   async function onSubmit (event) {
        event.preventDefault();
        const res = await loginUser(
            {email: state.email, 
            password: state.password
        })
        
     if(res) history.push('/comments')
    }        
    
    const onChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }


     const { email, password } = state
        return (
            <div className=" flex justify-center content-center  ">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email" >
                        Email
                    </label>
                    <input className="border rounded w-full py-2 px-3 text-gray-700 " id="email" type="text" placeholder="Email"  value={email} onChange={onChange}/>
                 </div>
                 <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input className="border rounded w-full py-2 px-3 text-gray-700 " id="password" type="password" placeholder="Password"value={password} onChange={onChange} />
                 </div>
                 <div className="flex justify-center ">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Sign In
                    </button>
                 </div>
                 <p className="text-center text-gray-500 text-xs">
                   Don't have an account? <br/>
                   <Link className="text-blue-500 hover:text-blue-800" to="/register">Sign up here</Link>
                </p>
            </form>
        </div> 
 
        );
    
}
export default Login