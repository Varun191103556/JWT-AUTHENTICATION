const jwt = require('jsonwebtoken');
const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    // console.log(decoded.user_id);
    req.user = decoded;
  } catch (err) {
    console.error(err.message);
    return res.status(401).send('Invalid Token');
  }
  return next();
};

module.exports = verifyToken;