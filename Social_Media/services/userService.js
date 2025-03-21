const { apiRequest } = require('../utils/apiHelper');

const getAllUsers = async () => {
  try {
    const response = await apiRequest('/users');
    return response.users || {};
  } catch (error) {
    console.error('Error fetching users:', error.message);
    throw new Error('Failed to fetch users');
  }
};


const getUserById = async (userId) => {
  try {
    const users = await getAllUsers();
    
    if (users[userId]) {
      return {
        id: userId,
        name: users[userId]
      };
    }
    
    throw new Error('User not found');
  } catch (error) {
    console.error(`Error fetching user ${userId}:`, error.message);
    throw error;
  }
};

const searchUsers = async (searchTerm) => {
  try {
    const users = await getAllUsers();
    const searchTermLower = searchTerm.toLowerCase();
    
    return Object.entries(users)
      .filter(([_, name]) => name.toLowerCase().includes(searchTermLower))
      .map(([id, name]) => ({ id, name }));
  } catch (error) {
    console.error('Error searching users:', error.message);
    throw error;
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  searchUsers
};