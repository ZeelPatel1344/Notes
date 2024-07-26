// const express = require('express');
// const { Sequelize, DataTypes } = require('sequelize');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const cors = require('cors');

// const app = express();
// const PORT = process.env.PORT || 5000;
// const JWT_SECRET = 'your_jwt_secret'; // Use environment variable in production

// app.use(express.json());
// app.use(cors());

// // Connect to PostgreSQL
// const sequelize = new Sequelize('postgres://username:password@localhost:5432/auth_demo', {
//   dialect: 'postgres',
//   logging: false,
// });

// // Test the connection
// sequelize.authenticate()
//   .then(() => console.log('Connected to PostgreSQL'))
//   .catch(err => console.error('Unable to connect to PostgreSQL:', err));

// // Define User model
// const User = sequelize.define('User', {
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// }, {
//   timestamps: false,
// });

// // Sync the models with the database
// sequelize.sync()
//   .then(() => console.log('Database synced'))
//   .catch(err => console.error('Error syncing database:', err));

// // Register route
// app.post('/api/auth/register', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     let user = await User.findOne({ where: { email } });
//     if (user) {
//       return res.status(400).json({ msg: 'User already exists' });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     user = await User.create({ email, password: hashedPassword });

//     const payload = { user: { id: user.id } };

//     jwt.sign(payload, JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
//       if (err) throw err;
//       res.json({ token });
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// // Login route
// app.post('/api/auth/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     let user = await User.findOne({ where: { email } });
//     if (!user) {
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }

//     const payload = { user: { id: user.id } };

//     jwt.sign(payload, JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
//       if (err) throw err;
//       res.json({ token });
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// // Middleware to verify token
// const auth = (req, res, next) => {
//   const token = req.header('x-auth-token');
//   if (!token) {
//     return res.status(401).json({ msg: 'No token, authorization denied' });
//   }

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = decoded.user;
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: 'Token is not valid' });
//   }
// };

// // Protected route example
// app.get('/api/auth/user', auth, async (req, res) => {
//   try {
//     const user = await User.findByPk(req.user.id);
//     res.json(user);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
