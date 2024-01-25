const User = require('../models/User');
const logger = require('../utilities/logger');
const encryption = require('../utilities/encryption');

const userController = {
    async registerUser(req, res) {
        try {
            const { name, email, password, role } = req.body;
            const hashedPassword = await encryption.hashPassword(password);

            const newUser = new User({
                name,
                email,
                password: hashedPassword,
                role
            });

            await newUser.save();
            logger.log('User registered successfully', newUser);

            res.status(201).json({
                message: USER_REGISTERED,
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role
                }
            });
        } catch (error) {
            logger.error('Error registering user', error);
            res.status(500).json({ message: 'Error registering user', error: error.message });
        }
    },

    async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user || !await encryption.comparePassword(password, user.password)) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = encryption.generateToken(user._id, user.role);
            logger.log('User logged in successfully', user);

            res.status(200).json({
                message: 'User logged in successfully',
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });
        } catch (error) {
            logger.error('Error logging in user', error);
            res.status(500).json({ message: 'Error logging in user', error: error.message });
        }
    },

    async getUserProfile(req, res) {
        try {
            const userId = req.user.id;
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json({
                message: 'User profile retrieved successfully',
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });
        } catch (error) {
            logger.error('Error retrieving user profile', error);
            res.status(500).json({ message: 'Error retrieving user profile', error: error.message });
        }
    },

    async updateUserProfile(req, res) {
        try {
            const userId = req.user.id;
            const { name, email, password } = req.body;
            const updates = { name, email };

            if (password) {
                updates.password = await encryption.hashPassword(password);
            }

            const user = await User.findByIdAndUpdate(userId, updates, { new: true });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            logger.log('User profile updated successfully', user);

            res.status(200).json({
                message: 'User profile updated successfully',
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });
        } catch (error) {
            logger.error('Error updating user profile', error);
            res.status(500).json({ message: 'Error updating user profile', error: error.message });
        }
    }
};

module.exports = userController;