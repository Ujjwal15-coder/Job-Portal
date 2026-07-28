import express from 'express'
import { addCompany, applyCompanies, deleteCompany, getAllCompanies, getCompanyByid, updateCompany } from '../controllers/companyController.js';
import { verifyToken } from '../middleware/auth.js'
import { isAdmin } from '../middleware/isAdmin.js';

const router = express.Router();

// Public
router.get('/', getAllCompanies);
router.get('/:id', getCompanyByid);

// Authenticated
router.post('/apply/:compId', verifyToken, applyCompanies)

// Admin only
router.post('/', verifyToken, isAdmin, addCompany)
router.put('/:id', verifyToken, isAdmin, updateCompany)
router.delete('/:id', verifyToken, isAdmin, deleteCompany)

export default router;