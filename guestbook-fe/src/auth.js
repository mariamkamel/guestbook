import axios from 'axios'

    
    const loginUser = async (payload) => {
        try{

            const res =  await axios.post('/users/login/', {
                email: payload.email,
                password: payload.password
            })
            localStorage.setItem('token', res.data.data['token'])
            axios.defaults.headers.common['auth-token'] = res.data.data['token']    
         return true
        }
        catch(err){

            console.log(err)
        }
        return false;

    }

export default loginUser