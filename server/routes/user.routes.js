const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

/* Recuperacion Password */
router.get("/passwordReset", userController.passwordResetToken);
router.patch("/passwordReset", userController.passwordReset);

/* Rutas Basicas del CRUD */
router.post("", userController.createUser);
router.get("", authenticate, userController.findAllUsers);
router.get("/:id", authenticate, userController.findUser);
router.put("/:id", authenticate, userController.updateUser);
router.delete("/:id", authenticate, userController.deleteUser);

//obtener el saldo de la billetera del usuario por ID
router.get("/:id/wallet", authenticate, userController.findWallet);
router.patch("/:id/wallet", userController.updateWallet);


module.exports = router;