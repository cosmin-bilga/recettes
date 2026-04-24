const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    //console.log(req.headers.authorization);
    const token = req.headers.authorization;
    let decodedToken;
    if (token.startsWith("Bearer ")) {
      decodedToken = jwt.verify(token.split(" ")[1], "RANDOM_TOKEN_SECRET");
    } else {
      res.status(403).json({ message: "Bearer token expected" });
    }

    const userId = decodedToken.userId;
    req.auth = { userId: userId };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
