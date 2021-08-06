const router = require("express").Router();
const User = require("../models/Users");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    res.json({
      status: 200,
      user: user,
    });
  } catch (error) {
    res.json({
      status: 401,
    });
  }
});
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    await User.register(username, email, password);
    res.json({
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
