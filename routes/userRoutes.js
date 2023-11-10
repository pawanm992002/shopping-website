const router = require("express").Router();
const {
  registerUser,
  loginUser,
  getUser,
  deleteUser,
  updateUser,
  logout,
} = require("../controllers/userController");
const { verifyToken } = require("../utils/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/get").get(verifyToken, getUser);
router.route("/delete").delete(verifyToken, deleteUser);
router.route("/update").put(verifyToken, updateUser);
router.route("/logout").get(verifyToken, logout);

module.exports = router;
