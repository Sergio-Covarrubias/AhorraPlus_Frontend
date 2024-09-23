import axios from './axios';

export const saveFixedCostsRequest = (earnings, fixedCosts) => axios.post('/fixedcosts', { earnings, fixedCosts });
export const getFixedCostsRequest = () => axios.get('/fixedcosts');

export const saveRangeCostsRequest = (rangeCosts) => axios.post('/rangecosts', rangeCosts);
export const getRangeCostsRequest = () => axios.get('/rangecosts');
