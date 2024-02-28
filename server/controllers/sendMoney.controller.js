const SendMoney = require("../models/sendMoney.model");

exports.createSendMoney = async (req, res) => {
    try {
        const { amountSent, senderUserId, receiverUserId } = req.body;
        const sendMoney = new SendMoney({
            amountSent,
            senderUserId,
            receiverUserId,
        });
        await sendMoney.save();
        res.status(201).json({ success: true, message: "SendMoney created successfully" });
    } catch (error) {
        console.error("Error creating SendMoney:", error);
        res.status(400).json({ success: false, error: "Failed to create SendMoney" });
    }
};

exports.findSendMoneyBySender = async (req, res) => {
    try {
        const senderUserId = req.params.senderUserId;
        const sendMoneyRecords = await SendMoney.find({ senderUserId });
        res.status(200).json(sendMoneyRecords);
    } catch (error) {
        console.error("Error finding SendMoney by sender:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
