// routes/finance.js
const express = require('express');
const router = express.Router();
const { Accounting, Budget, Expense } = require('../models');
const { authenticate, authorize } = require('../middleware/auth');

// Accounting Routes
router.post('/accounting', authenticate, authorize('FINANCE'), createAccountingEntry);
router.get('/accounting', authenticate, authorize('FINANCE'), getAllAccountingEntries);
router.put('/accounting/:id', authenticate, authorize('FINANCE'), updateAccountingEntry);
router.delete('/accounting/:id', authenticate, authorize('FINANCE'), deleteAccountingEntry);

// Budget Routes
router.post('/budget', authenticate, authorize('FINANCE'), createBudget);
router.get('/budget', authenticate, authorize('FINANCE'), getAllBudgets);
router.put('/budget/:id', authenticate, authorize('FINANCE'), updateBudget);
router.delete('/budget/:id', authenticate, authorize('FINANCE'), deleteBudget);

// Expense Routes
router.post('/expense', authenticate, authorize('FINANCE'), createExpense);
router.get('/expense', authenticate, authorize('FINANCE'), getAllExpenses);
router.put('/expense/:id', authenticate, authorize('FINANCE'), updateExpense);
router.delete('/expense/:id', authenticate, authorize('FINANCE'), deleteExpense);

module.exports = router;
