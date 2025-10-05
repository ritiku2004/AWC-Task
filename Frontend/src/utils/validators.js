// Basic frontend validation helpers

export const isUsernameValid = (username) => {
  const regex = /^[a-zA-Z0-9]{3,30}$/;
  return regex.test(username);
};

export const isPasswordValid = (password) => {
  return password.length >= 6;
};