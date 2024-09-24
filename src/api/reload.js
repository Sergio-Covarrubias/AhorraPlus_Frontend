import axios from './axios';

export const reloadServer = () => axios.get('/reload');
