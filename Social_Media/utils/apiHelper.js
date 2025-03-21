const axios = require('axios');
const cache = require('memory-cache');

const BASE_URL = 'http://20.244.56.144/test';

const CACHE_DURATION = 5 * 60 * 1000;

const apiRequest = async (endpoint, params = {}) => {
  try {
    const url = `${BASE_URL}${endpoint}`;
    const cacheKey = `${url}:${JSON.stringify(params)}`;
    
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const response = await axios.get(url, { params });

    cache.put(cacheKey, response.data, CACHE_DURATION);
    
    return response.data;
  } catch (error) {
    console.error('API Request Error:', error.message);

    if (error.response) {
      const { status, data } = error.response;
      console.error(`Status: ${status}`, data);
      throw new Error(`API Error ${status}: ${data.message || 'Unknown error'}`);
    }
    
    throw new Error(`API Request Failed: ${error.message}`);
  }
};


const clearCache = () => {
  cache.clear();
  console.log('API cache cleared');
};

const invalidateCache = (endpoint, params = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  const cacheKey = `${url}:${JSON.stringify(params)}`;
  cache.del(cacheKey);
  console.log(`Cache invalidated for: ${cacheKey}`);
};

module.exports = {
  apiRequest,
  clearCache,
  invalidateCache
};