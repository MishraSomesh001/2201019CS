const { apiRequest } = require('../utils/apiHelper');

/**
 * Fetch posts by user ID
 * @param {number|string} userId - User ID
 * @returns {Promise<Array>} Array of post objects
 */
const getPostsByUserId = async (userId) => {
  try {
    const response = await apiRequest(`/users/${userId}/posts`);
    return response.posts || [];
  } catch (error) {
    console.error(`Error fetching posts for user ${userId}:`, error.message);
    throw new Error(`Failed to fetch posts for user ${userId}`);
  }
};

/**
 * Get post by ID
 * @param {number|string} postId - Post ID
 * @returns {Promise<Object>} Post object
 */
const getPostById = async (postId) => {
  try {
    const response = await apiRequest(`/posts/${postId}`);
    return response.post || null;
  } catch (error) {
    console.error(`Error fetching post ${postId}:`, error.message);
    throw new Error(`Failed to fetch post ${postId}`);
  }
};

/**
 * Get comments for a post
 * @param {number|string} postId - Post ID
 * @returns {Promise<Array>} Array of comment objects
 */
const getCommentsByPostId = async (postId) => {
  try {
    const response = await apiRequest(`/posts/${postId}/comments`);
    return response.comments || [];
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error.message);
    throw new Error(`Failed to fetch comments for post ${postId}`);
  }
};

/**
 * Search posts by content (case insensitive partial match)
 * @param {string} searchTerm - Search term
 * @param {number|string} userId - Optional user ID to filter posts
 * @returns {Promise<Array>} Array of matching post objects
 */
const searchPosts = async (searchTerm, userId = null) => {
  try {
    let posts = [];
    
    if (userId) {
      // If userId is provided, search only within that user's posts
      posts = await getPostsByUserId(userId);
    } else {
      // This is a simplified implementation; in reality, you would need to 
      // fetch posts from all users, which might require multiple API calls
      // depending on the actual API structure
      throw new Error('Searching all posts is not supported by the API');
    }
    
    const searchTermLower = searchTerm.toLowerCase();
    return posts.filter(post => post.content.toLowerCase().includes(searchTermLower));
  } catch (error) {
    console.error('Error searching posts:', error.message);
    throw error;
  }
};

/**
 * Analyze posts by user
 * @param {number|string} userId - User ID
 * @returns {Promise<Object>} Analysis results
 */
const analyzeUserPosts = async (userId) => {
  try {
    const posts = await getPostsByUserId(userId);
    
    // Count posts by topic/keyword
    const topicCounts = {};
    posts.forEach(post => {
      // Simple topic extraction - just take words after "about"
      const match = post.content.match(/about\s+(\w+)/i);
      if (match && match[1]) {
        const topic = match[1].toLowerCase();
        topicCounts[topic] = (topicCounts[topic] || 0) + 1;
      }
    });
    
    // Sort topics by frequency
    const topTopics = Object.entries(topicCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([topic, count]) => ({ topic, count }));
    
    return {
      userId,
      totalPosts: posts.length,
      topTopics,
      postFrequency: {
        daily: posts.length / 30, // Simplified assumption
        weekly: posts.length / 4,
        monthly: posts.length
      }
    };
  } catch (error) {
    console.error(`Error analyzing posts for user ${userId}:`, error.message);
    throw error;
  }
};

module.exports = {
  getPostsByUserId,
  getPostById,
  getCommentsByPostId,
  searchPosts,
  analyzeUserPosts
};