import axios from 'axios';
import 'dotenv/config';

const instance = axios.create({
    baseURL: process.env.BACKEND_URL,
    withCredentials: true,
});

export default instance;
