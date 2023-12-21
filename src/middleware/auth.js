const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkAuth = async (req, res, next) => {
  const excludedRoutes = ['/auth/register', '/user/:id'];
  if (excludedRoutes.includes(req.path)) {
    return next();
  }

  let token;

  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    token = req.headers.authorization.split(' ')[0];
  } else if (req.body.token) {
   
    token = req.body.token;
  } else if (req.query.token) {
    token = req.query.token;
  }

  console.log('Token:', token);

  if (!token) {
    return res.status(401).json({
      error: true,
      message: 'No token provided',
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log('Token Verification Error:', err);
      return res.status(401).json({
        error: true,
        message: 'Token Verification Error: ' + err.message,
      });
    }

    console.log('Decoded Token:', decoded);

    req.user = { id: decoded.id };
    next();
  });
};

module.exports = checkAuth;
