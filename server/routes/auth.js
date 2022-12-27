const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.registerEmail,
    password: CryptoJS.AES.encrypt(req.body.registerPassword, process.env.PASS_SEC).toString(),
  });

  try {
    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.loginEmail,
    });

    if (!user) {
      return res.status(401).json("Wrong Email");
    }

    // Hashing the password so as to keep it hidden ans secured
    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    const inputPassword = req.body.loginPassword;

    if (originalPassword != inputPassword) return res.status(401).json("Wrong Password");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;
    return res.status(200).json({ ...others, accessToken });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.post("/googleRegister", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.registerEmail,
    password: CryptoJS.AES.encrypt(req.body.registerPassword, process.env.PASS_SEC).toString(),
  });

  try {
    const user = await User.findOne({ username: newUser.username });
    if (user) {
      return res.status(200).json(user);
    }

    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
