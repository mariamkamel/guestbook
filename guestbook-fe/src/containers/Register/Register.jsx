import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
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
       console.log(state.email, state.password, state.username)
        const res =  await axios.post('/users/register/', {
            email: email,
            password: password,
            username: username
        })
        history.push('/login')
        //redirect to path
    
    }
    
    const onChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
        console.log(state.username, state.password, state.email )
    }


     const { email, password, username } = state
        return (
            <div >
                <form style={{border: "solid"}} onSubmit={onSubmit}>
                    <label>Email</label> <br/>
                    <input type="text" id="email" name="email" value={email} onChange={onChange} placeholder="email"/> <br/>
                    <label>Username</label> <br/>
                    <input type="text" id="username" name="username" value={username} onChange={onChange} placeholder="username"/> <br/>
                    <label>Password</label> <br/>
                    <input type="password" id="password" name="password" value={password} onChange={onChange}/> <br/>
                    <button type="submit" >Register</button>
                 </form>
            </div>
        );
    
}
export default Register