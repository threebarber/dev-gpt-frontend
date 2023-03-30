import axios from 'axios'

export const sendQuery = query =>
  axios.post("/ai", {prompt: query} ).then(res => res.data)


