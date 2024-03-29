import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import uniqueValidator from "mongoose-unique-validator";
const model_name = "User";

const passwordCheck = (password) => {
  const errors = [];
  if (password === "") {
    errors.push("Please specify a password");
    return errors;
  }
  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }
  if (password.length > 30) {
    errors.push("Password cannot be longer than 30 characters");
  }
  if (password.search(/[A-Z]/) == -1) {
    errors.push("Password must contain at least one uppercase letter");
  }
  if (password.search(/[a-z]/) == -1) {
    errors.push("Password must contain at least one lowercase letter");
  }
  if (password.search(/[0-9]/) == -1) {
    errors.push("Password must contain at least one digit");
  }
  return errors;
};

const messageGenerator = (errors) => {
  if (errors.length === 0) {
    return "Success";
  } else {
    return errors.join("\n");
  }
};

// Reference: https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax
var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new Schema({
  username: {
    type: String,
    validate: {
      validator: async (value) => {
        if (value === "") {
          return false;
        }
        const queryResult = await mongoose
          .model(model_name)
          .exists({ username: value });
        return !queryResult;
      },
      message: (props) => {
        return props.value === ""
          ? "Please specify a username"
          : "Username is taken";
      },
    },
    unique: true,
    maxLength: [25, "Username cannot be longer than 25 characters"],
  },
  password: {
    type: String, // should be hashed
    validate: {
      validator: (value) => passwordCheck(value).length === 0,
      message: (props) => messageGenerator(passwordCheck(props.value)),
    },
  },
  chats: [{ chatId: String, targetId: String, id: String, date: String }],
  first: String,
  last: String,
  // prof: {
  //   dob: {
  //     m: Number,
  //     d: Number,
  //     y: Number,
  //   },
  //   height: Number,
  //   weight: Number,
  //   gender: String,
  //   race: String,
  //   curCond: String,
  //   prevCond: String,
  //   drugs: String,
  //   surgs: String,
  //   alrgy: String,
  //   famHist: String,
  // },
  dataArray: [String],
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  verified: Boolean,
});
userSchema.plugin(uniqueValidator, { message: "Sorry, {PATH} is already taken by another user."});

userSchema.methods.generateJWT = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

const User = mongoose.model(model_name, userSchema);
export default User;
