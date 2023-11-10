const router = require("express").Router();
const {
  getItemsOfShop,
  addItemToShop,
  deleteItemOfShop,
  updateItemOfShop,
} = require("../controllers/shopkeeper");

const {
  getItemsOfCart,
  addItemToCart,
  deleteItemOfCart,
} = require("../controllers/customer");

const { getItem, getAllItems } = require("../controllers/item");

const { verifyToken } = require("../utils/auth");

// customer routes
router.route("/get_from_cart/:_id").get(verifyToken, getItemsOfCart);
router.route("/add_to_cart/:_id").put(verifyToken, addItemToCart);
router.route("/delete_from_cart/:_id").delete(verifyToken, deleteItemOfCart);

// shopkeeper routes
router.route("/get_from_shop/:_id").get(verifyToken, getItemsOfShop);
router.route("/add_to_shop/:_id").put(verifyToken, addItemToShop);
router.route("/delete_from_shop/:_id").delete(verifyToken, deleteItemOfShop);
router.route("/update_from_shop/:_id").put(verifyToken, updateItemOfShop);

// common routes
router.route("/get").get(verifyToken, getItem);
router.route("/get_all").get(verifyToken, getAllItems);

module.exports = router;
