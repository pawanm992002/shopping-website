const itemModal = require("../modals/itemModal");
const customerModal = require("../modals/customerModal");

const getItemsOfCart = async (req, res) => {
  const _id = req.params._id;
  try {
    if (!_id) throw new Error("Invalid item ID");
    itemModal.findById(_id);

    const cartItems = await customerModal.findById(_id).populate("cart");

    if (!cartItems) throw new Error("no items to fetch");

    return res.json({
      status: true,
      msg: "fetched cart",
      data: cartItems.cart,
    });
  } catch (err) {
    return res.json({ status: false, msg: err.message });
  }
};

const addItemToCart = async (req, res) => {
  try {
    const cartItem = req.query.cart;
    if (!cartItem) throw new Error("please select Items");

    const customer = await customerModal.findByIdAndUpdate(req.params._id, {
      $addToSet: { cartItem },
    });
    if (!customer) throw new Error("item not added success successfull");

    return res.json({
      status: true,
      msg: "items added to cart",
    });
  } catch (err) {
    return res.json({ status: false, msg: err.message });
  }
};

const deleteItemOfCart = async (req, res) => {
  const _id = req.params._id;
  const cart = req.query.cart;
  try {
    const customer = await customerModal.findById(_id);
    if (!customer) throw new Error("customer not exist");

    if (!customer.cart.includes(cart))
      throw new Error("only authorised customer can delete");

    const deletedItem = await customerModal.findByIdAndUpdate(_id, {
      $pull: { cart: cart },
    });
    if (!deletedItem) throw new Error("item not deleted");

    console.log(deletedItem);
    return res.json({
      status: true,
      msg: "Item deleted from cart",
    });
  } catch (err) {
    return res.json({ status: false, msg: err.message });
  }
};

module.exports = {
  getItemsOfCart,
  addItemToCart,
  deleteItemOfCart,
};
