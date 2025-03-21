const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const postService = require('../services/postService');
const { authenticateRequest } = require('../services/authService');

// Enable authentication if needed
// router.use(authenticateRequest);

/**
 * GET /api/users
 * Get all users
 */
router.get('/', async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    
    // Convert to array format for API response
    const usersArray = Object.entries(users).map(([id, name]) => ({
      id,
      name
    }));
    
    res.json({ users: usersArray });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/users/search
 * Search users by name
 */
router.get('/search', async (req, res, next) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }
    
    const results = await userService.searchUsers(query);
    res.json({ results });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/users/:userId
 * Get user by ID
 */
router.get('/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await userService.getUserById(userId);
    res.json({ user });
  } catch (error) {
    if (error.message === 'User not found') {
      return res.status(404).json({ error: 'User not found' });
    }
    next(error);
  }
});

/**
 * GET /api/users/:userId/posts
 * Get posts by user ID
 */
router.get('/:userId/posts', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const posts = await postService.getPostsByUserId(userId);
    res.json({ posts });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/users/:userId/analytics
 * Get analytics for user's posts
 */
router.get('/:userId/analytics', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const analytics = await postService.analyzeUserPosts(userId);
    res.json({ analytics });
  } catch (error) {
    next(error);
  }
});

module.exports = router;