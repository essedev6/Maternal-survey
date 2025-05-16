import axios from 'axios';

// 1. Create axios instance with better defaults
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Request interceptor (fixed auth token handling)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
     
    } else {
      console.warn('NO TOKEN FOUND in storage');
    }
    return config;
  },
  (error) => Promise.reject(error)
);


// 3. Enhanced response interceptor
api.interceptors.response.use(
  (response) => {
    console.debug('API success:', { 
      url: response.config.url, 
      status: response.status,
      data: response.data 
    });
    return response;
  },
  (error) => {
    const errorDetails = {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.message,
      responseData: error.response?.data,
    };

    console.error('API error:', errorDetails);

    // Custom error messages based on status
    if (error.response) {
      switch (error.response.status) {
        case 401:
          error.message = 'Session expired. Please log in again.';
          break;
        case 403:
          error.message = 'You don’t have permission for this action.';
          break;
        case 404:
          error.message = 'Resource not found.';
          break;
        case 500:
          error.message = 'Server error. Please try again later.';
          break;
        default:
          error.message = error.response.data?.message || 'Request failed';
      }
    } else if (error.code === 'ECONNABORTED') {
      error.message = 'Request timeout. Check your network.';
    }

    return Promise.reject(error);
  }
);

export default api;