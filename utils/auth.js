const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "30d" });
};

const verifyToken = (req, res, next) => {
  const token = req.cookies?.authToken;
  try {
    if (!token) throw new Error("token not found");
    // res.redirect('/login')
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) throw new Error("token not verified");
    // return res.json({ status: true, msg: "user verfied" });
  } catch (err) {
    return res.json({ status: false, msg: err.message });
  }
  next();
};

module.exports = { generateToken, verifyToken };
