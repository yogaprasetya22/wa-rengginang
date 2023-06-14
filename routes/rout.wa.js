const express = require("express");
const { sendText } = require("../controllers/waControllers");

const router = express.Router();

router.get("/api", sendText)

module.exports = router;