const mongoose = require("mongoose");

const SendMoneySchema = new mongoose.Schema({
    amountSent: {
        type: Number,
        required: [true, "Amount sent is mandatory"],
    },
    senderUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Sender user ID is mandatory"],
    },
    receiverUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Receiver user ID is mandatory"],
    },
}, { timestamps: true, versionKey: false });

const SendMoney = mongoose.model("SendMoney", SendMoneySchema);

module.exports = SendMoney;
