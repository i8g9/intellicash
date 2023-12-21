// routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const { createTransactionController, getUserTransactionsController } = require('../controllers/transaction');
const checkAuth = require('../middleware/auth');

// Endpoint to save a transaction
router.post('/', checkAuth, createTransactionController);

// Endpoint to get user transactions
router.get('/:userId', checkAuth, getUserTransactionsController);

module.exports = router;
