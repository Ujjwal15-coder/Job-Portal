import Company from "../models/company.js";
import Student from "../models/student.js";

export const addCompany = async (req, res) => {
    try {
        const { companyName, salaryPackage, role, location, description } = req.body;
        if (!companyName) {
            return res.status(400).json({ success: false, message: "Please provide company name" })
        }
        if (!salaryPackage) {
            return res.status(400).json({ success: false, message: "Please provide salary package" })
        }
        if (!role) {
            return res.status(400).json({ success: false, message: "Please provide role" })
        }
        if (!location) {
            return res.status(400).json({ success: false, message: "Please provide location" })
        }

        const company = await Company.create({ companyName, salaryPackage, role, location, description })
        return res.status(201).json({
            success: true,
            message: "Company added successfully",
            company
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find();
        return res.status(200).json({
            success: true,
            message: "Companies fetched successfully",
            companies,
            count: companies.length
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const getCompanyByid = async (req, res) => {
    try {
        const { id } = req.params
        const company = await Company.findById(id).populate('appliedStudents', 'name email course skills');
        if (!company) {
            return res.status(404).json({ success: false, message: "No company found" })
        }
        return res.status(200).json({
            success: true,
            message: "Company fetched successfully",
            company
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const updateCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const company = await Company.findByIdAndUpdate(id, req.body, { new: true });
        if (!company) {
            return res.status(404).json({ success: false, message: "No company found" })
        }
        return res.status(200).json({
            success: true,
            message: "Company updated successfully",
            company
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const deleteCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const company = await Company.findByIdAndDelete(id);
        if (!company) {
            return res.status(404).json({ success: false, message: "No company found" })
        }
        return res.status(200).json({ success: true, message: "Company deleted successfully" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const applyCompanies = async (req, res) => {
    try {
        const { id } = req.user;
        const { compId } = req.params;

        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" })
        }

        const company = await Company.findById(compId);
        if (!company) {
            return res.status(404).json({ success: false, message: "Company not found" })
        }

        // Check if already applied
        if (student.appliedCompanies.includes(compId)) {
            return res.status(400).json({ success: false, message: "Already applied to this job" })
        }

        student.appliedCompanies.push(compId);
        company.appliedStudents.push(id);

        await student.save();
        await company.save();

        return res.status(200).json({
            success: true,
            message: "Successfully applied to this company",
            student,
            company
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}