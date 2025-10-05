// Helper functions related to authentication logic

export const getToken = () => {
  try {
    return localStorage.getItem('authToken');
  } catch (e) {
    return null;
  }
};

export const setToken = (token) => {
  try {
    localStorage.setItem('authToken', token);
  } catch (e) {
    console.error('Failed to set token in localStorage');
  }
};

export const removeToken = () => {
  try {
    localStorage.removeItem('authToken');
  } catch (e) {
    console.error('Failed to remove token from localStorage');
  }
};

export const getUserFromToken = () => {
    const token = getToken();
    if (!token) return null;
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        // This is a simplified decode, for real apps, use a library like jwt-decode
        // The sub claim usually holds the user ID
        return { id: payload.sub };
    } catch(e) {
        return null;
    }
}