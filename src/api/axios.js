import axios from 'axios';
console.log(import.meta.env.BACKEND_URL);

const instance = axios.create({
    baseURL: import.meta.env.BACKEND_URL,
    withCredentials: true,
});

export default instance;
