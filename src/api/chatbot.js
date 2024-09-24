import axios from './axios'
import Cookies from 'js-cookie';

export const chatbotRequest = (question) => axios.post(`chatbot?token=${Cookies.get('token')}`, { question: question });