import axios from "axios";

export const BASE_URL = "https://avowithmie-server.onrender.com/api";

const token = localStorage.getItem('x-auth-token') || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjQwNmJhN2JkNGVjYzMwMmQyOThiN2YiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MTg3MDUwNzB9.ZKZbBONnV8QfA0Ofy4d2l1ke2hLZqFBy4pv7DKscGZA";

export let https = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-auth-token': token
  },
});
