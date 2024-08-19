import axios from 'axios';


const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api', 
  headers: {
    'Content-Type': 'application/json'
  
  }
});

// headers: { ...headers, Authorization: Bearer ${access_token}, timezone: new Date().getTimezoneOffset() },

apiClient.interceptors.request.use(config => {
  const user = localStorage.getItem('user');
  console.log(user);
  
  const token = user ? JSON.parse(user).user.token : null;
  console.log(token);
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default apiClient;