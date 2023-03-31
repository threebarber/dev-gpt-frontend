import axios from 'axios';

export const sendQuery = query =>
    axios.post('/api/ai', { prompt: query }).then(res => res.data);

export const getPrompts = () => 
    axios.get('/api/prompts').then(res => res.data);
