const JWT = require("jsonwebtoken");

exports.getToken = (user) => {
  return JWT.sign(
    {
      iat: Date.now(),
      userId: user._id,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1d" }
  );
};
