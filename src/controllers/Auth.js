const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sequelize, User } = require('../../src/config/database')
require('dotenv').config();

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error('Invalid request. Please provide email and password');
    }

    const lowercaseEmail = email.toLowerCase();
    const user = await User.findOne({ where: { email: lowercaseEmail } });

    console.log('User found:', user);

    if (!user) {
      return res.status(404).json({
        error: true,
        message: 'Email is not registered',
      });
    }

    const isPassValid = bcrypt.compareSync(password, user.password);

    if (!isPassValid) {
      return res.status(401).json({
        error: true,
        message: 'Invalid password',
      });
    }

    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });

    await user.update({ refreshToken });

    return res.status(200).json({
      status: 'success',
      data: {
        userId: user.userId,
        username: user.username,
        email: user.email,
        token: accessToken,
        refresh_token: refreshToken,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      message: 'Internal server error. Please try again later',
    });
  }
};


//register
const register = async (req, res) => {
  console.log('Executing register controller');
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({
        error: true,
        message: 'Invalid request, please provide email, password, and username',
      });
    }

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(409).json({
        error: true,
        message: 'Email already exists',
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    console.log('New user created:', newUser.toJSON());

    return res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      data: {
        id: newUser.user_id, 
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      message: 'Internal server error. Please try again later',
    });
  }
};


//logout
const logout = async (req, res) => {
  try {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        error: true,
        message: 'No token provided',
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        console.error('Token Verifivation Error:', err);
        return res.status(401).json({
          error: true,
          message: 'Token Verification Error: ' + err.message,
        });
      }

      const userId = decoded.id;

      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({
          error: true,
          data: null,
          message: 'User not found',
        });
      }

      await user.update({ token: null, updatedAt: null});

      await User.update({ token: null }, {where: { user_id: userId}});
      return res.status(200).json({
        status: 'success',
        data: null,
        message: 'User logout successful',
      });
    });
  } catch (error) {
    console.error('Logout error:', error);

    return res.status(500).json({
      error: true,
      data: null,
      message: 'Internal server error. Cannot update user. Try again later',
    });
  }
};




  

module.exports = {
    login,
    logout,
    register,
};
