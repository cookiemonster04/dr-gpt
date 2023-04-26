import User from "../models/userModel";
import { catchWrap } from "../middleware/errorHandler";

const getUser = catchWrap(
  async (req, res, next) => {
    if (req.user) {
      res.status(200).json(req.user);
      return;
    }
    const reqUsername = req.params.userId;
    if (reqUsername) {
      const foundUser = await User.findOne({ username: reqUsername }).exec();
      res.status(200).json(foundUser);
    } else {
      throw new Error();
    }
  },
  401,
  "Login to access profile"
);
const setUser = catchWrap(async (req, res, next) => {
  const { username, password } = req.body;
  const newUser = new User({
    username: username,
    password: password,
  });
  await newUser.save();
  res.status(200).json({
    message: "Success",
    user: newUser,
  });
});
const editUser = catchWrap(
  async (req, res, next) => {
    if (!req.user) {
      throw new Error();
    }
    User.findOneAndUpdate(
      { _id: req.user._id },
      req.body,
      { new: true },
      (err, user) => {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
  },
  401,
  "Login to access profile"
);

export { getUser, setUser, editUser };
