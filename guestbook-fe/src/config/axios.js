import axios from 'axios';

axios.defaults.baseURL = process.env.SERVER_URL || 'http://localhost:3000';
axios.defaults.headers.common['auth-token'] = localStorage['token']