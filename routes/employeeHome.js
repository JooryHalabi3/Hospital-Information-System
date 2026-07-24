const express = require("express");
const router = express.Router();

router.get("/check-session", (req, res) => {
  if (req.session.user && req.session.user.role === "employee") {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.status(401).json({ loggedIn: false });
  }
});

module.exports = router;