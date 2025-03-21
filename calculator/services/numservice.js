
const axios = require('axios');
const authService = require('./auth');

const API_TIMEOUT = 500;

const API_ENDPOINTS = {
  p: 'http://20.244.56.144/test/primes',
  f: 'http://20.244.56.144/test/fibo',
  e: 'http://20.244.56.144/test/fibo',
  r: 'http://20.244.56.144/test/rand'
};

const fetchNumbers = async (numberType) => {
  // Validate number type
  if (!['p', 'f', 'e', 'r'].includes(numberType)) {
    throw new Error('Invalid number type. Must be one of: p, f, e, r');
  }
  
  try {
    const headers = await authService.getAuthHeader();
    
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timed out')), API_TIMEOUT);
    });
    const requestPromise = axios.get(API_ENDPOINTS[numberType], { headers });

    const response = await Promise.race([requestPromise, timeoutPromise]);

    if (response.data && Array.isArray(response.data.numbers)) {
      return response.data.numbers;
    }
    
    throw new Error('Invalid response format from numbers API');
  } catch (error) {
    console.error(`Error fetching ${numberType} numbers:`, error.message);
    return []; 
  }
};

module.exports = {
  fetchNumbers
};