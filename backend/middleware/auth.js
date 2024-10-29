const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  console.log('Token received:', token);

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      console.error('Token verification error:', err);
      return res.status(403).json({ message: 'Token is invalid or expired' });
    }

    req.user = { userId: decodedToken.userId }; // Attach userId to req.user
    console.log('Authenticated user:', req.user);
    next();
  });
};

module.exports = authenticateToken;
