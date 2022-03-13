const User = require("../models/user");
const router = require("express").Router();

// Get high score of the user
router.get("/getScore", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;

router.put("/updateScore", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});
