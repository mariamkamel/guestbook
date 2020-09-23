import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios'
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
            <div >
                <form style={{border: "solid"}} onSubmit={onSubmit}>
                    <label>Email</label> <br/>
                    <input type="text" id="email" name="email" value={email} onChange={onChange} placeholder="email"/> <br/>
                    <label>Password</label> <br/>
                    <input type="password" id="password" name="password" value={password} onChange={onChange}/> <br/>
                    <button type="submit" >Log in</button>
                 </form>
            </div>
        );
    
}
export default Login