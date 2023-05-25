const express = require("express");
const router = express.Router();

let db = [{ id: 1, username: "Josh", password: "111" }];

router.post("/", (req, res, next) => {
  const user = db.find(
    (user) =>
      user.username === req.body.username && user.password === req.body.password
  );
  if (user) {
    res.json({
      accessToken: `${user.id}-${user.username}-${Date.now().toString()}`,
      username: user.username,
    });
  } else {
    res.json({ error: "Invalid username and password!" });
  }
});

router.use((req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth.split(" ")[1];
  if (token === "null") {
    res.json({ error: "No Access Token" });
  } else {
    req.user = token.split("-")[0];
    next();
  }
});

router.use((error, req, res, next) => {
  res.status(500).json({ error: "Invalid username and password!" });
});

module.exports = router;
