const express = require("express");
const { sendmessage, getmessage } = require("../contorllers/messagecontroller");
const { protectroute } = require("../middelware/protectroute");
const router = express.Router();

router.get("/:id",protectroute,getmessage);
router.post("/send/:id",protectroute,sendmessage)


module.exports = router;