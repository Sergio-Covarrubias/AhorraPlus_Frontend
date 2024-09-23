import axios from './axios'

export const chatbotRequest = (question) => axios.post('/chatbot', { question: question });