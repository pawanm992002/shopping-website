const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/auth");
const customerModal = require("../modals/customerModal");
const shopkeeperModal = require("../modals/shopkeeperModal");
const itemModal = require("../modals/itemModal");

// customer have cart, shopkeeper have items
const registerUser = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    mobileNo,
    password,
    country,
    state,
    city,
    isCustomer,
  } = req.body;

  try {
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      mobileNo === "" ||
      password === "" ||
      Object.keys(country).length === 0 ||
      Object.keys(state).length === 0 ||
      Object.keys(city).length === 0
    )
      throw new Error("Please Enter all required fields");

    const hashPassword = await bcrypt.hash(password, 10);
    if (!hashPassword) throw new Error("Something went wrong");

    const user = {
      firstName,
      lastName,
      email,
      mobileNo,
      password: hashPassword,
      country,
      state,
      city,
    };

    let selectedModal;
    if (isCustomer === true) {
      selectedModal = customerModal;
      user.cart = [];
    } else if (isCustomer === false) {
      selectedModal = shopkeeperModal;
      user.items = [];
    } else {
      throw new Error("Invalid User Type");
    }
    const userExist = await selectedModal.findOne({ email: email });
    if (userExist) throw new Error("User already Exist");

    const registerdUser = await selectedModal.create(user);
    if (!registerdUser) throw new Error("Something went wrong");

    return res.json({
      status: true,
      msg: "Registration successfull",
    });
  } catch (err) {
    return res.json({ status: false, msg: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password, isCustomer } = req.body;

  try {
    if (email === "" || password === "")
      throw new Error("Please fill all fields");

    let selectedModal;
    if (isCustomer === true) {
      selectedModal = customerModal;
    } else if (isCustomer === false) {
      selectedModal = shopkeeperModal;
    } else {
      throw new Error("Invalid User Type");
    }

    let userExist = await selectedModal.findOne({ email });
    if (!userExist) throw new Error("Email or Password is wrong");

    const passwordMatched = await bcrypt.compare(password, userExist.password);
    if (!passwordMatched) throw new Error("Email or Password is wrong");

    userExist.password = undefined;
    userExist.__v = undefined;

    let token = generateToken(userExist._id);
    if (!token) throw new Error("token not found");

    const maxAge = 3 * 60 * 60;

    res.cookie("authToken", token, {
      httpOnly: true,
      maxAge: maxAge * 1000, // 3hrs in ms
    });

    return res.json({
      status: true,
      msg: "User LOG IN successfull",
      data: userExist,
    });
  } catch (err) {
    return res.json({
      status: false,
      msg: err.message,
      data: null,
    });
  }
};

const logout = (req, res) => {
  // implement later
  res.clearCookie("authToken");
  // also clear local storage from frontend
  return res.json({ status: true, msg: "logout successfully" });
};

const updateUser = async (req, res) => {
  const { firstName, lastName, mobileNo, country, state, city } = req.body;
  const { _id, isCustomer } = req.query;

  try {
    if (
      firstName === "" ||
      lastName === "" ||
      mobileNo === "" ||
      Object.keys(country).length === 0 ||
      Object.keys(state).length === 0 ||
      Object.keys(city).length === 0
    )
      throw new Error("Please Enter all required fields");

    const user = {
      firstName,
      lastName,
      mobileNo,
      country,
      state,
      city,
    };

    let selectedModal;
    if (isCustomer === "true") {
      selectedModal = customerModal;
    } else if (isCustomer === "false") {
      selectedModal = shopkeeperModal;
    } else {
      throw new Error("Invalid User Type");
    }

    const updatedUser = await selectedModal.findByIdAndUpdate(_id, user, {
      new: true,
    });
    if (!updatedUser) throw new Error("user not updated");

    updatedUser.password = undefined;

    return res.json({
      status: true,
      msg: "updated successfull",
      data: updatedUser,
    });
  } catch (err) {
    return res.json({ status: false, msg: err.message });
  }
};

const deleteUser = async (req, res) => {
  const { _id, isCustomer } = req.query;

  try {
    let selectedModal;
    if (isCustomer === "true") {
      selectedModal = customerModal;
    } else if (isCustomer === "false") {
      selectedModal = shopkeeperModal;
    } else {
      throw new Error("Invalid User Type");
    }
    const deletedUser = await selectedModal.findByIdAndDelete(_id);
    if (!deletedUser) throw new Error("User not Deleted");

    const items = deletedUser.items;

    if (isCustomer === "false") {
      // if shopkeeper then also delete its uploaded items
      items.map(async (_id) => {
        await itemModal.findByIdAndDelete(_id);
      });
    }

    // res.clearCookie("authToken");

    return res.json({ status: true, msg: "Deleted user Successfully" });
  } catch (err) {
    return res.json({ status: false, msg: err.message });
  }
};

const getUser = async (req, res) => {
  const { _id, isCustomer } = req.query;

  try {
    let selectedModal;
    if (isCustomer === "true") {
      selectedModal = customerModal;
    } else if (isCustomer === "false") {
      selectedModal = shopkeeperModal;
    } else {
      throw new Error("Invalid User Type");
    }
    const user = await selectedModal.findOne({ _id });
    if (!user) throw new Error("User not found");
    user.password = undefined;
    user.__v = undefined;

    return res.json({ status: true, msg: "user fetched", data: user });
  } catch (err) {
    return res.json({ status: false, msg: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  deleteUser,
  updateUser,
  logout,
};
