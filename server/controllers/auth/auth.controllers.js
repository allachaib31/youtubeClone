const bcrypt = require("bcrypt");
const userModel = require("../../models/user");
const SALTKEY = Number(process.env.SALTKEY);

exports.signUp = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, SALTKEY);
    const user = new userModel({
      username,
      email,
      password: hashPassword,
    });
    await user.save();
    return res.status(200).send({
      status: "success",
      message: "Congratulation! Youve successfully signed up welcome aboard!",
    });
  } catch (err) {
    return res.status(400).json({
      status: "error",
      msg: "Try again, the email or the username already exists.",
    });
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({
      email: email,
    });
    if (!user) {
      return res.status(401).send({
        status: "error",
        message: "Email or Password incorrect",
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).send({
        status: "error",
        message: "Email or Password incorrect",
      });
    }
    req.session.user = {
      id: user._id,
      email: user.email,
      username: user.password,
    };
    return res.status(201).send({
      status: "success",
      message: "Login successful!!",
    });
  } catch (err) {
    return res.status(400).send({
      status: "error",
      message: "Try again!!",
    });
  }
};
exports.logout = async (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
      } else {
        res.clearCookie("sessionId"); // Assuming "session-id" is the name of your session cookie
        res.status(200).send({
          status: "success",
          msg: "logout successful",
        });
      }
    });
  } else {
    res.status(401).send({
      status: "error",
      msg: "no active session found",
    });
  }
};
exports.validateSession = async (req, res) => {
  return res.status(201).send({
    status: "success",
    msg: "Login successful!",
  });
};
