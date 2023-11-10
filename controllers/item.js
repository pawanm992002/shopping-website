const itemModal = require("../modals/itemModal");
const shopkeeperModal = require("../modals/shopkeeperModal");

const getAllItems = async (req, res) => {
  // needs to implement pagination, sorting, filters
  try {
    const allItems = await shopkeeperModal
      .find()
      .select("-_v -_id -password -__v -receiveEmail")
      .populate("items");

    if (!allItems) throw new Error("no items found");

    return res.json({ status: true, msg: "all items", data: allItems });
  } catch (err) {
    return res.json({ status: true, msg: err.message });
  }
};

const getItem = async (req, res) => {
  const _id = req.query._id;
  try {
    if (!_id) throw new Error("Invalid item ID");
    itemModal.findById(_id);

    let result = await itemModal.findById(_id);
    if (!result) throw new Error("No Item Found");

    return res.json({ status: true, msg: "Item fetched" });
  } catch (err) {
    console.log(err);
    return res.json({ status: false, msg: err.message });
  }
};

module.exports = {
  getItem,
  getAllItems,
};
