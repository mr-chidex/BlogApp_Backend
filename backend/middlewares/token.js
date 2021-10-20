const JWT = require("jsonwebtoken");

exports.getToken = (user) => {
  return JWT.sign(
    {
      iat: Date.now(),
      userId: user._id,
      name: user.name,
      email: user.email,
      status: user.status,
      isAdmin: user.isAdmin,
      image: user.image,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1d" }
  );
};
