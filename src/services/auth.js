import api from './api';

// Named export for login
export const login = async (email, password) => {
  try {
    const response = await api.post('/v1/auth/login', { email, password });

    if (response.data.token) {
      localStorage.setItem('adminToken', response.data.token);
    }

    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Login failed. Please try again.';
  }
};

// Named export for logout (just clears local storage since backend has no logout route)
export const logout = () => {
  localStorage.removeItem('adminToken');
};

// Default export (authService) - unnecessary routes removed
const authService = {
  isAuthenticated: () => {
    return !!localStorage.getItem('adminToken');
  },
  getToken: () => {
    return localStorage.getItem('adminToken');
  }
};

export default authService;
