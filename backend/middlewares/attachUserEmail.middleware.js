const attachUserEmail = (req, res, next) => {
  const { email } = req.body;
  if (email) {
    req.userEmail = email;
  }
  next();
};

module.exports = { attachUserEmail };
