const express = require('express');
const router = express.Router();
const transfController = require('../controllers/transf.controller')
const moneySend=require('../controllers/sendMoney.controller')
// Create
router.post("", transfController.transfCuentas);

//find all by id
router.get("/:id", transfController.historyTranf);

module.exports = router;