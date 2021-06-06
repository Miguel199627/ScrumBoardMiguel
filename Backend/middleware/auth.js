const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  let jwtToken = req.header("Authorization");
  if (!jwtToken) return res.status(400).send("Authorization denied: no token");
  jwtToken = jwtToken.split(" ")[1];
  if (!jwtToken) return res.status(400).send("Authorization denied: no token");
  try {
    const payload = await jwt.verify(jwtToken, process.env.SECRET_kEY_JWT);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(400).send("Authorization denied: invalid token");
  }
};

module.exports = auth;
