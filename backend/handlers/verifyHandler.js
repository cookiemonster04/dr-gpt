// Reference: https://www.geeksforgeeks.org/email-verification/#
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import secret from "../secret";
import User from "../models/userModel";
import { catchWrap } from "../middleware/errorHandler";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: secret.email,
    pass: secret.password,
  },
});

const genToken = (data) =>
  jwt.sign({ data: data }, secret.verify_secret, { expiresIn: "30m" });

const mailConfigurations = (username, email, token) => ({
  // It should be a string of sender/server email
  from: secret.email,

  to: email,

  // Subject of Email
  subject: "Email Verification",

  // This would be the text of email body
  text: `Hello ${username},
Please verify your email: https://vitawise.org/verify/${token}
This link will expire in 30 minutes.

If you did not sign up for an account, you can safely disregard this email.

Sincerely,
The Vitawise Team`,
});

const sendVerify = async (user, username, email) => {
  const token = genToken(user._id.toString());
  await user.save({ validateBeforeSave: false });
  transporter.sendMail(
    mailConfigurations(username, email, token),
    function (error, info) {
      if (error) throw Error(error);
      console.log("Email Sent Successfully");
      console.log(info);
    }
  );
};

const sendVerifyEnd = catchWrap(async (req, res, next) => {
  const { username, email } = req.body;
  const user = await User.find({ username: username, email: email });
  await sendVerify(user, username, email);
  res.status(200);
});

const verify = async (token) => {
  console.log(token);
  const data = jwt.verify(token, secret.verify_secret);
  console.log(data);
  const user = await User.findById(data.data);
  console.log(user);
  if (!user) {
    console.log("User not found");
    return false;
  }
  user.verified = true;
  await user.save({ validateBeforeSave: false });
  console.log("saved");
  return true;
};

const verifyEnd = catchWrap(async (req, res, next) => {
  console.log(req);
  const status = await verify(req.params.token);
  res.status(status ? 200 : 400).end();
});

export { verifyEnd, sendVerify, sendVerifyEnd };
