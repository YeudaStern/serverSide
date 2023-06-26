const jwt = require("jsonwebtoken");
const { config } = require("../config/secrets")

exports.auth = (req, res, next) => {
  let token = req.header("x-api-key");
  if (!token) {
    return res.status(401).json({ msg: "You must send token in the header to this endpoint" })
  }
  try {

    let decodeToken = jwt.verify(token, config.token_secret);

    req.tokenData = decodeToken;

    next();
  }
  catch (err) {
    return res.status(401).json({ msg: "Token invalid or expired" })
  }
}

// auth for admin only
exports.authAdmin = (req, res, next) => {
  // Retrieve the token from the 'x-api-key' header
  let token = req.header("x-api-key");
  // Check if the token is missing
  if (!token) {
    // Return a 401 Unauthorized response with a message
    return res.status(401).json({ msg: "You must send token in the header to this endpoint" });
  }

  try {
    // Verify the authenticity and integrity of the token
    let decodeToken = jwt.verify(token, config.token_secret);
    // Check if the user's role is not 'Admin'
    if (decodeToken.role != "Admin") {
      // Return a 401 Unauthorized response with a message
      return res.status(401).json({ msg: "Just admin can be in this endpoint" });
    }
    // Assign the decoded token to 'req.tokenData' for later use
    req.tokenData = decodeToken;
    // Call the next middleware in the chain
    next();
  } catch (err) {
    // Return a 401 Unauthorized response with a message
    return res.status(401).json({ msg: "Token invalid or expired" });
  }
};
