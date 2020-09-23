import React, {Component} from 'react';
import axios from 'axios'
import { useHistory } from "react-router-dom";


class Register extends Component {
    state = {
        email: '',
        password: '',
        username: ''
    };
    
    onSubmit = async event => {
        var history = useHistory();
        event.preventDefault();
        const res =  await axios.post('/users/register/', {
            email: this.state.email,
            password: this.state.password,
            username: this.state.username
        })
        console.log(res)
        //redirect to path
    
    }
    
    onChange = event =>{
        console.log("change",event.target.name)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { email, password, username } = this.state
        return (
            <div >
                <form style={{border: "solid"}} onSubmit={this.onSubmit}>
                    <label>Email</label> <br/>
                    <input type="text" id="email" name="email" value={email} onChange={this.onChange} placeholder="email"/> <br/>
                    <label>Username</label> <br/>
                    <input type="text" id="username" name="username" value={username} onChange={this.onChange} placeholder="username"/> <br/>
                    <label>Password</label> <br/>
                    <input type="password" id="password" name="password" value={password} onChange={this.onChange}/> <br/>
                    <button type="submit" >Log in</button>
                 </form>
            </div>
        );
    }
}
export default Register