const express = require('express');
const router = express.Router();

const chatController = require('../controllers/chat.controller');
const { authenticate } = require('../config/jwt.config');
const { upload } = require('../config/multer.config'); 



/* Buscador de chats */
router.get("/find", authenticate, chatController.getChatByMembers);

/* Rutas Basicas del CRUD */
router.post("",  chatController.createChat);

router.get("", authenticate, chatController.getAllChats);
router.get("/:id", authenticate, chatController.getChatMessages);
// router.put("/:id", authenticate, chatController.updateUser);
// router.delete("/:id", /* authenticate, */ chatController.deleteUser);

/* Rutas de mensajes */
router.post("/message", authenticate, upload.single('img'), chatController.sendMessage);
router.post("/media", authenticate, upload.single('img'), chatController.sendMedia);


module.exports = router;