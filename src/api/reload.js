import axios from './axios';

export const reloadServer = () => axios.get('/reload');
export const reloadFrontend = () => fetch(import.meta.env.VITE_FRONTEND_URL);
