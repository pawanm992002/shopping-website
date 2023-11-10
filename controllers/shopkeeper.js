const itemModal = require("../modals/itemModal");
const shopkeeperModal = require("../modals/shopkeeperModal");

// used by shopkeeper
const getItemsOfShop = async (req, res) => {
  const _id = req.params._id;
  try {
    if (!_id) throw new Error("Invalid item ID");

    const shopItems = await shopkeeperModal
      .findById(_id)
      .populate("items")
      .select("items");
    if (!shopItems) throw new Error("No Item Found");

    // item _id will be removed in future in res
    return res.json({
      status: true,
      msg: "Item fetched",
      data: shopItems.items,
    });
  } catch (err) {
    console.log(err);
    return res.json({ status: false, msg: err.message });
  }
};

const addItemToShop = async (req, res) => {
  try {
    const addedItem = await itemModal.create(req.body);
    if (!addedItem) throw new Error("Item not added");

    const addtoShop = await shopkeeperModal.findByIdAndUpdate(
      req.params._id,
      {
        $push: { items: addedItem._id },
      },
      { new: true }
    );
    if (!addtoShop) throw new Error("shopkeeper not exist to add item");

    return res.json({ status: true, msg: "added item successfully" });
  } catch (err) {
    return res.json({ status: false, msg: err.msg });
  }
};

const deleteItemOfShop = async (req, res) => {
  const _id = req.params._id;
  const item = req.query.item;
  try {
    const shopkeeper = await shopkeeperModal.findById(_id);
    if (!shopkeeper) throw new Error("shopkeeper not exist");

    if (!shopkeeper.items.includes(item))
      throw new Error("only authorised shopkeeper can delete");

    const deletedItem = await itemModal.findByIdAndDelete(item);
    if (!deletedItem) throw new Error("Item not deleted");

    return res.json({
      status: true,
      msg: "Item deleted Successfully",
    });
  } catch (err) {
    return res.json({ status: false, msg: err.message });
  }
};

const updateItemOfShop = async (req, res) => {
  const _id = req.params._id;
  const item = req.query.item;
  try {
    const shopkeeper = await shopkeeperModal.findById(_id);
    if (!shopkeeper) throw new Error("shopkeeper not exist");

    if (!shopkeeper.items.includes(item))
      throw new Error("only authorised shopkeeper can update");

    const updatedItem = await itemModal.findByIdAndUpdate(
      item,
      { $set: req.body },
      { new: true }
    );
    if (!updatedItem) throw new Error("Item not updated");

    return res.json({
      status: true,
      msg: "Updated Item Successfully",
      data: updatedItem,
    });
  } catch (err) {
    return res.json({ status: false, msg: err.message });
  }
};

module.exports = {
  getItemsOfShop,
  addItemToShop,
  deleteItemOfShop,
  updateItemOfShop,
};
