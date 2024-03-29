import User from "../models/userModel";
import jwt from "jsonwebtoken";
import { catchWrap, setError } from "../middleware/errorHandler";

const auth = catchWrap(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    setError(401, "Log in to access this page", res, next);
    return;
  }
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedToken.id);
  next();
});
const sendToken = (user, status, res) => {
  res.status(status).cookie("token", user.generateJWT(), {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  });
};
const login = catchWrap(
  async (req, res, next) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username }).exec();
    if (user && user.password === password) {
      if (!user.verified) {
        res.status(403).json({
          message: "Unverified",
        });
        return;
      }
      sendToken(user, 200, res);
      res.json({
        message: "Login successful",
        user: user,
      });
    } else {
      res.status(401).json({
        message: "Incorrect username or password",
      });
    }
  },
  500,
  "Internal server error"
);
const logout = async (req, res, next) => {
  res.status(200).clearCookie("token").end();
};

export { auth, login, logout };
