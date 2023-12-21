const express = require('express');
const { sequelize, User } = require('./src/config/database');
const authRoutes = require('./src/routes/auth');
const checkAuth = require('./src/middleware/auth');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./src/routes/user')
const transactionRoutes = require('./src/routes/transaction');
const app = express();

// Sync the database
const forceSync = process.env.NODE_ENV !== 'production';
sequelize.sync({ force: forceSync }).then(() => {
  console.log('Database synced');
});

app.get("/test", (req, res) => {
  res.status(200).send({
    status: "success",
    message: "welcome to intellicash"
  });
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use('/auth', authRoutes);
app.use('/user/:id', userRoutes);
app.use('/transaction', transactionRoutes);

app.use(checkAuth);


// Error handler for route not found
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handler for server errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}.`);
});

module.exports = app;
