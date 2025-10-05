import apiClient from '../../../services/apiClient';

export const getChatHistory = async (roomId) => {
  try {
    const response = await apiClient.get(`/chat/${roomId}`);
    // The actual messages are inside response.data.data
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch chat history", error);
    throw new Error(error.response?.data?.message || 'Failed to fetch chat history');
  }
};