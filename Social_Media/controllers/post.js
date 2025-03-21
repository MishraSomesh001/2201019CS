const express = require('express');
const router = express.Router();
const postService = require('../services/postService');
const { authenticateRequest } = require('../services/authService');

// Enable authentication if needed
// router.use(authenticateRequest);

/**
 * GET /api/posts/search
 * Search posts by content
 */
router.get('/search', async (req, res, next) => {
  try {
    const { query, userId } = req.query;
    
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }
    
    const results = await postService.searchPosts(query, userId);
    res.json({ results });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/posts/:postId
 * Get post by ID
 */
router.get('/:postId', async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await postService.getPostById(postId);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json({ post });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/posts/:postId/comments
 * Get comments for a post
 */
router.get('/:postId/comments', async (req, res, next) => {
  try {
    const { postId } = req.params;
    const comments = await postService.getCommentsByPostId(postId);
    res.json({ comments });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/posts/:postId/analyze
 * Analyze a specific post
 */
router.post('/:postId/analyze', async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await postService.getPostById(postId);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    const comments = await postService.getCommentsByPostId(postId);
    
    // Perform simple analysis
    const analysis = {
      postId,
      contentLength: post.content.length,
      commentCount: comments.length,
      topics: extractTopics(post.content),
      sentiment: analyzeSentiment(post.content),
      commentSentiment: comments.length > 0 
        ? analyzeSentiment(comments.map(c => c.content).join(' '))
        : 'neutral'
    };
    
    res.json({ analysis });
  } catch (error) {
    next(error);
  }
});

/**
 * Helper function to extract topics from content
 * @param {string} content - Post content
 * @returns {Array} Array of topics
 */
function extractTopics(content) {
  // Simple implementation - extract word after "about"
  const match = content.match(/about\s+(\w+)/i);
  return match && match[1] ? [match[1].toLowerCase()] : [];
}

/**
 * Helper function for simple sentiment analysis
 * @param {string} content - Text content
 * @returns {string} Sentiment (positive, negative, or neutral)
 */
function analyzeSentiment(content) {
  const lowerContent = content.toLowerCase();
  
  const positiveWords = ['good', 'great', 'excellent', 'amazing', 'love', 'like', 'happy'];
  const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'dislike', 'boring', 'old'];
  
  let positiveScore = 0;
  let negativeScore = 0;
  
  positiveWords.forEach(word => {
    if (lowerContent.includes(word)) positiveScore++;
  });
  
  negativeWords.forEach(word => {
    if (lowerContent.includes(word)) negativeScore++;
  });
  
  if (positiveScore > negativeScore) return 'positive';
  if (negativeScore > positiveScore) return 'negative';
  return 'neutral';
}

module.exports = router;