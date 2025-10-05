import apiClient from '../../../services/apiClient';

/**
 * Sends a request to the backend to create a new room.
 * @param {object} roomData - { name: string }
 * @returns {Promise<object>} The newly created room data.
 */
export const createRoom = async (roomData) => {
  try {
    const response = await apiClient.post('/rooms/create', roomData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create room');
  }
};