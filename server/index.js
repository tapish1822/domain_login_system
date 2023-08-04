
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const redirectToCompany = require('./redirect'); // Require the redirect.js module

// Replace 'your_mongodb_connection_string' with your actual MongoDB connection string
mongoose.connect('MONGO_URL', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

const app = express();
app.use(bodyParser.json());

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Route for handling login and redirection
app.post('/login', async (req, res) => {
    const { email } = req.body;

    // Validate the email format (you can use a more robust validation library here)
    if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    // Extract domain from the email
    const domain = email.split('@')[1].toLowerCase();

    // Redirect based on the company domain using the redirectToCompany function
    return redirectToCompany(res, domain);
});

// Helper function to validate email format (you can use a more robust validation library here)
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Start the server
const port = 3030;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
