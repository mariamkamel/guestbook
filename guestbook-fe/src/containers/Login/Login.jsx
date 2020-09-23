import React, {Component} from 'react';
import auth from '../../auth'
class Login extends Component {
    state = {
        email: '',
        password: ''
    };

    onSubmit = async event => {
        event.preventDefault();
        console.log(this.state.password)
        auth.loginUser(
            {email: this.state.email, 
            password: this.state.password
        })        
    }
    
    onChange = event =>{
        console.log("change",event.target.name)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { email, password } = this.state
        return (
            <div >
                <form style={{border: "solid"}} onSubmit={this.onSubmit}>
                    <label>Email</label> <br/>
                    <input type="text" id="email" name="email" value={email} onChange={this.onChange} placeholder="emai"/> <br/>
                    <label>Password</label> <br/>
                    <input type="password" id="password" name="password" value={password} onChange={this.onChange}/> <br/>
                    <button type="submit" >Log in</button>
                 </form>
            </div>
        );
    }
}
export default Login