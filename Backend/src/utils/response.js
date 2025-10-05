const successResponse = (data, message = 'Success') => {
  return {
    success: true,
    message,
    data,
  };
};

module.exports = {
  successResponse,
};