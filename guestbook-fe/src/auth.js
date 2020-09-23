import axios from 'axios'
class Auth{
    constructor() {
        this.authanticated = false;
    }
    
   async loginUser (payload){
        const res =  await axios.post('/users/login/', {
            email: payload.email,
            password: payload.password
        })
        this.authanticated = true;
        //save token to the axios default for other requests
        localStorage.setItem('token', res.data.data['token'])
    }

    async isAuthanticated() {
        return this.authanticated
    }
}

export default new Auth();