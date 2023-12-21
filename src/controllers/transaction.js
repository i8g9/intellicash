const { Transaction } = require('../config/database');

const createTransactionController = async (req, res) => {
  const { userId, transactionData } = req.body;

  try {
    const transaction = await createTransaction(userId, transactionData);
    return res.status(201).json({ message: 'Transaction created successfully', transaction });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getUserTransactionsController = async (req, res) => {
  const { userId } = req.params;

  try {
    const transactions = await getUserTransactions(userId);
    return res.status(200).json({ transactions });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createTransactionController,
  getUserTransactionsController,
};
