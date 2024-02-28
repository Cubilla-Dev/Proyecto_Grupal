const Company = require("../models/companies.model");

exports.createCompany = async (req, res) => {
    try {
        const { name, accountNumber, monthlyFee, imageUrl } = req.body;
        const company = new Company({
            name,
            accountNumber,
            monthlyFee,
            imageUrl,
        });
        await company.save();
        res.status(201).json({ success: true, message: "Company created successfully" });
    } catch (error) {
        console.error("Error creating company:", error);
        res.status(400).json({ success: false, error: "Failed to create company" });
    }
};

exports.getCompanies = async (req, res) => {
    try {
        const companies = await Company.find().sort({ name: 1 });
        res.status(200).json(companies);
    } catch (error) {
        console.error("Error getting companies:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getCompanyById = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        res.status(200).json(company);
    } catch (error) {
        console.error("Error getting company by ID:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.updateCompany = async (req, res) => {
    try {
        const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedCompany);
    } catch (error) {
        console.error("Error updating company:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.deleteCompany = async (req, res) => {
    try {
        const deleted = await Company.deleteOne({ _id: req.params.id });
        res.status(200).json(deleted);
    } catch (error) {
        console.error("Error deleting company:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
