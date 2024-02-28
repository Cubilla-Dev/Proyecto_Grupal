const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    accountNumber
: {
      type: Number,
      required: true,
    },
    monthlyFee: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
});

const Company = mongoose.model("Companies", CompanySchema);
module.exports = Company;
