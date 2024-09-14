const express = require("express");
const { protectroute } = require("../middelware/protectroute");
const { getuserforsidebar } = require("../contorllers/usercontroller");
const router = express.Router();

router.get("/",protectroute,getuserforsidebar);

module.exports = router;