const { Signup, Login } = require("../Controllers/AuthController");
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);

router.options("/signup", (req, res) => {
  res.sendStatus(200);
});
router.options("/login", (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
