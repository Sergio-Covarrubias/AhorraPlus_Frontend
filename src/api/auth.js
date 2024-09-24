import axios from './axios';
import Cookies from 'js-cookie';

export const registerRequest = user => axios.post('/register', user);
export const loginRequest = user => axios.post('/login', user);
export const verifyTokenRequest = () => axios.get(`/verify?token=${Cookies.get('token')}`);
