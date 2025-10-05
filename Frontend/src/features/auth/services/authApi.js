import apiClient from '../../../services/apiClient';

export const register = async (userData) => {
  try {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

export const login = async (credentials) => {
  try {
    const response = await apiClient.post('/auth/login', credentials);
    // The token is now in a cookie, not in the response body
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

// New function
export const logout = async () => {
  return apiClient.post('/auth/logout');
};

// New function
export const checkStatus = async () => {
  return apiClient.get('/auth/status');
};