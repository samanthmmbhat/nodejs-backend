const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  // Verify and decode JWT token in the request headers
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token expired or invalid' });
    }
    req.userId = decoded.userId;
    next();
  });
}

module.exports = { verifyToken };
