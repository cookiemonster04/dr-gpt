import User from "../models/userModel";
import { catchWrap } from "../middleware/errorHandler";

const getUser = catchWrap(
  async (req, res, next) => {
    if (req.params.userId) {
      const foundUser = await User.findById(req.params.userId);
      res.status(200).json(foundUser);
    }
    if (req.user) {
      res.status(200).json(req.user);
      return;
    }
    throw new Error("no user or userId passed");
  },
  // 401,
  // "Login to access profile"
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
const getUsers = catchWrap(async (req, res, next) => {
  const { sponsor } = req.params;
  if (sponsor !== true && sponsor !== false) {
    res.status(400).json({
      message: "Invalid query parameter",
    });
  }
  User.find({ sponsor: sponsor }, (err, userList) => {
    if (err) throw err;
    res.status(200).json({
      userList: userList,
    });
  });
});
const getName = async (userId) => {
  const user = await User.findById(userId);
  return { first: user.first, last: user.last };
};
const getNameAPI = catchWrap(
  async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.status(200).json({ first: user.first, last: user.last });
  },
  // 500,
  // "Internal server error"
);

export { getUser, setUser, getUsers, editUser, getName, getNameAPI };
