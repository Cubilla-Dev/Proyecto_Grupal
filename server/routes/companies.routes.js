const express = require('express');
const router = express.Router();

const companyController = require('../controllers/companies.controller');

// Create
router.post("/", companyController.createCompany);

// Find all
router.get("/", companyController.getCompanies);

// Find One
router.get("/:id", companyController.getCompanyById);

// Update One
router.put("/:id", companyController.updateCompany);

// Delete One
router.delete("/:id", companyController.deleteCompany);

module.exports = router;
