import axios from 'axios'

export const BASE_URL = 'https://avowithmie-server.onrender.com/api'

export let https = axios.create({
  baseURL: BASE_URL
})
