const express = require('express');
const router = express.Router();

const moneySend=require('../controllers/sendMoney.controller')
// Create
router.post("", moneySend.createSendMoney);

//find all by id
router.get("/:id", moneySend.findSendMoneyBySender);

module.exports = router;