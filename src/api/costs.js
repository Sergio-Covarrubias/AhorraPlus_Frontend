import axios from './axios';
import Cookies from 'js-cookie';

export const saveFixedCostsRequest = (earnings, fixedCosts) => axios.post(`/fixedcosts?token=${Cookies.get('token')}`, { earnings, fixedCosts });
export const getFixedCostsRequest = () => axios.get(`/fixedcosts?token=${Cookies.get('token')}`);

export const saveRangeCostsRequest = (rangeCosts) => axios.post(`/rangecosts?token=${Cookies.get('token')}`, rangeCosts);
export const getRangeCostsRequest = () => axios.get(`/rangecosts?token=${Cookies.get('token')}`);
