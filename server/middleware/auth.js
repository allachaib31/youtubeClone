//const adminFunctions = require("../blockchain/adminOrg1");
module.exports = async (req, res, next) => {
  if (
    req.session &&
    req.session.user &&
    req.session.user.id &&
    req.session.user.email
  ) {
    req.user = {};
    req.user.id = req.session.user.id;
    req.user.email = req.session.user.email;
    next();
  } else {
    res.clearCookie("sessionId");
    return res.status(401).send({
      status: "error",
      msg: "failed authentication",
    });
  }
};
