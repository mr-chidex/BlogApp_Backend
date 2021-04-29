const JWT = require("jsonwebtoken");
const User = require("../models/user");

exports.authUser = async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      return res.status(401).json({ message: "Unauthorized" });

    if (!req.headers.authorization.startsWith("Bearer"))
      return res.status(401).json({ message: "Unauthorized" });

    const token = req.headers.authorization.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Invalid token" });

    const decodedToken = JWT.decode(token);
    // console.log(Date.now());
    // console.log(decodedToken.exp);
    if (Date.now() >= decodedToken.exp)
      return res
        .status(401)
        .json({ message: "sessioned has expired, please login" });

    const decode = JWT.verify(token, process.env.SECRET_KEY);

    if (!decode) return res.status(401).json({ message: "Expired token" });
    const user = await User.findById(decode.userId).select("-password");
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
