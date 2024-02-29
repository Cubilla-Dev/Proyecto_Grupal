const Chat = require("../models/chat.model");
const { sendMultiple } = require("../util/socketFunctions");

const fs = require('fs-extra');

exports.createChat = async (req, res) => {
    try {
        const { members } = req.body;
        console.log(members);
        const chat = await Chat.create({ members });
        res.status(201);
        res.json(chat);
    } catch (error) {
        res.status(500);
        res.json(error);
    }
};
// Controller function to get all chats
exports.getAllChats = async (req, res) => {
    try {
        const chats = await Chat.find({ members: req.user });
        const fixedChats = chats.map((item) => {
            const aux = { ...item._doc };
            const otherMember = aux.members.find((item) => item.id !== req.user);
            aux.firstName = otherMember.firstName;
            aux.lastName = otherMember.lastName;
            return aux;
        })//Funcion para extraer el otro participante // se usa con el id del jwt de la peticion

        res.status(200);
        res.json(fixedChats);
    } catch (error) {
        res.status(500);
        res.json({ error: 'Could not retrieve chats' });
    }
};
// Controller function to send a message to a chat
exports.sendMessage = async (req, res) => {
    try {
        const { chatId, content, memberId } = req.body;
        console.log(req.body);
        let chat
        if (chatId === "NewChat") {
            console.log("CREATING CHAT");
            chat = await Chat.create({ members: [req.user, memberId] });
        } else {
            chat = await Chat.findById(chatId);
        }
        const sender = req.user;

        if (!chat) {
            res.status(404);
            res.json({ error: 'Chat not found' });
            return
        }
        const path = `${process.env.UPLOADS_FOLDER}/${chat._id}`;
        fs.mkdirsSync(path);

        // Use JSON.stringify to serialize here.
        // fs.writeFile(`${path}/`, req.file.buffer, function (err) {
        //     if (err) {
        //         return console.log(err);
        //     }
        //     console.log("The file was saved!");
        // });


        chat.messages.push({ sender, content });
        await chat.save();
        res.status(201)
        res.json(chat.messages);
        /* SOCKET */
        sendMultiple(req.io, "/chat", chat.messages.at(-1), chat.members);

    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({ error: 'Could not send message' });
    }
};
// Controller function to get messages of a chat
exports.getChatMessages = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id, req.user);
        const chat = await Chat.findOne({ _id: id, members: req.user });
        if (!chat) {
            res.status(404);
            res.json({ error: 'Chat not found' });
            return
        }
        const aux = { ...chat._doc };
        const otherMember = aux.members.find((item) => item.id !== req.user);
        aux.firstName = otherMember.firstName;
        aux.lastName = otherMember.lastName;
        res.json(aux);
    } catch (error) {
        res.status(500);
        res.json(error);
    }
};

// Controller function to find if a chat already exist
exports.getChatByMembers = async (req, res) => {
    console.log(req.query._id);
    if (req.user === req.query._id) {
        res.status(500);
        res.json({ error: 'Chat not found' });
        return
    }
    const searchOptions = { members: { $all: [req.user, req.query._id] } };
    try {
        const chat = await Chat.findOne(searchOptions);
        if (!chat) {
            res.status(404);
            res.json({ error: 'Chat not found' });
            return
        }
        const aux = { ...chat._doc };
        const otherMember = aux.members.find((item) => item.id !== req.user);
        aux.firstName = otherMember.firstName;
        aux.lastName = otherMember.lastName;
        res.json(aux);
    } catch (error) {
        res.status(500);
        res.json(error);
    }
};

exports.sendMedia = async (req, res) => {
    try {
        const { chatId, memberId } = req.body;
        console.log(req.body);
        let chat
        if (chatId === "NewChat") {
            console.log("CREATING CHAT");
            chat = await Chat.create({ members: [req.user, memberId] });
        } else {
            chat = await Chat.findById(chatId);
        }
        const sender = req.user;

        if (!chat) {
            res.status(404);
            res.json({ error: 'Chat not found' });
            return
        }
        const path = `${process.env.UPLOADS_FOLDER}/${chat._id}`;
        fs.mkdirsSync(path);

        // Use JSON.stringify to serialize here.
        fs.writeFile(`${path}/file.png`, req.file.buffer, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
        /* chat.messages.push({ sender, content });
        await chat.save(); */
        res.status(201)
        res.json(chat.messages);
        /* SOCKET */
        /* sendMultiple(req.io, "/chat", chat.messages.at(-1), chat.members); */

    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({ error: 'Could not send message' });
    }
}