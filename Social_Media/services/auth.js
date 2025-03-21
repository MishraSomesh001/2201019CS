
const validateApiToken = (token) => {
 
    return token === process.env.API_TOKEN;
  };
  
  const authenticateRequest = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    if (validateApiToken(token)) {
      next();
    } else {
      res.status(403).json({ error: 'Invalid or expired token' });
    }
  };
  
  module.exports = {
    validateApiToken,
    authenticateRequest
  };