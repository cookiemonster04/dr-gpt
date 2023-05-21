// Reference: https://www.geeksforgeeks.org/email-verification/#
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import { catchWrap } from "../middleware/errorHandler";

const genToken = (data) =>
  jwt.sign({ data: data }, process.env.VERIFY_SECRET, { expiresIn: "30m" });

const mailConfigurations = (username, email, token) => ({
  // It should be a string of sender/server email
  from: process.env.VERIFY_EMAIL,

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
  console.log(process.env.VERIFY_EMAIL, process.env.VERIFY_PASSWORD, process.env.VERIFY_SECRET);
  console.log(typeof process.env.VERIFY_EMAIL, typeof process.env.VERIFY_PASSWORD, typeof process.env.VERIFY_SECRET);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.VERIFY_EMAIL,
      pass: process.env.VERIFY_PASSWORD,
    },
  });
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
  console.log("Username:", username, "Email:", email);
  await sendVerify(user, username, email);
  res.status(200);
});

const verify = async (token) => {
  console.log(token);
  const data = jwt.verify(token, process.env.VERIFY_SECRET);
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
