// server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const DATA_FILE_PATH = path.join(__dirname, '../data/users.json');


// Read user data from the file
function readUserData(){
    try {
        const data = fs.readFileSync(DATA_FILE_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Write user data to the file
function writeUserData(users) {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(users, null, 2), 'utf8');
}

// Route to get all users
router.get('/', (req, res) => {
    const users = readUserData();
    res.json(users);
});

// Route to register a new user
router.post('/register', (req, res) => {
    const {email, password } = req.body;

    // Read existing user data
    const users = readUserData();

    // Check if user with the same email already exists
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists '});
    }

    // Register the user
    const newUser = { email, password };
    users.push(newUser);

    // Write updated user data to the file
    writeUserData(users);

    res.json({ message: 'Registration successful'});
});

// Route for user login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Read existing user data
    const users = readUserData();

    // Find the user by email
    const user = users.find((u) => u.email === email);

    if (user) {
        // User found, check the password
        if (user.password === password){
            res.json({ message: 'Login successful! '});
        } else {
            res.status(401).json({ message: 'Incorrect password'});
        }
    } else {
            // User not found
        res.status(404).json({ message: 'User not found'});
    
    }
});

// Route to update user password
router.put('/update-password', (req, res) => {
    const { email, oldPassword, newPassword, forgotPassword } = req.body;

    // Read existing user data
    const users = readUserData();

    //Find the user by email
    const userIndex = users.findIndex((u) => u.email === email);

    if (userIndex !== -1) {
        // If it's a regular password update (not forgot password)
        if (!forgotPassword) {
            // Check the old password
            if (users[userIndex].password !== oldPassword){
                return res.status(401).json({ message: 'Incorrect old password'});
            }
        }
            // Update the password
            users[userIndex].password = newPassword;

            // Write updated user data to the file
            writeUserData(users);

            res.json({ message: 'Password updated successfully'});
        } else {
            // User not found
            res.status(404).json({ message: 'User not found'});
        }
});

module.exports = router;