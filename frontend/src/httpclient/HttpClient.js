// httpClient.js

import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://localhost:8010',
});

// Add a request interceptor
httpClient.interceptors.request.use(
  (config) => {
    // Do something before sending the request
    return config;
  },
  (error) => {
    // Do something with the request error
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor to catch CORS errors or any other response errors
httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 403) {
      console.error('CORS Error: Forbidden');
    } else if (error.response && error.response.status === 401) {
      console.error('Unauthorized Access: Invalid credentials');
    } else if (error.message === 'Network Error') {
      console.error('Network Error: CORS issue or server is down');
    } else {
      console.error('Response Error:', error);
    }
    return Promise.reject(error);
  }
);

export { httpClient };
