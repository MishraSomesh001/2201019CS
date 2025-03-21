
const axios = require('axios');

const BASE_URL = 'http://20.244.56.144/test';

let clientID = null;
let clientSecret = null;
let authToken = null;
let tokenExpiry = null;

const register = async (rollNo, ownerName, ownerEmail, companyName, accessCode) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, {
      companyName,
      ownerName,
      rollNo,
      ownerEmail,
      accessCode
    });
    
    if (response.data && response.data.clientID && response.data.clientSecret) {
      clientID = response.data.clientID;
      clientSecret = response.data.clientSecret;
      return {
        clientID,
        clientSecret,
        companyName: response.data.companyName,
        ownerName: response.data.ownerName,
        ownerEmail: response.data.ownerEmail,
        rollNo: response.data.rollNo
      };
    }
    
    throw new Error('Registration failed: Invalid response');
  } catch (error) {
    console.error('Registration error:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
    throw error;
  }
};

const getAuthToken = async () => {
  const now = Date.now();
  if (authToken && tokenExpiry && now < tokenExpiry) {
    return authToken;
  }
  
  try {
    if (!clientID || !clientSecret) {
      throw new Error('Client credentials not set. Please register first.');
    }
    
    const response = await axios.post(`${BASE_URL}/auth`, {
      clientID,
      clientSecret
    });
    
    if (response.data && response.data.token) {
      authToken = response.data.token;
      // Assuming token expires in 1 hour if not specified
      const expiresIn = response.data.expiresIn || 3600;
      tokenExpiry = now + (expiresIn * 1000);
      return authToken;
    }
    
    throw new Error('Token retrieval failed: Invalid response');
  } catch (error) {
    console.error('Auth token error:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
    throw error;
  }
};

const getAuthHeader = async () => {
  const token = await getAuthToken();
  return {
    'Authorization': `Bearer ${token}`
  };
};

module.exports = {
  register,
  getAuthToken,
  getAuthHeader
};